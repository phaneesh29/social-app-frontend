import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Createpost = () => {

    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
        file: null,
    })

    const [btnText, setBtnText] = useState("Post")

    const notify = () => {
        toast.success('Posted SuccessFully!', {
          position: "top-right",
          autoClose: 3000, 
          theme:"dark"
        });
      };


    const handleInputChange = (event) => {
        const { name, value } = event.target
        setNewPost({ ...newPost, [name]: value })
    }

    const handleFileChange = (event) => {
        console.log(event.target.files[0])
        setNewPost({ ...newPost, file: event.target.files[0] })
    }

    const handlePostSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("title", newPost.title)
            formData.append("content", newPost.content)
            formData.append("file", newPost.file)
            
            setBtnText("Posting...")
            const response = await axios.post("https://social-app-backend-i4s4.onrender.com/api/posts",formData)
            notify()
            
            setNewPost({title:"",content:"",file:null})
            setBtnText("Post")

        } 
        catch (error) {
            console.error("Error creating post:", error)
        }
    }

    return (
        <>
        <ToastContainer />
            <div className="bg-slate-400 text-black my-5 mx-9 rounded-lg p-3 flex flex-col justify-center gap-4">
                <h2 className='text-3xl border-b-4 border-gray-500 text-center'>Create a Post</h2>
                <input required type="text" name='title' placeholder='Title' value={newPost.title} onChange={handleInputChange} className='p-3 rounded-xl text-xl focus:outline-none focus:ring-2 focus:ring-green-700' />
                <textarea required name="content" id="content" value={newPost.content} onChange={handleInputChange} placeholder='Content' className='p-3 rounded-xl text-xl focus:outline-none focus:ring-2 focus:ring-green-700 min-h-[300px] resize-none'></textarea>
                <input type="file" name='file' onChange={handleFileChange} className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded" />
                <button onClick={handlePostSubmit} className='p-2 text-xl bg-blue-700 text-white rounded-xl w-36'>{btnText}</button>
            </div>
        </>
    )
}

export default Createpost