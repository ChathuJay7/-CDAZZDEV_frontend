"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function LoginForm() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const res = await fetch('http://localhost:5000/auth/login', {
            headers: {
              "Content-Type": 'application/json'
            },
            method: "POST",
            body: JSON.stringify({email, password})
          });
    
          const data = await res.json()
          console.log(data)
          router.replace("/")
    
        } catch (error) {
          setError(true)
          setTimeout(() => {
            setError(false)
          }, 3000)
        }
      }


  return (
    <div className='grid place-items-center '>
      <div className='shadow-lg p-5 rounded-lg mt-20 border-t-4 border-slate-500'>
        <h1 className='text-xl font-bold py-5 text-center'>Login</h1>
        <form onSubmit={handleLogin} className='flex flex-col gap-3'>
            <input className='w-[400px] border border-gray-200 py-2 px-6' onChange={e => setEmail(e.target.value)} type='text' placeholder='Enter Email'/>
            <input className='w-[400px] border border-gray-200 py-2 px-6' onChange={e => setPassword(e.target.value)} type='password' placeholder='Enter Password'/>
            <button className='bg-slate-600 text-white hover:bg-white hover:text-slate-600 border border-slate-600 font-bold cursor-pointer px-6 py-2'>Login</button>

            {error && (
                <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                    {error}
                </div>
            )}
            
            
            <Link href={'/register'} className='text-sm mt-3 text-right'> 
                Do not have an account? <span className='underline font-bold'>Register</span>
            </Link>
        </form>
      </div>
    </div>
  )
}
