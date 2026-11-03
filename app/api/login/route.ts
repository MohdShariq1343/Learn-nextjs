import { NextResponse } from "next/server";
import { geneteToken } from "@/lib/jwt";


export async function POST(request: Request) {
    const { email, password } = await request.json();

    //Demo data
    if (email === "admin@test.com" && password === "123456") {
        const token = geneteToken({ email });

        return NextResponse.json({
            message: "Login successfully",
            token: token,
        })

    }

    return NextResponse.json({
        message: "Invalid credentials"
    }, { status: 401 });
}