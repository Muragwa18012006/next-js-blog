'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
type Props = {
    result: string
}

const DeletBlog = ({result}: Props) => {
    const router = useRouter()
    const handleDelete = async() => {
      /* const BACKEND_URL = process.env.BACKEND_URL! */
        const res = await fetch(`https://golang-project.onrender.com/users/${result}`, {
            method: 'DELETE',
        })
        console.log(res)
        router.refresh()
    }
  return (
    <button className="px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200 hover:opacity-80 active:opacity-25" onClick={handleDelete}>DEL</button>
  )
}

export default DeletBlog