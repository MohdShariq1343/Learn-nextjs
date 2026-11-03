"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
    id: number;
    title: string;
    slug: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [editCategories, setEditCategories] = useState<Category | null>(null);

    const fetchCategories = async () => {
        const res = await fetch("/api/categories");
        const data = await res.json();
        console.log(data);
        setCategories(data);
    }

    useEffect(() => {
        fetchCategories();
    }, []);


    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2 className="h4 mb-0">Categories Listing</h2>
                <Link href="/categories/add" className="btn btn-primary">
                    + Add Categories
                </Link>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="table-responsive ">
                        <table className="table table-striped table-hover table-bordered align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Slug</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((cat) => (
                                    <tr key={cat.id}>
                                        <td>{cat.id}</td>
                                        <td>{cat.title}</td>
                                        <td>{cat.slug}</td>
                                        <td>
                                            <button className="btn btn-sm p-1 py-0 btn-outline-primary">Edit</button> &nbsp;
                                            <button className="btn btn-sm p-1 py-0 btn-outline-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))
                                }

                                {categories.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="text-center">No categories found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>


                    </div >



                </div >
            </div >
        </div >
    )
}