import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";


export async function GET(request: Request) {
    const authheader = request.headers.get("Authorization");
    if (!authheader) {
        return NextResponse.json({
            message: "Unauthorized"
        }, { status: 401 });
    }

    const token = authheader.split(" ")[1];  // jwt hav three parsts, so we need to split the token and get the second part

    try {
        const user = verifyToken(token);
        return NextResponse.json({
            message: "Protected data",
            user: user
        });
    } catch (error) {
        return NextResponse.json({
            message: "Invalid token"
        }, { status: 401 });
    }

}