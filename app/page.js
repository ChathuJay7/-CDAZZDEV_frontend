"use client"

import Image from 'next/image'
import Login from './login/page'
import Register from './register/page'
import BlogPosts from '@/components/BlogPosts'
import { useSelector } from 'react-redux'


export default function Home() {

  const { user } = useSelector((state) => state.auth)

  console.log(user)

  return (

      <BlogPosts />


  )
}
