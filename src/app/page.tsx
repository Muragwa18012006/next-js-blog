import Link from "next/link"
import DeletBlog from "@/components/DeletBlog"

interface PostProps {
  _id: string,
  Title: string,
  description: string
}
const fetchBlogs = async() => {
  /* const BACKEND_URL = process.env.BACKEND_URL! */
  const res = await fetch("https://golang-project.onrender.com/users/todos", {
   cache: "no-store"
  })
  const data = await res.json()
  return data
  
}
export default async function Home() {
  const posts = await fetchBlogs()
  console.log(posts)
  return (
    <main className=" w-full h-screen">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 rounded-lg bg-slate-800 drop-shadow-xl">
        <h1 className='text-slate-200 text-center text-2xl font-extrabold font-[verdana]'>MY FULL STACK Blog With GOLANG</h1>
        {/* <div className="bg-slate-200 w-[125px] h-[400px] flex  sm:disable">Menu</div> */}
        </div> 
        <div className='flex '>
          <Link href={"/blog/add"} className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-200 font-semibold mt-4">Add New Blog</Link>
        </div>
        {/*  add posts of todo here*/}
        <div className="w-full flex flex-col justify-center items-center">
          {posts?.map((post:PostProps) => (
            <div className="w-3/4 p-4 rounded-md mx-3 my-3 bg-slate-200 flex flex-col justify-center" key={post._id}>
              {/* title */}
              <div className="flex items-center my-3">
                <div className="mr-auto">
                  <h2 className="mr-auto font-semibold">{post.Title}</h2>
                </div>
                <div className="flex gap-4">
                <DeletBlog result={post._id} /* className="px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200" */ />
                {/* <Edit result={post._id}></Edit> */}
              <button className="px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200 hover:opacity-80 active:opacity-25"><Link href={`/blog/edit/${post._id}`} >EDIT</Link></button>  
                </div>
                    
                  
              </div>
              <div className="mr-auto my-1">
                <h2>{post.description}</h2>
              </div>
            </div>
          ))}
        </div>
    </main>
  )
}
