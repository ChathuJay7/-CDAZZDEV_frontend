import Image from 'next/image'
import Login from './login/page'
import Register from './register/page'
import BlogPosts from '@/components/BlogPosts'

export default function Home() {
  return (
    <main >
      <BlogPosts />
    </main>
  )
}
