import db from "@/lib/db";
import ContactForm from "./ContactForm";
import Link from "next/link";

type Contact = {
    id: number;
    name: string;
    email: string;
    message_content: string; // Matches form field name directly
};

export default async function UserDataPage({
    searchParams,
}: {
    searchParams: Promise<{ id?: string }>;
}) {
    const { id: idParam } = await searchParams;

    let selectedContact: Contact | undefined;

    if (idParam !== undefined) {
        if (!/^[1-9]\d*$/.test(idParam)) {
            return <div className="container my-4">Invalid contact ID.</div>;
        }

        const id = Number(idParam);

        if (!Number.isSafeInteger(id)) {
            return <div className="container my-4">Invalid contact ID.</div>;
        }

        // Notice the SQL alias: message AS message_content
        selectedContact = db.prepare(`
            SELECT id, name, email, message AS message_content
            FROM contacts
            WHERE id = ?
        `).get(id) as Contact | undefined;

        if (!selectedContact) {
            return <div className="container my-4">Contact not found.</div>;
        }
    }

    const contacts = db.prepare(`
        SELECT id, name, email, message AS message_content
        FROM contacts
        ORDER BY id DESC
    `).all() as Contact[];

    return (
        <div className="container my-4">
            <h2 className="h4 mb-3">
                {selectedContact ? "Update Contact" : "Add Contact"}
            </h2>

            {/* Pass selectedContact directly without manual field mapping! */}
            <ContactForm
                key={selectedContact?.id ?? "new"}
                initialData={selectedContact}
            />

            <hr className="my-4" />

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h4 mb-0">Contact List</h2>

                <Link href="/formtest" className="btn btn-primary">
                    + Add Contact
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.id}>
                                <td>{contact.id}</td>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.message_content}</td>
                                <td>
                                    <Link
                                        href={`/formtest?id=${contact.id}`}
                                        className="btn btn-warning btn-sm"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}

                        {contacts.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center">
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