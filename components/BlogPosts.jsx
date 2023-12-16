"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
//import RemoveBtn from './RemoveBtn'
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useLayoutEffect(() => {
    if (!user) {
      redirect("/login");
    }
  }, []);

  console.log(user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/post", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch Posts");
        }

        const fetchedPosts = await res.json();
        setPosts(fetchedPosts);
      } catch (error) {
        console.log("Error loading posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  const handleRemovePost = async (id) => {
    const confirmed = confirm("Are you want to delete?");

    if (confirmed) {
      const res = await fetch(`http://localhost:5000/post/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  console.log(posts);
  return (
    <>
      <div className="flex justify-end mt-5 mb-5 ">
        <Link
          className="bg-slate-600 text-white hover:bg-white hover:text-slate-600 border border-slate-600 rounded-md px-6 py-3 font-bold"
          href={"/addPost"}
        >
          + Add Post
        </Link>
      </div>
      {posts &&
        user &&
        posts.map((p) => (
          // eslint-disable-next-line react/jsx-key
          <div
            key={p._id}
            className="p-3 bg-slate-200 border border-slate-300 hover:bg-white my-3 flex justify-between gap-5 items-center"
          >
            <div>

              <Link href={`/post/${p._id}`}><h2 className="font-bold text-2xl">{p.title}</h2></Link>
              <div className="text-lg mt-2">{p.description}</div>
              <div className="text-xs mt-2 text-gray-600">
                posted By: {p.userId.username}
              </div>
            </div>

            <div className="flex gap-2">
              {user._id === p.userId._id && (
                <>
                  <button
                    onClick={() => handleRemovePost(p._id)}
                    className="text-red-400"
                  >
                    <HiOutlineTrash size={24} />
                  </button>
                  <Link href={`/editPost/${p._id}`}>
                    <HiPencilAlt size={24} />
                  </Link>
                </>
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default BlogPosts;
