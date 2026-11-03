"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handlesubmit = async () => {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            router.push("/dashboard");
        } else {
            alert(data.message);
        }

    }


    return (
        <div>
            <h1>Login Form</h1>
            <input className="border p-2 mb-4" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br />
            <input className="border p-2 mb-4" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button className="bg-blue-500 text-white p-2 rounded cursor-pointer" onClick={handlesubmit}>Login</button>
        </div>
    )
}

