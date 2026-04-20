export type UserRole =
    | "admin"
    | "staff"
    | "fleet_manager"
    | "hotel_partner";

export type UserStatus = "active" | "disabled";

export interface User {
    _id: string;
    fullName: string;
    phone: string;
    email: string;
    password?: string;
    role: UserRole;
    status: UserStatus;
    createdAt?: string;
}