import db from "@/lib/db";
import { categorySchema } from "@/lib/validation";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const categories = db.prepare('select * from categories order by id desc').all();
        return NextResponse.json(categories, {status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}