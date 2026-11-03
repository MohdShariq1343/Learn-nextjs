import db from "@/lib/db";
import ContactForm from "../ContactForm";

type Contact = {
    id: number;
    name: string;
    email: string;
    message_content: string;
};

export default async function EditContactPage({
    params,}: { params: Promise<{ id: string }>;}) 
    {
    const { id: idParam } = await params;

    if (!/^[1-9]\d*$/.test(idParam)) {
        return <div className="container my-4">Invalid contact ID.</div>;
    }

    const id = Number(idParam);
    if (!Number.isSafeInteger(id)) {
        return <div className="container my-4">Invalid contact ID.</div>;
    }

    const selectedContact = db.prepare(`
        SELECT id, name, email, message AS message_content
        FROM contacts
        WHERE id = ?
    `).get(id) as Contact | undefined;

    if (!selectedContact) {
        return <div className="container my-4">Contact not found.</div>;
    }

    return <ContactForm initialData={selectedContact} />;
}