import Link from "next/link"
import DeletBlog from "@/components/DeletBlog"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"

interface PostProps {
  _id: string,
  Title: string,
  description: string
}
const fetchBlogs = async(id:string, token:string) => {
  /* const BACKEND_URL = process.env.BACKEND_URL! */
  

  const res = await fetch(`https://golang-project.onrender.com/users/post/${id}`, {
   cache: "no-store",
   headers: { "Content-Type": "application/json",
               'token': `${token}`
    }
  })
  const data = await res.json()
  /* Array.isArray(data) ? data : [] */
  return data
  
}
export default async function Home({params}:{params:{id:string}}) {
 
  const {id} = params
  
   const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
 
  if (!token) {
      redirect('/login')
  }
  const posts = await fetchBlogs(id, token)
  return (
    <main className=" w-full min-h-screen bg-gray-900">
      <div className="md:w-2/3 sm:w-3/4 m-auto p-4 rounded-lg bg-gray-800 drop-shadow-xl font-black">
        <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-900 to-gray-900 text-center text-2xl font-extrabold font-[verdana]'>MY FULL STACK Blog With GOLANG</h1>
        {/*  <div className="bg-slate-200 w-[125px] h-[400px] flex right-0 sm:hidden">Menu</div>  */}
        </div> 
        <div className='flex top-2'>
          <Link href={`/blog/add/${id}`} className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-clip-text text-transparent bg-gradient-to-r from-yellow-800 to-white font-semibold mt-4 hover:font-black transition-all">Add New Blog</Link>
        </div>
        
        <div className="w-full flex flex-col justify-center items-center">
             {posts === null ? <div className='bg-gradient-to-r from-purple-500 to-pink-50 text-2xl bg-clip-text text-transparent sm:mt-[25%] mt-[50%]'>No Blog Found To Render</div> : posts?.map((post:PostProps) => (
            <div className="w-3/4 p-4 rounded-md mx-3 my-3 bg-gradient-to-r from-blue-950 to-pink-800 flex flex-col justify-center shadow-md shadow-black" key={post._id}>
             
              <div className="flex items-center my-3">
                <div className="mr-auto w-2/4 h-auto break-words">
                  <h2 className="mr-auto w-full break-words font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 ">{post.Title}</h2>
                </div>
                <div className="flex sm:gap-4 gap-1">
                <DeletBlog result={post._id} token={token} />
                
              <button className=" text-center text-xl bg-slate-900 rounded-md font-semibold  hover:opacity-80 active:opacity-45 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-50"><Link href={`/blog/edit/${post._id}`} >EDIT</Link></button>  
                </div>
                    
                  
              </div>
              <div className="mr-auto my-1 w-3/4 ">
                <h2 className="w-full break-words bg-clip-text text-transparent bg-gradient-to-r from-yellow-800 to-white font-extrabold font-serif">{post.description}</h2>
              </div>
            </div>
          ))}
        </div>
    </main>
  )
}
