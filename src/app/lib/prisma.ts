import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../../generated/prisma/client";
import { envVars } from "../../config/env";

const connectionString =envVars.DATABASE_URL; // Your PostgreSQL connection string, e.g., "postgresql://user:password@localhost:5432/mydb"

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }