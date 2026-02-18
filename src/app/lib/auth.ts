import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { Role, userStatus } from "../../generated/prisma/enums";
import { envVars } from "../../config/env";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
    }, user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: Role.PATIENT,
                required: true,
            },
            status: {
                type: "string",
                defaultValue: userStatus.ACTIVE,
                required: true
            },
            needPasswordChange: {
                type: "boolean",
                defaultValue: false,
                required: true
            },
            isDeleted: {
                type: "boolean",
                defaultValue: false,
                required: true
            },
            deletedAt: {
                type: "date",
                required: false,
                defaultValue: null
            },
        },
    },
    session: {
        expiresIn: 60 * 60 * 60 * 24, // 1 day in seconds
        updateAge: 60 * 60 * 60 * 24, // 1 day in seconds
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 * 60 * 24 // 1 day in seconds
        }
    },
    trustedOrigins: [envVars.BETTER_AUTH_URL || "http://localhost:5000", "http://localhost:3000"], // Add your frontend URL here
    advanced: {
        disableCSRFCheck: true
    }
}); 