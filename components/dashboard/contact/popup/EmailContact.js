'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";


function EmailContact({ close, openUsers }) {

  const [value, setValue] = useState('');

  // Fetch value from localStorage once the component mounts
  useEffect(() => {
    const storedValue = localStorage.getItem('user');
    setValue(storedValue); // Update the state with the value
  }, []); 

  const router = useRouter();

  return (
    <div className='flex flex-col lg:flex-col h-[100vh] font-[family-name:var(--font-geist-mono)] absolute top-0 left-0 w-full items-center justify-center'>
     <div className='flex flex-col w-full h-[100vh] items-center justify-center relative cursor-pointer' onClick={close}></div>

     <div className='bg-[var(--background)] w-[600px] absolute z-999 p-10 rounded-md'>

      {/* Back icon */}
        <div className='bg-[var(--component)] p-3 rounded-full flex justify-center items-center w-[8%] cursor-pointer mb-6' onClick={openUsers}>
          <FaArrowLeftLong />
        </div>

        <div className='w-full'>
          <h1 className='lg:text-2xl text-xl font-semibold mb-8'>Send email</h1>
          {/* Email input */}
          <form action="email"
          className='mb-8'
          >
            <div className='flex flex-col mb-5 gap-3 w-full'>
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="e.g. New WhatsApp email" className='bg-[var(--component)] py-3 px-4 rounded-md placeholder:text-[var(--input)] w-full' required />
            </div>

            <div className='flex flex-col mb-5 gap-3 w-full'>
              <label htmlFor="subject">Message</label>
              <textarea type="text" id="subject" name="subject" placeholder="e.g. Thank you for being a valuable friend" className='bg-[var(--component)] py-3 px-4 rounded-md placeholder:text-[var(--input)] w-full' required />
            </div>

          </form>

          {/* Send button */}
          <button className='bg-[var(--button)] py-3 rounded-md text-center text-white w-full mb-5'
          onClick={()=> {
            router.push(`/contact/${value}`)
            close();
          }}
          >
          Send
          </button>

        </div>

     </div>


    </div>
  )
}

export default EmailContact;