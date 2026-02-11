import { Role, User, userStatus } from "../../../generated/prisma/client"
import { auth } from "../../lib/auth"
import { prisma } from "../../lib/prisma"

interface RegisterPatientPayload{
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
    if(!data.user){
        throw new Error("Failed to register patient")
    }
    return data
} 

const loginUser = async (email: string, password: string) => {
    const data = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    })
    if(!data.user){
        throw new Error("Failed to login user")
    }
    if(data.user.status==userStatus.BlOCKED){
        throw new Error("User is blocked")
    }
    if(data.user.status==userStatus.DELETED){
        throw new Error("User is deleted")
    }
    return data
}

export const authService = {
    registerPatient,
    loginUser
}