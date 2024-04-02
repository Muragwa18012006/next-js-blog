"use client"
import { ChangeEvent, TextareaHTMLAttributes, useRef } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"



const postBlog = async({title, description, id}:{title:string, description:string, id:string|string[]}) => {
    /* const BACKEND_URL = process.env.BACKEND_URL! */
    const  res = fetch(`https://golang-project.onrender.com/users/update/${id}`, {
        method: "PUT",
        body: JSON.stringify({title, description}),
        headers: { "Content-Type": "application/json" },       
    })
    return (await res).json()
    
}
const GetBlogById = async(id:string) => {
    /* const BACKEND_URL = process.env.BACKEND_URL! */
    const res = await fetch(`https://golang-project.onrender.com/users/todos/${id}`)
    return res.json()
}
type Props = {
    title:string,
    id: string,
    description: string
}
const Edit = ({id, title, description}:Props) => {
    const router = useRouter()
    const titleRef = useRef<HTMLInputElement | null>(null)
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)

    const handleSubmit = async(e: any) => {
        e.preventDefault()
        if (titleRef.current && descriptionRef.current){
            try {
                setIsLoading(true)
          await postBlog({title: titleRef.current?.value, description:descriptionRef.current?.value, id})
        
         
        router.push('/')
        router.refresh() 
            } catch (error:any) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
    }
}
  return (
    <div className="w-full m-auto flex my-4">
    <div className="flex flex-col justify-center items-center m-auto">
        <p className="text-2xl text-slate-200 font-bold p-3">Edit A Blog</p>
        <form onSubmit={handleSubmit}>
            <input ref={titleRef} placeholder="Enter a title for blog" type="text" className="rounded-md px-4 py-2 my-2 sm:w-full w-2/3 mx-14 sm:mx-0 " value={newTitle} onChange={(e:ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}/>
            <textarea ref={descriptionRef} className="rounded-md px-4 py-2 sm:w-full my-2 mx-14 sm:mx-0 w-2/3" placeholder="Enter a description" value={newDescription} onChange={(e:ChangeEvent<HTMLTextAreaElement>) => setNewDescription(e.target.value)}></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto mx-14 sm:mx-0  hover:bg-slate-100">{isLoading ? "submiting..." :"Submit"}</button>
            </form>
    </div>
</div>
  )
}

export default Edit

