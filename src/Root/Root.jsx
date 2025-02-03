import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Component/Shered/Navbar'

const Root = () => {
  return (
    <div>
      <Navbar/>
       <div className='min-h-[90vh]'>
       <Outlet/>
       </div>
        <p className='text-center'>Footer </p>
    </div>
  )
}

export default Root
