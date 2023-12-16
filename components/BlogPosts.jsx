
import React from "react";
//import RemoveBtn from './RemoveBtn'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";

const getPosts = async () => {
  try {
    const res = await fetch("http://localhost:5000/post/", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading todos: ", error);
  }
};

const BlogPosts = async () => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  const { posts } = await getPosts();

    const handleRemovePost = async(id) => {
        const confirmed = confirm("Are you sure?");

        if(confirmed) {
            const res = await fetch(`http://localhost:5000/post/${id}`, {
                method: "DELETE"
            })
            
            if(res.ok) {
                router.refresh();
            }
        }
    }

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
      {posts.map((p) => (
        // eslint-disable-next-line react/jsx-key
        <div
          key={p._id}
          className="p-3 bg-slate-200 border border-slate-300 hover:bg-white my-3 flex justify-between gap-5 items-center"
        >
          <div>
            <h2 className="font-bold text-2xl">{p.title}</h2>
            <div>{p.description}</div>
          </div>

          <div className="flex gap-2">
            {/* <RemoveBtn id={p._id} /> */}
            {/* {user._id === p.userId && (
                    
                <Link href={`/editTodo/${p._id}`}>
                  <HiPencilAlt size={24} />
                </Link>
                )} */}
            <button onClick={() => handleRemovePost(p._id)} className="text-red-400">
              <HiOutlineTrash size={24} />
            </button>
            <Link href={`/editPost/${p._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlogPosts;
