import db from "@/lib/db";
import Link from "next/link";
import { DeleteContact } from "./action";
import DeleteButton from "./DeleteButton";

type Contact = {
    id: number;
    name: string;
    email: string;
    message: string;
};

export default async function CrudIndexPage({
    searchParams,
}: {
    searchParams: Promise<{ message?: string }>;
}) {
    const { message } = await searchParams;

    const contacts = db.prepare(`
        SELECT id, name, email, message
        FROM contacts
        ORDER BY id DESC
    `).all() as Contact[];

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 mb-0">Contact List</h2>
                <Link href="/crudwithid/add" className="btn btn-primary">
                    + Add Contact
                </Link>
            </div>

            {message && (
                <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
                    {message}
                    <Link href="/crudwithid" className="btn-close" aria-label="Close" style={{ textDecoration: 'none' }} />
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th style={{ width: "160px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.id}>
                                <td>{contact.id}</td>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.message}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <Link
                                            href={`/crudwithid/${contact.id}`}
                                            className="btn btn-warning btn-sm"
                                        >
                                            Edit
                                        </Link>

                                        <form action={DeleteContact}>
                                            <input type="hidden" name="id" value={contact.id} />
                                            <DeleteButton />
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {contacts.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-muted">
                                    No contacts found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}