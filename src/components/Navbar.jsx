import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <>
        <nav className='bg-emerald-400 p-2 flex justify-around items-center'>
            <div className="logo text-2xl text-gray-950 font-semibold "><Link to="/">Postz</Link></div>
            
                <ul className='text-gray-950 font-medium text-xl flex justify-evenly items-center gap-5'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/create">Create Post</Link></li>
                </ul>
        </nav>
        </>
    )
}

export default Navbar