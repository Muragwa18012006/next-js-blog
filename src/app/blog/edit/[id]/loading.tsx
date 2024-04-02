import React from 'react'

const Loading = () => {
  return (
    <div className='text relative'>
    <div className="w-full m-auto flex my-4 blur-sm relative">
   <div className="flex flex-col justify-center items-center m-auto">
  <p className="text-2xl text-slate-200 font-bold p-3">Edit A Blog</p>
  <form>
      <input placeholder="Enter a title for blog" type="text" className="rounded-md px-4 py-2 my-2 sm:w-full w-2/3 mx-14 sm:mx-0 " />
      <textarea  className="rounded-md px-4 py-2 sm:w-full my-2 mx-14 sm:mx-0 w-2/3" placeholder="Enter a description" ></textarea>
      <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto mx-14 sm:mx-0  hover:bg-slate-100">Submit</button>
      </form>
</div>
</div>
  <div className="text animate-pulse w-2/4 h-screen absolute top-57 left-1/4">
    <div className=' w-30 h-28 rounded-md bg-slate-200 text-slate-900 text-center p-2 m-auto animate-pulse items-center flex justify-center'>
        <h2 className='TEX text-slate-900 text-xl font-bold font-serif'>Loading...</h2></div>
  </div>
</div>
  )
}

export default Loading