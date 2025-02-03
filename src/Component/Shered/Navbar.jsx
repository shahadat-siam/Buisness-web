import React from 'react'
import { Link, } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex max-w-7xl mx-auto px-16 py-6 justify-between items-center'>
        <div>
            Logo
        </div>
        <ul className='flex  justify-between items-center space-x-3'>
            <Link to="/signup"><li className='bg-[#497D74] px-4 py-2 rounded-md text-[#f2f3f5] font-semibold '>Sign Up</li></Link>
            <Link to="/login"> <li className='bg-[#497D74] px-4 py-2 rounded-md text-[#edeeee] font-semibold '>Login</li></Link>
        </ul>
    </div>
  )
}

export default Navbar