"use client";

import { useActionState } from "react";
import { SubmitData, CrudState } from "./action";
import Link from "next/link";

type ContactData = {
    id?: number;
    name: string;
    email: string;
    message_content: string;
};

type ContactFormProps = {
    initialData?: ContactData;
};

const initialState: CrudState = {};

const formFields = [
    { name: "name", label: "Name", type: "text", component: "input" },
    { name: "email", label: "Email Address", type: "email", component: "input" },
    { name: "message_content", label: "Message", type: "text", component: "textarea", rows: 4 },
] as const;

export default function ContactForm({ initialData }: ContactFormProps) {
    const [state, formAction, isPending] = useActionState(SubmitData, initialState);

    const values = state.values ?? initialData ?? {
        name: "",
        email: "",
        message_content: "",
    };

    return (
        <div className="container my-4" style={{ maxWidth: "600px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 mb-0">{initialData?.id ? "Update Contact" : "Add New Contact"}</h2>
                <Link href="/fullcrud" className="btn btn-secondary btn-sm">
                    &larr; Back to List
                </Link>
            </div>

            <form action={formAction} className="needs-validation" noValidate>
                {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

                {state.message && (
                    <div className={`alert ${state.success ? "alert-success" : "alert-danger"} mb-3`} role="alert">
                        {state.message}
                    </div>
                )}

                {formFields.map((field) => {
                    const error = state.errors?.[field.name];
                    const defaultValue = values[field.name as keyof typeof values] ?? "";

                    return (
                        <div className="mb-3" key={field.name}>
                            <label htmlFor={field.name} className="form-label">
                                {field.label}
                            </label>

                            {field.component === "textarea" ? (
                                <textarea
                                    id={field.name}
                                    name={field.name}
                                    rows={field.rows}
                                    defaultValue={defaultValue}
                                    className={`form-control ${error ? "is-invalid" : ""}`}
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    defaultValue={defaultValue}
                                    className={`form-control ${error ? "is-invalid" : ""}`}
                                />
                            )}

                            {error && <div className="invalid-feedback">{error[0]}</div>}
                        </div>
                    );
                })}

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary" disabled={isPending}>
                        {isPending ? "Saving..." : initialData?.id ? "Update Contact" : "Add Contact"}
                    </button>
                    <Link href="/fullcrud" className="btn btn-outline-secondary">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}