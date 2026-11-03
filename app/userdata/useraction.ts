"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const userDetailSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().min(3, "Email is required"),
    message_content: z.string().min(3, "Message is required"),
});

export type CrudState = {
    success?: boolean;
    message?: string;
    errors?: Record<string, string[]>;
    values?: {
        name: string;
        email: string;
        message_content: string;
    };
};

export async function SubmitData(
    prevState: CrudState,
    formData: FormData
): Promise<CrudState> {
    const rawData = {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        message_content: String(
            formData.get("message_content") ?? ""
        ),
    };

    const validated = userDetailSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            success: false,
            message: "Validation error",
            errors: validated.error.flatten().fieldErrors,
            values: rawData,
        };
    }

    const { name, email, message_content } = validated.data;

    try {
        db.prepare(
            `INSERT INTO contacts (name, email, message)
             VALUES (?, ?, ?)`
        ).run(name, email, message_content);
         
        revalidatePath("/userdata");
        return {
            success: true,
            message: "Your query submitted, we will contact you shortly.",
            //values: rawData,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Failed to save your query. Please try again.",
            values: rawData,
        };
    }
}