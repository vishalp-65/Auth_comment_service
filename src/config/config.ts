import dotenv from "dotenv"
import { z } from "zod"

dotenv.config()

const configSchema = z.object({
    nodeEnv: z
        .enum(["development", "production", "test"])
        .default("development"),
    port: z.coerce.number().default(3000),
    database: z.object({
        host: z.string().default("localhost"),
        port: z.coerce.number().default(3306),
        username: z.string().default("root"),
        password: z.string().default(""),
        database: z.string().default("auth_service")
    })
})

const rawConfig = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
}

export const config = configSchema.parse(rawConfig)
