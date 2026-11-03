import db from "@/lib/db";
import ContactForm from "../ContactForm";

type Contact = {
    id: number;
    name: string;
    email: string;
    message_content: string;
};

export default async function ManageContactPage({
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

        selectedContact = db.prepare(`
            SELECT id, name, email, message AS message_content
            FROM contacts
            WHERE id = ?
        `).get(id) as Contact | undefined;

        if (!selectedContact) {
            return <div className="container my-4">Contact not found.</div>;
        }
    }

    return <ContactForm initialData={selectedContact} />;
}