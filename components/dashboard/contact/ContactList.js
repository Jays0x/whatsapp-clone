'use client'
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import contactData from './data';
import Image from 'next/image';
import EmailContact from './popup/EmailContact';
import AllUserContact from './popup/AllUserContact';
import Link from 'next/link';

function ContactList() {
  const [allUser, setAllUser] = useState(false);
  const [openInput, setOpenInput] = useState(false);

  const handleAllUser = () => {
    setAllUser(true);
    setOpenInput(false);
  }

  const closeAllUser = () => {
    setAllUser(false);
    setOpenInput(false);
  };

  const handleOpenInput = () => {
    setOpenInput(true);
    setAllUser(false);
  }

  const handleCloseInput = () => {
    setOpenInput(false);
    setAllUser(false);
  }

  console.log(contactData)

  

  return (
    <div className='flex flex-col lg:flex-col h-[100vh] font-[family-name:var(--font-geist-mono)] p-8'>

      <div className='flex justify-between items-center mb-8'>
        <h1 className='lg:text-2xl text-xl font-semibold'>Contact</h1>

        <div className='hover:bg-[var(--hover)] px-4 py-3 rounded-md cursor-pointer' onClick={handleAllUser}>
          <FaPlus />
        </div>
        {
          allUser && !openInput && <AllUserContact close={closeAllUser} openInput={handleOpenInput} closeInput={handleCloseInput} input={openInput} openUsers={handleAllUser} />
        }

      </div>

      {
        openInput && !allUser && <EmailContact close={handleCloseInput} openUsers={handleAllUser} />
      }

      {/* Contact list */}
      <div>
        {
          contactData.map((contact) => {
            const lastMessage = contact.content.at(-1); // Access the last message directly

            console.log(contact)
            return (
              <Link href={`/contact/${contact.id}`} key={contact.id} className='flex gap-4 mb-6 w-full '>
                <div className='w-[50px] h-[50px]'>
                  <Image 
                    src={contact.avatar} 
                    alt='contactImage' 
                    width={50} 
                    height={50} 
                    className='rounded-full object-cover w-full h-full'
                  />
                </div>

                {/* Display last message */}
                <div className='w-[60%]'>
                  <h2 className='text-md font-medium line-clamp-1'>{lastMessage.subject}</h2>
                  <p className='text-[var(--paragraph)] text-sm line-clamp-2'>{lastMessage.message}</p>
                </div>
              </Link>
            )
          })
        }
      </div>

    </div>
  );
}

export default ContactList;
