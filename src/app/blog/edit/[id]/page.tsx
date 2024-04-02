import React from 'react'
import Edit from '@/components/Edit'

const page = async({ params }:{params: {id: string}}) => {
    const { id } = params
     const res = await fetch(`http://localhost:9000/users/todos/${id}` ,{
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