'use client'
import contactData from '@/components/dashboard/contact/data';
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from "react-icons/ri";

function Page() {
  const pathname = usePathname();

  // Extract and parse the id from the URL
  const contentId = parseInt(pathname.split('/').pop(), 10);

  // Find the specific contact by id
  const contact = contactData.find(contact => contact.id === contentId);

  if(!contact) {
    return <div>Contact not found</div>
  }
;

  return (
    <div className='flex flex-col justify-center items-center h-[100vh] font-[family-name:var(--font-geist-mono)] w-full px-8 py-6'>
      <div>
        <h1 className='text-2xl'>Message:</h1>
        <div>
         {
          contact.content.map((contact) =>{

            const latestDate = new Date(contact.timestamp).toLocaleString();
            
            return (
              <div key={contact.id}>
                <div className="flex flex-col items-start gap-4 mb-6 bg-[var(--hover)] mt-6 p-8 lg:w-[600px] w-full rounded-md">
                  <h2 className="text-lg font-semibold">{contact.subject}</h2>
                  <p className="text-sm text-[var(--paragraph)]">{contact.message}</p>
                  <span className="text-sm text-[var(--tag)]">{latestDate}</span>
                </div>

                <div className="flex justify-center gap-4">
                  <div className='bg-[var(--hover)] p-4 rounded-md'><FaEdit /></div>
                  <div className='bg-[var(--hover)] p-4 rounded-md'><RiDeleteBin6Line /></div>
                </div>
            </div>
            )
            
         })
         }
        </div>
      </div>
    </div>
  )
}

export default Page