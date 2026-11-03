"use client";

import { useActionState, useEffect, useRef } from "react";
import { SubmitData, CrudState } from "./action";
import { useRouter } from "next/navigation";

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
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    // Reset the form and clear URL params on successful submission
    useEffect(() => {
        if (state.success) {
            formRef.current?.reset();

            if (initialData?.id) {
                // Wait 3 seconds so the user can read the success message before redirecting
                const timer = setTimeout(() => {
                    router.push("/formtest");
                }, 3000);

                return () => clearTimeout(timer);
            }
        }
    }, [state.success, initialData?.id, router]);

    const values = state.values ?? initialData ?? {
        name: "",
        email: "",
        message_content: "",
    };

    return (
        <form ref={formRef} action={formAction} className="needs-validation" noValidate>
            {/* Hidden ID field ensures the server knows whether to UPDATE or INSERT */}
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

            <button type="submit" className="btn btn-primary" disabled={isPending}>
                {isPending ? "Saving..." : initialData?.id ? "Update Contact" : "Add Contact"}
            </button>
        </form>
    );
}