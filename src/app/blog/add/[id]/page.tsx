import React from 'react'
import AddBlog from '@/components/AddTodo'
import { cookies } from "next/headers"
import CircularWithValueLabel from '@/components/LoadingModal'
import { Suspense } from 'react';

const page = ({params}:{params:{id:string}}) => {
  const {id} = params
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
  return (
    <main className="w-full h-screen bg-gray-900">
      <Suspense fallback={
        <div className='w-full min-h-screen bg-gray-900'>
        <CircularWithValueLabel/>
      </div>
      }>
      <AddBlog token={token!} id={id} />
      </Suspense>
      
    </main>
    
  )
}

export default page