'use client';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import userData from '../../chat/data';
import Image from 'next/image';
import EmailContact from './EmailContact';

function AllContacts({ close }) {
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user

  // Filter users based on the search term
  const filteredUsers = userData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex flex-col justify-center items-center absolute w-full top-0 left-0'>
      {/* Background overlay */}
      <div
        className='bg-transparent w-full h-[100vh] top-0 left-0 relative'
        onClick={close}
      ></div>

      {/* Popup container */}
      <div className='bg-[var(--background)] w-[600px] h-[600px] rounded-md absolute z-990 p-8'>
        {/* Conditionally render EmailContact or user list */}
        {selectedUser ? (
          <EmailContact close={() => setSelectedUser(null)} user={selectedUser} />
        ) : (
          <>
            {/* Header */}
            <div className='flex justify-between'>
              <h1 className='text-2xl'>Choose user</h1>
              <div
                className='bg-[var(--component)] w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
                onClick={close}
              >
                <AiOutlineClose />
              </div>
            </div>

            {/* Search */}
            <div className='w-full bg-[var(--hover)] rounded-md py-3 px-4 flex gap-2 items-center my-5'>
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
            <div className='overflow-y-auto max-h-[400px]'>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className='flex gap-4 my-8 cursor-pointer'
                    onClick={() => setSelectedUser(user)} // Set selected user
                  >
                    <div className='w-[40px] h-[40px] rounded-full'>
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={40}
                        height={40}
                        className='rounded-full w-full h-full object-cover'
                      />
                    </div>
                    <div>
                      <h2 className='text-md font-semibold'>{user.name}</h2>
                      <p className='text-sm text-[var(--tag)]'>{user.email}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-center text-[var(--tag)]'>No users found</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AllContacts;
