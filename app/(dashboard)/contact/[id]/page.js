'use client'
import contactData from '@/components/dashboard/contact/data';
import { usePathname } from 'next/navigation'
import React from 'react'

import { RiDeleteBinLine } from "react-icons/ri";
import { IoShareSocialOutline } from "react-icons/io5";

function Page() {

  const pathname = usePathname()

  const id = pathname.split('/').pop();

  const contact = contactData.find((contact) => contact.id === parseInt(id));

  if (!contact) return <div>No contact found</div>;

  return (
    <div className='flex flex-col justify-center w-full items-center h-[100vh] font-[family-name:var(--font-geist-mono)] px-5'>
      <div>
        <h1 className='lg:text-2xl text-xl mb-5'>Message {contact.id}</h1>

        <div>
          {
            contact.content.map((message, index) => (
              <div key={index}>
                <div className='bg-[var(--hover)] lg:w-[600px] w-full p-6 mb-5 rounded-md'>
                  <h2 className='text-md mb-2'>{message.subject}</h2>
                  <p className='text-sm text-[var(--paragraph)]'>{message.message}</p>
                </div>

                <div className='flex items-center justify-center mb-6 gap-4'>
                  <div className='flex bg-[var(--hover)] p-4 rounded-md cursor-pointer'><IoShareSocialOutline /></div>
                  <div className='flex bg-[var(--hover)] p-4 rounded-md cursor-pointer'><RiDeleteBinLine /></div>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default Page