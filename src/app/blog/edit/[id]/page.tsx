import React from 'react'
import Edit from '@/components/Edit'

const page = async({ params }:{params: {id: string}}) => {
    const { id } = params
    /* const BACKEND_URL = process.env.BACKEND_URL! */
     const res = await fetch(`https://golang-project.onrender.com/users/todos/${id}` ,{
        cache:'no-store'
     })
    const data = await res.json()
    const title = data.Title
    const description = data.description
    console.log(title, description) 
  return (
    <Edit id={id} title={title} description={description}></Edit>
  )
}

export default page