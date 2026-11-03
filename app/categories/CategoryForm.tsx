"use client";

import Link from "next/link";
import { CategoryCrudState, SubmitCategortData } from "./categoryAction";
import { useActionState } from "react";


type CategoryData = {
    id?: number;
    title: String;
    slug: String;
};

type CategoryFormProps = {
    initialData?: CategoryData;
};

const initialState: CategoryCrudState = {};

export default function CategoryForm({ initialData }: CategoryFormProps) {
    const [state, formAction, isPending] = useActionState(SubmitCategortData, initialState);

    return (
        <div className="container my-4" style={{ maxWidth: "600px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 mb-0">{initialData?.id ? "Update Category" : "Add New Category"}</h2>
                <Link href="/categories" className="btn btn-secondary btn-sm">
                    &larr; Back to Category
                </Link>
            </div>

            <form action={formAction} className="needs-validation" noValidate>
                {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

                <label htmlFor="title" className="form-label">Category Title</label>
                <input type="text" name="title" id="title" defaultValue={state?.values?.title} className={`form-control ${state?.errors?.title ? "is-invalid" : ""}`} />
                {state?.errors?.title && <div className="invalid-feedback">
                    {state.errors.title[0]}</div>}

                <label htmlFor="slug" className="form-label mt-3">Category Slug</label>
                <input type="text" name="slug" id="slug" defaultValue={state?.values?.slug} className={`form-control ${state?.errors?.slug ? "is-invalid" : ""}`} />
                {state?.errors?.slug && <div className="invalid-feedback">
                    {state.errors.slug[0]}</div>}

                <button className="btn btn-dark mt-3" type="submit">Submit Category</button>

            </form>
        </div>
    )
}
