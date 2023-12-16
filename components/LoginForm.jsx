"use client";

import { login } from "@/app/redux/authSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorDisplay, setErrorDisplay] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const user = {
      email: email,
      password: password,
    };
  
    try {

        if (email === "" || password === "") {
            setError("Please fill all input fields");
            setErrorDisplay(true);
            setTimeout(() => {
              setErrorDisplay(false);
            }, 3000);
            return
          }

      const response = await axios.post("http://localhost:5000/auth/login", user);
      console.log(response.data);
  
      if(response.data){
          const token = response.data.token;
          localStorage.setItem("authToken", token);
          dispatch(login(response.data))
      }
  
      router.replace("/");
    } catch (error) {
      console.error("Login Error");
      setError("Invalid credentials")
      setErrorDisplay(true)
      setTimeout(() => {
        setErrorDisplay(false)
      }, 3000)
    }
  };
  

  return (
    <div className="grid place-items-center">
      <div className="shadow-lg p-5 rounded-lg mt-20 border-t-4 border-slate-500">
        <h1 className="text-xl font-bold py-5 text-center">Login</h1>

        {error && errorDisplay &&(
            <div className="bg-red-500 text-white w-full text-center text-sm py-1 px-3 rounded-md mt-2 mb-3">
              {error}
            </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            className="w-[400px] border border-gray-200 py-2 px-6"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter Email"
          />
          <input
            className="w-[400px] border border-gray-200 py-2 px-6"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
          />
          <button className="bg-slate-600 text-white hover:bg-white hover:text-slate-600 border border-slate-600 font-bold cursor-pointer px-6 py-2">
            Login
          </button>

          

          <Link href={"/register"} className="text-sm mt-3 text-right">
            Do not have an account?{" "}
            <span className="underline font-bold">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
