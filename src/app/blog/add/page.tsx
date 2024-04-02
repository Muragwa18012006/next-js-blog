'use client'
import { useRef,useEffect } from "react"
import { useRouter } from "next/navigation"
import { revalidatePath } from "next/cache"
import { useState } from "react"
const postBlog = async({title, description}:{title:string, description:string}) => {
    const BACKEND_URL = process.env.BACKEND_URL!
    const  res = fetch(BACKEND_URL , {
        method: "POST",
        body: JSON.stringify({title, description}),
        headers: { "Content-Type": "application/json" },       
    })
    return (await res).json()
    
}
const AddBlog = () => {
    const router = useRouter()
    const titleRef = useRef<HTMLInputElement | null>(null)
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleSubmit = async(e: any) => {
        e.preventDefault()
        
        if (titleRef.current && descriptionRef.current){
            try {
                setIsLoading(true)
      const  info = await postBlog({title: titleRef.current?.value, description:descriptionRef.current?.value})
      console.log(info)
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
            <p className="text-2xl text-slate-200 font-bold p-3">Add A Blog</p>
            <form onSubmit={handleSubmit}>
                <input ref={titleRef} placeholder="Enter a title for blog" type="text" className="rounded-md px-4 py-2 my-2 sm:w-full w-2/3 mx-14 sm:mx-0 "/>
                <textarea ref={descriptionRef} className="rounded-md px-4 py-2 sm:w-full my-2 mx-14 sm:mx-0 w-2/3" placeholder="Enter a description"></textarea>
                <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto mx-14 sm:mx-0  hover:bg-slate-100">{isLoading ? "submiting..." :"Submit"}</button>
                </form>
        </div>
    </div>
  )
}

export default AddBlog