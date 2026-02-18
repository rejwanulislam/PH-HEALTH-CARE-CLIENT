import { th } from "zod/locales";
import { Role, Specialty } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { IcreateDoctorPayload } from "./user.interface";
import status from "http-status";
import AppError from "../../errorHelpers/AppError";

const createDoctor = async (payload: IcreateDoctorPayload) => {
    const spcialties: Specialty[] = [];
    for (const spcialtyId of payload.doctorSpecialties) {
        const spcialty = await prisma.specialty.findUnique({
            where: {
                id: spcialtyId
            }
        })
        if (!spcialty) {
            throw new AppError(status.BAD_REQUEST, "Invalid specialty ID")
        }
        spcialties.push(spcialty);
    }

        const userExist = await prisma.user.findUnique({
            where: {
                email: payload.doctor.email
            }
        })
        if (userExist) {
                    throw new AppError(status.BAD_REQUEST, "Email already exists")
        }

        const userData = await auth.api.signUpEmail({
            body: {
                email: payload.doctor.email,
                password: payload.password,
                role: Role.DOCTOR,
                name: payload.doctor.name,
                needPasswordChange: true

            }


        })

        try {
            const result = await prisma.$transaction(async (tx) => {
                const doctorTx = await tx.doctor.create({
                    data: {
                        userID: userData.user?.id,
                        ...payload.doctor,
                    }
                })
                const doctorSpecialtiesTx = spcialties.map((sp) => {
                    return {
                        doctorId: doctorTx.id,
                        specialtyId: sp.id
                    }
                })

                await tx.doctorSpecialty.createMany({
                    data: doctorSpecialtiesTx
                })

                const doctor = await tx.doctor.findUnique({
                    where: {
                        id: doctorTx.id
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        profilepic: true,
                        contactNumber: true,
                        address: true,
                        registrationNumber: true,
                        experienceYears: true,
                        gender: true,
                        appointmentFee: true,
                        qualifications: true,
                        currentWorkingPlace: true,
                        degination: true,
                        averageRating: true,
                        createdAt: true,
                        updatedAt: true,
                        user: {
                            select: {
                                id: true,
                                email: true,
                                name: true,
                                role: true,
                                status: true,
                                image: true,
                                emailVerified: true,
                                createdAt: true,
                                updatedAt: true,
                            }
                        },
                        doctorSpecialties: {
                            select: {
                                specialty: {
                                    select: {
                                        id: true,
                                        title: true,
                                    }
                                }
                            }
                        }
                    }
                })
                return doctor

            })
            return result
        } catch (error) {
            console.log("transaction error", error)
            await prisma.user.delete({
                where: {
                    id: userData.user?.id
                }
            })
            throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to create doctor")
        }
    }


export const UserService = {
    createDoctor
}