export interface JwtPayload {
    userId: string
    email: string
    iat?: number
    exp?: number
}

export interface AuthTokens {
    accessToken: string
    refreshToken: string
}

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
export interface PaginationParams {
    page: number
    limit: number
}
export interface PaginationResult<T> {
    items: T[]
    totalItems: number
    totalPages: number
    currentPage: number
}
export interface ErrorResponse {
    success: boolean
    message: string
    statusCode: number
    stack?: string
}
export interface SuccessResponse<T> {
    success: boolean
    message: string
    data: T
    statusCode: number
}
