// components/ViewPost.js
"use client";

import React, { useLayoutEffect } from "react";
import { FaBackward } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const SinglePost = ({ id, title, description }) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    if (!user) {
      redirect("/login");
    }
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="relative flex flex-col gap-5 mt-5 justify-center items-center bg-slate-200 py-10 px-10">
      <button
        type="button"
        onClick={handleGoBack}
        className="absolute top-2 left-2 bg-slate-600 text-white hover:bg-white hover:text-slate-600 border border-slate-600 font-bold px-6 py-3 mr-2"
      >
        <FaBackward />
      </button>
      <h1 className="font-bold text-xl">{title}</h1>
      <h3>{description}</h3>
    </div>
  );
};

export default SinglePost;
