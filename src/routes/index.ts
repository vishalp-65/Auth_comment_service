import { Router } from "express"

export class Routes {
    public router: Router

    constructor() {
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        // Health check endpoint
        this.router.get("/health", (req, res) => {
            res.status(200).json({
                success: true,
                message: "Server is running",
                timestamp: new Date().toISOString()
            })
        })
    }
}
