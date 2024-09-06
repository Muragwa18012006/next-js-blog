'use client'
import React from 'react'
import { redirect, useRouter } from 'next/navigation'
import { parseCookies } from 'nookies'
type Props = {
    result: string
    token: string
}

const DeletBlog = ({result, token}: Props) => {
    const router = useRouter()
    const handleDelete = async() => {

      if(!token) {
        redirect('/login')
      }
        const res = await fetch(`https://golang-project.onrender.com/users/${result}`, {
            method: 'DELETE',
            headers : {
              'token': `${token}`,
              'Content-Type': 'application/json',
            }
        })
        console.log(res)
        router.refresh()
    }
  return (
    <button className="px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold hover:opacity-80 active:opacity-45 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-50" onClick={handleDelete}>DEL</button>
  )
}

export default DeletBlog