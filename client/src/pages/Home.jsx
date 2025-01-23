import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CallToAction from "../components/CallToAction"
import PostCard from "../components/PostCard"

const Home = () => {
  const [posts, setPosts] = useState([])
  //console.log(posts)

  useEffect(() => {
      const fetchPosts = async() => {
        const res = await fetch("/api/post/getposts");
        const data = await res.json()
        setPosts(data.posts)
      }
      fetchPosts()
  }, [])
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-5xl'>Mastering Responsive Design: Tips and Tricks for Modern Websites</h1>
        <p className='text-gray-700 text-6xl sm:text-sm dark:text-white'>Web Dev Chronicles: Your go-to destination for all things web development! Explore insights, tips, and trends in 
          front-end, back-end, and full-stack technologies. From mastering the basics to diving deep into advanced frameworks, 
          we empower developers to create modern, responsive, and efficient web solutions.</p>
          <Link to="/search" className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
            View all posts
          </Link>
      </div>
      <div className='p-3  dark:bg-slate-800 mx-20'> 

        <CallToAction />
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0  && (
          <div className='flex flex-col gap-6'>
                <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
                <div className='flex flex-wrap gap-10 ml-10'>
                  {posts.map((post) => (
                    <PostCard key={post._id} post={post}/>
                  ))}
                </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Home