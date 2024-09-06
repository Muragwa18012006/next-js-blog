"use client"
import React from 'react'
import { redirect, useRouter } from 'next/navigation'
import { setCookie } from 'nookies';
import Link from 'next/link'
import {useState} from 'react'
import CircularWithValueLabel from './LoadingModal';
import PasswordInput from './PasswordInput';

type DATA = {
  id: string
  Firstname: string
  Lastname: string
  Email: string
  token: string
  refreshToken: string
}
const Login = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<string|null>('')
    const onSubmit = async(formData: FormData) => {
      const Email = formData.get("email")
      const Password = formData.get("password")
      if(Email === "" || Password === "") {
        alert('fill all fields below')
        return
      }
      try {
        setIsLoading(true)
        const res = await fetch("https://golang-project.onrender.com/login", {
          method: "POST",
          body: JSON.stringify({Email, Password}),
          headers: {"Content-Type":"application/json"}
        })
        
        if(res.ok) {
          const data:DATA = await res.json() 
          console.log(data)
          const token = data.token
          console.log(token)
          setCookie(null, 'token', token, {
           maxAge: 7 * 24 * 60 * 60, 
              path: '/',
          });
        router.push(`/${data.id}`)
         router.refresh() 
        } else {
          const message = await res.json()
          setMessage(message.error)
          redirect('/login')
         
        }
      } catch (error) {
        throw new Error()
      }   finally {
        setIsLoading(false)
      }
    }
    if (isLoading) {
      return (
        <div className='w-full min-h-screen bg-gray-900'>
          <CircularWithValueLabel/>
        </div>
      ); // Show loading indicator
    }
  return (
        <form action={onSubmit} className='f sm:w-50 w-45 box-border  grid sm:p-16 p-14 justify-items-end sm:mx-auto shadow-md shadow-black relative mx-4'>
        <div className='ml-0 absolute top-2 right-16'>
        <p className='text-red-600 ml-0'>{message}</p>
        </div>
          
        <h1 className='w font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-9'>Log In or Sign Up to your BLOG</h1>
       <h2 className='bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500'>Email: <input type="text" placeholder="Enter your email" className="rounded-md px-4 py-2 my-2 w-auto focus:outline-none text-black text-sm" name='email'/></h2> 
        <h2 className='bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500'>Password: <input type="password" placeholder="Enter your password" className="rounded-md px-4 py-2 my-2 w-auto focus:outline-none text-black text-sm" name='password'/> </h2>
        
        <button className="font-semibold px-4 py-2 shadow-md bg-slate-200 rounded-lg m-auto w-auto mt-5  active:opacity-45 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-50   shadow-black hover:scale-105">LOGIN</button>
        <Link className="text-orange-400 mr-0 text-xs 
        " href={'/signup'}>SignUp Here</Link>
      </form>
  )
    }

export default Login