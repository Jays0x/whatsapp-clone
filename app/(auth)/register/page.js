'use client'

import React, { useState } from 'react'

import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import Link from 'next/link';

function Page() {

  const [ showPassword, setShowPassword ] = useState(false);


  const handleShowPassword = () => {
    setShowPassword(true)
  }

  const closePassword = () => {
    setShowPassword(false)
  }

  return (
    <div className='flex flex-col justify-center items-center h-[90vh] w-full font-[family-name:var(--font-geist-mono)]'>
       <div className='mb-8'>
          <h1 className='lg:text-2xl text-xl text-center font-semibold'>Welcome to whastApp</h1>
          <p className='text-[var(--paragraph)] text-[14px]'>Kindly create an account to get started</p>
       </div>

       <div className='mb-8 flex flex-col gap-4'>
              <form className='flex flex-col gap-4 '>
                <label htmlFor='name'>Full name</label>
                <input type='text' id='name' name='name' placeholder='e.g Jays Alimi' className='bg-[var(--component)] py-3 px-4 rounded-md placeholder:text-[var(--input)] w-[400px]' required />

                <label htmlFor='name'>Email address</label>
                <input type='email' id='email' name='email' placeholder='e.g example@gmail.com' className='bg-[var(--component)] py-3 px-4 rounded-md placeholder:text-[var(--input)] w-[400px]' required />

                <label htmlFor='name'>Password</label>
                <div className='w-[400px] bg-[var(--component)] py-3 px-4 rounded-md flex items-center mb-5'>
                  <input type={showPassword ? 'text' : 'password'} id='password' name='password' placeholder='Must be at least 6+ characters' className='placeholder:text-[var(--input)] w-full bg-transparent h-full outline-none border-none' required />

                  {
                    showPassword ? <IoEyeOutline className='w-5 h-5 cursor-pointer' onClick={closePassword}/> : <IoEyeOffOutline className='w-5 h-5 cursor-pointer' onClick={handleShowPassword}/>
                  }
                  
                </div>

              </form>

              <Link href='/account-verification' className='bg-[var(--button)] text-white py-4 rounded-md text-center mb-10'>Submit</Link>

              <p className='text-center text-[var(--paragraph)]'>
                Already have an account?{' '}
                <Link href='/login' className='text-[var(--button)] font-semibold'>Log in</Link>
              </p>
        </div>

    </div>
  )
}

export default Page