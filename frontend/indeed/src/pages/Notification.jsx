import React from 'react'
import noti from '../assets/noti.svg'
import {Link} from 'react-router-dom'

const Notification = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-6 mx-auto text-center'> 
      <img src={noti} alt="notification" className='w-40 h-40 mb-4'/>
      <h3 className='font-bold text-gray-800 md:text-2xl sm:text-lg mb-2'>
        Nothing right now. Check back later!
      </h3>
      <p className='text-lg text-gray-500 mb-4'>
        This is where we’ll notify you about your job applications and other useful information to help you with your job search.
      </p>
      <Link to="/home">
      <button className='w-52 rounded-md p-2 text-white bg-[#2557A7]'>
        Find Jobs
      </button>
      </Link>
    </div>
  )
}

export default Notification
