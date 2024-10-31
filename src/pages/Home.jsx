import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [commentInput, setCommentInput] = useState("");

  const notify = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      theme: "dark"
    });
  };

  useEffect(() => {
    axios.get("https://social-app-backend-i4s4.onrender.com/api/posts").then((response) => {
      console.log(response.data.posts)
      setPosts([...response.data.posts])
      setLoading(false)

    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const handleLike = (postId) => {
    axios
      .post(`https://social-app-backend-i4s4.onrender.com/api/posts/like/${postId}`)
      .then((response) => {
        console.log(response)
        const updatedPosts = posts.map((post) =>
          post._id === postId ? response.data.post : post
        );
        notify("Liked")
        setPosts(updatedPosts);
      })
      .catch((error) => console.error("Error liking post:", error));
  };

  const handleAddComment = (postId, commentText) => {
    axios
      .post(`https://social-app-backend-i4s4.onrender.com/api/posts/comment/${postId}`, {
        text: commentText,
      })
      .then((response) => {
        const updatedPosts = posts.map((post) =>
          post._id === postId ? response.data.post : post
        );
        notify("Commented")
        setPosts(updatedPosts);

      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  return (
    <>
        <ToastContainer />
      {loading ? (
        <div id='loder' className='h-12 w-12 bg-green-700 absolute top-[50%] bottom-[50%] rounded-tl-full rounded-br-full shadow-md shadow-blue-300 animate-spin '>
        </div>) : (
        <div className='mt-10 flex flex-col justify-center mx-4'>
          <h2 className='text-3xl font-medium mb-10'>Recents Post</h2>

          <div className='ring-4 ring-orange-700 p-3 flex-wrap rounded-md flex flex-col gap-[60px] mb-[90px]'>

            {
              posts.map((post) => (
                <div key={post._id} className=' flex flex-col justify-center gap-3 bg-slate-700 p-2 text-white rounded-lg'>
                  <h3 className='text-2xl font-semibold text-center'>{post.title}</h3>
                  <p className='text-xl bg-slate-600 p-2 rounded-lg'>{post.content}</p>
                  {post.file && (
                    <div className='bg-teal-900 text-white p-2 text-base rounded-lg'>
                      <a href={`https://social-app-backend-i4s4.onrender.com/uploads/${post.file}`} target='_blank'>Open or Download</a>
                    </div>
                  )}
                  <div className='flex gap-5 text-xl items-center '><p>Likes: {post.likes}</p><button onClick={() => handleLike(post._id)}><AiFillLike size={"25px"} /></button></div>
                  <p className='text-xl'>Comments: {post.comments.length}</p>
                  <div className='flex items-center gap-2'>
                    <input type="text" placeholder="Add a comment" className="text-black w-[300px] px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700" onChange={(e) => setCommentInput(e.target.value)} />
                    <button className='bg-blue-600 p-2 rounded-full' onClick={() => handleAddComment(post._id, commentInput)}><FaComment size={"25px"} /></button>
                  </div>

                  <ul className='bg-blue-950 p-2 rounded-lg text-xl'>
                    {post.comments.map((comment, index) => (
                      <li key={index} className='mb-1 bg-gray-900 bg-opacity-30 p-2 rounded-lg'>{comment.text}</li>
                    ))}
                  </ul>
                </div>
              ))
            }
          </div>
        </div>)}
    </>
  )
}

export default Home