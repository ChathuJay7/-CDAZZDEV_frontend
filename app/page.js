

import BlogPosts from '@/components/BlogPosts'
// import { useSelector } from 'react-redux'
// import { useRouter, redirect } from "next/navigation";
// import { useLayoutEffect } from 'react';
// import Login from './login/page';

export default function Home() {

  // const { user } = useSelector((state) => state.auth)

  // const token = localStorage.getItem("authToken")

  // const router = useRouter();

  // useLayoutEffect(() => {

  //   if(!token){
  //     redirect('/login')
  //   }
  // }, [])


  // console.log(user)

  return (

    <>
      <BlogPosts/>

    </>


  )
}
