import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { email, password } = await req.json();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "Invalid login" }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password || "");

        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid login" }, { status: 401 });
        }

        // Don't leak hashed password to client
        const safeUser = user.toObject();
        delete safeUser.password;

        return NextResponse.json({ user: safeUser });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}