import Database from "better-sqlite3";
import {z } from "zod";

export const categorySchema = z.object({
    title: z.string().min(3, { message: "Title is required" }).max(150, { message: "Title must be less than 150 characters" }),
    slug: z.string().min(2, 'Slug must be alt least 2 characters long').regex(/^[a-z0-9-]+$/, "slug must be lowercase."),
});


export const productSchema = z.object({
    title: z.string().min(3, { message: "Title is required" }).max(150, { message: "Title must be less than 150 characters" }),
    slug: z.string().min(2, 'Slug must be alt least 2 characters long').regex(/^[a-z0-9-]+$/, "slug must be lowercase."),
    price:  z.coerce.number().positive('Price must be positive number'),
    categoryID: z.coerce.number().int().positive('Please select a validcategory'),
});

