
"use client";

import { useActionState } from "react";
import { CrudState, SubmitData } from "./useraction";


export default function Userpage({
    initialData,
}: {
    initialData?: {
        name?: string;
        email?: string;
        message_content?: string;
    };
}) {
    const initialState: CrudState = {
        values: {
            name: initialData?.name ?? "",
            email: initialData?.email ?? "",
            message_content: initialData?.message_content ?? "",
        },
    };

    const [state, formAction, isPending] = useActionState(
        SubmitData,
        initialState
    );

    const values = state.values ?? initialState.values!;

    return (
        <div className="container my-4">
            <form action={formAction} key={JSON.stringify(state.values)}>
                <div className="row justify-content-center">
                    <div className="col-6">
                        <div className="card">
                            <h4 className="card-header fw-bold fs-5 mb-0">Contact Form with full validation and old values</h4>
                            <div className="card-body">


                                {state.success === true && (
                                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                                        {state.message}
                                    </div>
                                )}

                                {state.success === false && state.message && (
                                    <div className="alert alert-danger">
                                        {state.message}
                                    </div>
                                )}

                                <input
                                    type="text"
                                    className="form-control mb-3 shadow-none"
                                    name="name"
                                    placeholder="Name"
                                    defaultValue={values.name}
                                />

                                {state.errors?.name && (
                                    <small className="text-danger mb-2">
                                        {state.errors.name[0]}
                                    </small>
                                )}

                                <input
                                    type="email"
                                    className="form-control mb-3 shadow-none"
                                    name="email"
                                    placeholder="Email"
                                    defaultValue={values.email}
                                />

                                {state.errors?.email && (
                                    <small className="text-danger mb-2">
                                        {state.errors.email[0]}
                                    </small>
                                )}

                                <textarea
                                    name="message_content"
                                    className="form-control shadow-none"
                                    placeholder="Write your message..."
                                    defaultValue={values.message_content}
                                />

                                {state.errors?.message_content && (
                                    <small className="text-danger mb-2">
                                        {state.errors.message_content[0]}
                                    </small>
                                )}

                                <div className="mt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isPending}
                                    >
                                        {isPending ? "Saving..." : "Save Query"}
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
