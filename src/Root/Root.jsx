import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Component/Shered/Navbar'
import { AuthContext } from '../Provider/AuthProvider'

const Root = () => {
  const {user} = useContext(AuthContext)
  return (
    <div>
       
       <div className='min-h-[90vh]'>
       <Outlet/>
       </div>
        {user && <p className='text-center'>Footer </p>}
    </div>
  )
}

export default Root
