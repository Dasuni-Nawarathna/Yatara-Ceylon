import { User } from "@/types/user";

export const users: User[] = [
    {
        _id: "1",
        fullName: "Admin",
        phone: "0770000001",
        email: "admin@yatara.com",
        password: "123456",
        role: "admin",
        status: "active",
    },
    {
        _id: "2",
        fullName: "Staff",
        phone: "0770000002",
        email: "staff@yatara.com",
        password: "123456",
        role: "staff",
        status: "active",
    },
    {
        _id: "3",
        fullName: "Fleet Partner",
        phone: "0770000003",
        email: "fleet@yatara.com",
        password: "123456",
        role: "fleet_manager",
        status: "active",
    },
    {
        _id: "4",
        fullName: "Hotel Partner",
        phone: "0770000004",
        email: "hotel@yatara.com",
        password: "123456",
        role: "hotel_partner",
        status: "active",
    },

];
