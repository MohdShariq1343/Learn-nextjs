"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const userDetailSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    message_content: z.string().min(3, "Message must be at least 3 characters"),
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
        id: String(formData.get("id") ?? ""),
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        message_content: String(formData.get("message_content") ?? ""),
    };

    const validated = userDetailSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            success: false,
            message: "Validation error. Please check your inputs.",
            errors: validated.error.flatten().fieldErrors,
            values: {
                name: rawData.name,
                email: rawData.email,
                message_content: rawData.message_content,
            },
        };
    }

    const { id, name, email, message_content } = validated.data;
    const contactId = id ? Number(id) : NaN;
    const isUpdate = !isNaN(contactId) && contactId > 0;

    try {
        if (isUpdate) {
            // Update existing contact
            db.prepare(`
                UPDATE contacts 
                SET name = ?, email = ?, message = ?
                WHERE id = ?
            `).run(name, email, message_content, contactId);
        } else {
            // Insert new contact
            db.prepare(`
                INSERT INTO contacts (name, email, message)
                VALUES (?, ?, ?)
            `).run(name, email, message_content);
        }

        revalidatePath("/formtest");

        return {
            success: true,
            message: isUpdate
                ? "Contact updated successfully!"
                : "Your query submitted, we will contact you shortly.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Failed to save your query. Please try again.",
            values: {
                name: rawData.name,
                email: rawData.email,
                message_content: rawData.message_content,
            },
        };
    }
}