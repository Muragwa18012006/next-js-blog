import React from 'react'
import Edit from '@/components/Edit'
import { parseCookies } from 'nookies'
import {redirect} from 'next/navigation'
import { cookies } from "next/headers"
const page = async({ params }:{params: {id: string}}) => {
    const { id } = params
    /* const BACKEND_URL = process.env.BACKEND_URL! */
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
       redirect('/login')
    }
     const res = await fetch(`https://golang-project.onrender.com/users/todos/${id}` ,{
        cache:'no-store',
        headers : {
          "Context-Type": "application/json",
          "token": `${token}`
        }
     })
    const data = await res.json()
    const title = data.Title
    const description = data.description
    console.log(title, description) 
  return (
    <Edit id={id} title={title} description={description} token={token}></Edit>
  )
}

export default page