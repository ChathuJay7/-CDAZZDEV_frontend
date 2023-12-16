"use client"

import BlogPosts from '@/components/BlogPosts'
import { useSelector } from 'react-redux'
import { useRouter, redirect } from "next/navigation";
import { useLayoutEffect } from 'react';

export default function Home() {

  const { user } = useSelector((state) => state.auth)

  const router = useRouter();

  useLayoutEffect(() => {
    const isAuth = user;
    if(!isAuth){
      redirect('/login')
    }
  }, [])


  console.log(user)

  return (

    <>
      <BlogPosts />

    </>


  )
}
