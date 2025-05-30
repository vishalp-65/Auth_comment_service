import "reflect-metadata"
import { App } from "./app"
import { AppDataSource } from "./config/database"
import { logger } from "./config/logger"

class Server {
    private app: App

    constructor() {
        this.app = new App()
    }

    public async start(): Promise<void> {
        try {
            // Initialize database connection
            await AppDataSource.initialize()
            logger.info("Database connection established")

            // Start server
            this.app.listen()
        } catch (error) {
            logger.error("Failed to start server:", error)
            process.exit(1)
        }
    }

    public async stop(): Promise<void> {
        try {
            await AppDataSource.destroy()
            logger.info("Database connection closed")
        } catch (error) {
            logger.error("Error during server shutdown:", error)
        }
    }
}

const server = new Server()

// Handle graceful shutdown
process.on("SIGTERM", async () => {
    logger.info("SIGTERM received, shutting down gracefully")
    await server.stop()
    process.exit(0)
})

process.on("SIGINT", async () => {
    logger.info("SIGINT received, shutting down gracefully")
    await server.stop()
    process.exit(0)
})

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
    logger.error("Uncaught Exception:", error)
    process.exit(1)
})

process.on("unhandledRejection", (reason, promise) => {
    logger.error("Unhandled Rejection at:", promise, "reason:", reason)
    process.exit(1)
})

// Start server
server.start()
