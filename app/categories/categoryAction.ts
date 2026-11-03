"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const CategorySchema = z.object({
    id: z.string().optional(),
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().lowercase().min(3, "Slug must be at least 3 characters"),
});

export type CategoryCrudState = {
    success?: boolean;
    message?: string;
    errors?: Record<string, string[]>;
    values?: {
        title: string;
        slug: string;
    };
};


export async function SubmitCategortData(prevState: CategoryCrudState, formData: FormData): Promise<CategoryCrudState> {

    const rawData = {
        id: formData.get('id') ?? "",
        title: formData.get('title') ?? "",
        slug: formData.get('slug') ?? "",
    };

    const validated = CategorySchema.safeParse(rawData);

    if (!validated.success) {
        return {
            success: false,
            message: "Validation error. Please check your inputs.",
            errors: validated.error.flatten().fieldErrors,
            values: {
                title: rawData.title,
                slug: rawData.slug,
            },
        };
    }

    const { id, title, slug } = validated.data;
    const categoryId = id ? Number(id) : NaN;
    const isUpdate = !isNaN(categoryId) && categoryId > 0;

    try {
        if (isUpdate) {
            db.prepare(`update categories set title = ?, slug = ? where id = ?`).run(title, slug, categoryId);
        } else {
            db.prepare(`insert into categories (title, slug) values (?, ?)`).run(title, slug);
        }
        revalidatePath("/categories");
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to save data. Please try again.",
            values: {
                title: rawData.title,
                slug: rawData.slug,
            },
        };
    }
}