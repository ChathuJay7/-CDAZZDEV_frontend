"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function EditPPostForm({ id, title, description }) {

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:5000/post/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ title:newTitle, description:newDescription }),
            });

            if (!res.ok) {
                throw new Error("Failed to update post");
            }

            router.refresh();
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <form className='flex flex-col gap-5 mt-5 justify-center items-center bg-slate-200 py-10' onSubmit={handleSubmit}>
        <h1 className='text-center font-bold text-2xl'>Update Post</h1>
        <input className='border border-slate-500 px-8 py-2 w-[80%]' onChange={(e) => setNewTitle(e.target.value)} value={newTitle} type='text' placeholder='Topic Title'/>
        <input className='border border-slate-500 px-8 py-2 w-[80%]' onChange={(e) => setNewDescription(e.target.value)} value={newDescription} type='text' placeholder='Topic Description'/>
        <button type='submit' className='bg-slate-600 text-white hover:bg-white hover:text-slate-600 border border-slate-600 font-bold px-6 py-3 w-[80%]'>Update Post</button>
    </form>
  )
}
