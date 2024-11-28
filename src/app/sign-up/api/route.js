import { mongodb } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export const POST = async (request) => {
    const newUser = await request.json();
    try {
        const db = await mongodb();
        const userCollection = await db.collection('users');

        const emailExist = await userCollection.findOne({ email: newUser.email });
        const userNameExist = await userCollection.findOne({ user_name: newUser.user_name });

        if (emailExist && userNameExist) {
            return NextResponse.json({ message: "Email and Username already exist", status: 400 });
        } else if (emailExist) {
            return NextResponse.json({ message: "Email already exists", status: 400 });
        } else if (userNameExist) {
            return NextResponse.json({ message: "Username already exists", status: 400 });
        }

        const hashPassword = await bcrypt.hash(newUser.password, 14);
        const response = await userCollection.insertOne({ ...newUser, password: hashPassword });
        
        return NextResponse.json({ message: "Welcome to our community! Sign up completed successfully.", status: 200 });
    } catch (error) {
        console.error("Error parsing request:", error);
        return NextResponse.json({ message: "Failed to parse request", status: 500 });
    }
}