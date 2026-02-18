import { date } from "better-auth";
import { Role, User, userStatus } from "../../../generated/prisma/client"
import { auth } from "../../lib/auth"
import { prisma } from "../../lib/prisma"
import status from "http-status";
import { th } from "zod/locales";
import { tokenUtils } from "../../utils/token";
import AppError from "../../errorHelpers/AppError";

interface RegisterPatientPayload {
    name: string;
    email: string;
    password: string;
}

const registerPatient = async (paylod: RegisterPatientPayload) => {
    const { name, email, password } = paylod
    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            role: Role.PATIENT
        }
    }
    )
    if (!data.user) {
        throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to register patient")
    }

    try {
        const patient = await prisma.$transaction(async (tx) => {



            const patientTx = await tx.patient.create({
                data: {
                    userId: data.user?.id,
                    name: paylod.name,
                    email: paylod.email
                }
            })
            return patientTx

        })


        const accessToken = tokenUtils.getAccessToken({
            userId: data.user.id,
            role: data.user.role,
            name: data.user.name,
            email: data.user.email,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified,

        })

        const refreshToken = tokenUtils.getRefreshToken({
            userId: data.user.id,
            role: data.user.role,
            name: data.user.name,
            email: data.user.email,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified,
        })

        return {
            ...data,
            accessToken,
            refreshToken,
            patient
        }
    } catch (error) {
        console.log("transaction error", error)
        await prisma.user.delete({
            where: {
                id: data.user.id
            }
        })
        throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to create patient")
    }
}

const loginUser = async (email: string, password: string) => {
    const data = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    })
    if (!data.user) {
        throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to login user")
    }
    if (data.user.status == userStatus.BlOCKED) {
        throw new AppError(status.FORBIDDEN, "User is blocked")
    }
    if (data.user.status == userStatus.DELETED) {
        throw new AppError(status.GONE, "User is deleted")
    }


    const accessToken = tokenUtils.getAccessToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,

    })

    const refreshToken = tokenUtils.getRefreshToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
    })


    return {
        ...data,
        accessToken,
        refreshToken
    }
}

export const authService = {
    registerPatient,
    loginUser
}