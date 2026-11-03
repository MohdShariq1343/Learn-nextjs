"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardPage() {
    const [data, setData] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setData(null);
            router.push("/login");
        }
        fetch("/api/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => {
                console.error(err);
                setData(null);
                router.push("/login");
            });
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>

            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )

}