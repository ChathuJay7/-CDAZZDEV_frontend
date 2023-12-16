"use client";

import React, { useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FaBackward } from "react-icons/fa";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    if (!user) {
      redirect("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and description are required");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/post/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description, userId: user._id }),
      });

      if (res.ok) {
        router.refresh();
        router.push("/");
      } else {
        throw new Error("Failed to create a todo");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 mt-5 justify-center items-center bg-slate-200 py-10 relative"
    >
      <button
        type="button"
        onClick={handleGoBack}
        className="absolute top-2 left-2 bg-slate-600 text-white hover:bg-white hover:text-slate-600 border border-slate-600 font-bold px-6 py-3 mr-2"
      >
        <FaBackward />
      </button>
      <h1 className="text-center font-bold text-2xl">Add Post</h1>

      <input
        className="border border-slate-500 px-8 py-2 w-[80%]"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        placeholder="Post Title"
      />
      <textarea
        className="border border-slate-500 px-8 py-2 w-[80%]"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        placeholder="Post Description"
      />
      <button
        type="submit"
        className="bg-slate-600 text-white hover:bg-white hover:text-slate-600 border border-slate-600 font-bold px-6 py-3 w-[80%]"
      >
        Add Post
      </button>
    </form>
  );
};

export default AddPostForm;
