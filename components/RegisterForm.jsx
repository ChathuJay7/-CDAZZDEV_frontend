"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [success, setSuccess] = useState("");
  const [successDisplay, setSuccessDisplay] = useState(false);

  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      if (name === "" || email === "" || password === "") {
        setError("Please fill all input fields");
        setErrorDisplay(true);
        setTimeout(() => {
          setErrorDisplay(false);
        }, 3000);
      }

      const res = await fetch(`http://localhost:5000/auth/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username: name, email, password }),
      });

      if(res.ok){
        const data = await res.json();

        setSuccess("Registered Successfully");
        setSuccessDisplay(true);
        setTimeout(() => {
          setSuccessDisplay(false);
        }, 3000);
      }
      
    } catch (error) {
      setError("Invalid inputs");
      setErrorDisplay(true);
      setTimeout(() => {
        setErrorDisplay(false);
      }, 3000);
    }
  };

  return (
    <div className="grid place-items-center">
      <div className="shadow-lg p-5 rounded-lg mt-20 border-t-4 border-slate-500">
        <h1 className="text-xl font-bold py-5 text-center">Register</h1>

        {error && errorDisplay && (
            <div className="bg-red-500 text-white w-full text-center text-sm py-1 px-3 rounded-md mt-2 mb-3">
              {error}
            </div>
          )}

          {success && successDisplay && (
            <div className="bg-green-500 text-white w-full text-center text-sm py-1 px-3 rounded-md mt-2 mb-3">
              {success}
            </div>
          )}

        <form onSubmit={handleSignup} className="flex flex-col gap-3">
          <input
            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Full Name"
          />
          <input
            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter Email"
          />
          <input
            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
          />
          <button className="bg-slate-600 text-white hover:bg-white hover:text-slate-600 border border-slate-600 font-bold cursor-pointer px-6 py-2">
            Register
          </button>

          

          <Link href={"/"} className="text-sm mt-3 text-right">
            Already have an account?{" "}
            <span className="underline font-bold">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
