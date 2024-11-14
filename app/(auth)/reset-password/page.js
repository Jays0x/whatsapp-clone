'use client'

import { useState } from "react";

import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import Link from 'next/link';

function Page() {

  const [ showPassword, setShowPassword ] = useState(false);
  const [ confirmShowPassword, setConfirmShowPassword ] = useState(false);


  const handleShowPassword = () => {
    setShowPassword(true)
  }

  const closePassword = () => {
    setShowPassword(false)
  }

  const handleConfirmShowPassword = () => {
    setConfirmShowPassword(true)
  }

  const closeConfirmPassword = () => {
    setConfirmShowPassword(false)
  }


  return (
    <div className='flex flex-col justify-center items-center h-[90vh] w-full font-[family-name:var(--font-geist-mono)]'>

      <div className='mb-8'>
        <h1 className='lg:text-2xl text-xl text-center font-semibold'>Reset password</h1>
        <p className='text-[var(--paragraph)] text-[14px]'>Kindly reset your password to protect your account</p>
      </div>

      <div className='mb-8 flex flex-col gap-4'>
              <form className='flex flex-col gap-4 '>

                <label htmlFor='name'>New password</label>
                <div className='w-[400px] bg-[var(--component)] py-3 px-4 rounded-md flex items-center '>
                  <input type={showPassword ? 'text' : 'password'} id='password' name='password' placeholder='Must be at least 6+ characters' className='placeholder:text-[var(--input)] w-full bg-transparent h-full outline-none border-none' required />

                  {
                    showPassword ? <IoEyeOutline className='w-5 h-5 cursor-pointer' onClick={closePassword}/> : <IoEyeOffOutline className='w-5 h-5 cursor-pointer' onClick={handleShowPassword}/>
                  }
                  
                </div>

                <label htmlFor='name'>Confirm password</label>
                <div className='w-[400px] bg-[var(--component)] py-3 px-4 rounded-md flex items-center mb-5'>
                  <input type={confirmShowPassword ? 'text' : 'password'} id='password' name='password' placeholder='Must be the same as first one' className='placeholder:text-[var(--input)] w-full bg-transparent h-full outline-none border-none' required />

                  {
                    confirmShowPassword ? <IoEyeOutline className='w-5 h-5 cursor-pointer' onClick={closeConfirmPassword}/> : <IoEyeOffOutline className='w-5 h-5 cursor-pointer' onClick={handleConfirmShowPassword}/>
                  }
                  
                </div>

              </form>

              <Link href='/home' className='bg-[var(--button)] py-4 rounded-md text-center text-white'>Confirm</Link>

        </div>

    </div>
  )
}

export default Page