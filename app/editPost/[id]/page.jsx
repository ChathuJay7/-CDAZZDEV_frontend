
import EditPostForm from '@/components/EditPostForm'
import React from 'react'


const getPostById = async (id) => {
    try {
        const res = await fetch(`http://localhost:5000/post/${id}`,
        {
            cache: "no-store"
        }
        )

        if(!res.ok){
            throw new Error("Failed to fetch todo")
        }

        return res.json()

    } catch (error) {
        console.log(error)
    }
}

export default async function EditPost({ params }) {

    const { id } = params;
    const { post } = await getPostById(id)
    const { title, description } = post

  return (
    <EditPostForm id={id} title={title} description={description} />
  )
}
