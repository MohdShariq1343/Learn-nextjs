"use client";

import { useFormStatus } from "react-dom";

export default function DeleteButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="btn btn-danger btn-sm"
            disabled={pending}
            onClick={(e) => {
                if (!confirm("Are you sure you want to delete this contact?")) {
                    e.preventDefault();
                }
            }}
        >
            {pending ? "Deleting..." : "Delete"}
        </button>
    );
}