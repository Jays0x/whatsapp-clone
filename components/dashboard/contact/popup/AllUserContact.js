'use client'
// import Link from 'next/link'
import React from 'react'
import EmailContact from './EmailContact'
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import userData from '../../chat/data';
import Image from 'next/image';

function AllUserContact({ close, openInput, closeInput, input, openUsers }) {

  const [searchTerm, setSearchTerm] = useState(''); // State for search term

    // Filter users based on the search term
    const filteredUsers = userData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex flex-col lg:flex-col h-[100vh] font-[family-name:var(--font-geist-mono)] absolute top-0 left-0 w-full items-center justify-center'>
     <div className='flex flex-col w-full h-[100vh] items-center justify-center relative cursor-pointer' onClick={close}></div>

     <div className='bg-[var(--background)] w-[600px] absolute z-999 p-10 rounded-md'>

      <div className='gap-3 items-center'>
        <h1 className='lg:text-2xl text-xl font-semibold mb-6'>Choose user</h1>

                {/* Search */}
        <div className='w-full bg-[var(--hover)] rounded-md py-3 px-4 flex gap-2 items-center mt-5 mb-8'>
          <FiSearch className='text-[var(--input)]' />
          <input
            type='search'
            placeholder='Search...'
            className='w-full h-full bg-transparent outline-none border-none placeholder:text-[var(--input)]'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          />
        </div>

        {/* User list */}
        <div>
          {
            filteredUsers.map((user) => (
              <div key={user.id}>
                <button 
                onClick={() => {
                  openInput();
                  localStorage.setItem('user', user.id);
                }} 
                className='flex justify-start items-center gap-4 text-left mb-8 '
                >
                <div className='w-[50px] h-[50px] rounded-full'>
                  <Image 
                    src={user.avatar} 
                    alt='contactImage' 
                    width={50} 
                    height={50} 
                    className='rounded-full object-cover w-full h-full'
                  />
                </div>

                <div>
                  <h1 className='font-semibold text-[14px]'>{user.name}</h1>
                  <p className='text-[12px] text-[var(--tag)]'>
                    {user.email}
                  </p>
                </div>

                </button>
              </div>
            ))
          }
        </div>

      </div>

     </div>

      {
          input && <EmailContact close={closeInput} openUsers={openUsers}/>
        }
    

    </div>
  )
}

export default AllUserContact