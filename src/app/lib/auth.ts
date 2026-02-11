import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { Role, userStatus } from "../../generated/prisma/enums";

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
    trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:5000","http://localhost:3000"], // Add your frontend URL here
advanced:{
    disableCSRFCheck: true
}
}); 