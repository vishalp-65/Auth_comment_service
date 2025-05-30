export interface RequestUser {
    id: string
    email: string
    name: string
}

export enum Permission {
    READ = "READ",
    WRITE = "WRITE",
    DELETE = "DELETE"
}
declare global {
    namespace Express {
        interface Request {
            user?: RequestUser
        }
    }
}
