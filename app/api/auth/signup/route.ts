import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();

        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return NextResponse.json(
                { message: "Email exists" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const newUser = await User.create({
            ...body,
            password: hashedPassword,
            status: "active",
        });

        // Don't leak hashed password to client
        const safeUser = newUser.toObject();
        delete safeUser.password;

        return NextResponse.json({ user: safeUser });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}