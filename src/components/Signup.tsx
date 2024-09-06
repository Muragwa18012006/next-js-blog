"use client"
import React from 'react'
import { useRouter } from 'next/navigation'



const Signup = () => {
  const router = useRouter()
  const onSubmit = async(formData: FormData) => {
    const Firstname = formData.get("firstname")
    const Lastname = formData.get("lastname")
    const Email = formData.get("email")
    const Password = formData.get("password")
    if(Firstname === '' || Lastname === '' || Email === ''|| Password === '') {
      alert('fill all fields below')
      return
    }
  
    const res = await fetch("https://golang-project.onrender.com/create", {
      method: "POST",
      body: JSON.stringify({Firstname, Lastname, Email, Password}),
      headers: {"Content-Type":"application/json"}
    })
    /* const data = await res.json() */
    if (res.ok) {
      router.push(`/login`)
    } else {
      alert('fill all fields')
    }
    
  }
  return (
    <form action={onSubmit} className='f sm:w-50 w-45 box-border  rounded-lg grid sm:p-16 p-14 justify-items-end shadow-2xl mx-4 shadow-black'>
        <h1 className='w font-bold text-xl mb-9 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>Log In or Sign Up to your BLOG</h1>
      <h2 className='bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500'> First Name: <input type="text" placeholder="Enter your FirstName" className="rounded-md px-4 py-2 my-2 w-auto focus:outline-none text-black text-sm" name='firstname'/></h2>
     <h2 className='bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500'>LastName: <input type="text" placeholder="Enter your LastName" className="rounded-md px-4 py-2 my-2 w-auto focus:outline-none text-black text-sm" name='lastname'/></h2> 
       <h2 className='bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500'>Email: <input type="text" placeholder="Enter your email" className="rounded-md px-4 py-2 my-2 w-auto focus:outline-none text-black text-sm" name='email'/></h2> 
        <h2 className='bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500'>Password: <input type="password" placeholder="Enter your password" className="rounded-md px-4 py-2 my-2 w-auto focus:outline-none text-black text-sm" name='password'/></h2>
        <button className="font-semibold px-4 py-2 shadow-sm bg-slate-200 rounded-lg m-auto w-auto mt-3 active:opacity-45 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-50   shadow-black hover:scale-105">Sign Up</button>
      </form>
  )
}

export default Signup