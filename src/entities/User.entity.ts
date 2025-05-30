import { Permission } from "../types"
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index
} from "typeorm"

@Entity("users")
@Index(["email"], { unique: true })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 100 })
    name: string

    @Column({ type: "varchar", length: 255 })
    email: string

    @Column({ type: "varchar", length: 255, select: false })
    password: string

    @Column({
        type: "enum",
        enum: Permission,
        nullable: true,
        default: Permission.READ
    })
    permissions: Permission

    @Column({ type: "boolean", default: true })
    isActive: boolean

    @Column({ type: "timestamp", nullable: true })
    lastLoginAt: Date | null

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    // Helper method to get permissions as array
    getPermissions(): string[] {
        return this.permissions ? this.permissions.split(",") : []
    }

    // Helper method to check if user has specific permission
    hasPermission(permission: Permission): boolean {
        return this.getPermissions().includes(permission)
    }
}
