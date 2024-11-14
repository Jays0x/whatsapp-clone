'use client'
import React, { useEffect, useState } from 'react';
import { MdFilterList } from 'react-icons/md';
import { FiSearch, FiPlus } from 'react-icons/fi';
import userData from './data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function ChatList() {
  const router = useRouter();

  const truncateMessage = (message, maxLength) => {
    return message?.length > maxLength ? `${message.slice(0, maxLength)}...` : message;
  };

  const [formattedDates, setFormattedDates] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to track the search term
  const [filteredUsers, setFilteredUsers] = useState(userData); // State to store the filtered users

  useEffect(() => {
    // Format the dates on the client-side to prevent hydration errors
    const dates = userData.map(user => {
      const latestChat = user.chat?.at(-1);
      return latestChat?.timestamp
        ? new Date(latestChat.timestamp).toLocaleString()
        : 'No timestamp';
    });
    setFormattedDates(dates);
  }, []);

  useEffect(() => {
    // Filter users based on the search term
    if (searchTerm === '') {
      setFilteredUsers(userData); // Show all users when the search is cleared
    } else {
      const filtered = userData.filter(user => {
        const nameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
        const messageMatch = user.chat?.at(-1)?.message.toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch || messageMatch; // Filter by user name or message content
      });
      setFilteredUsers(filtered); // Update the filtered users list
    }
  }, [searchTerm]); // Run the filter effect whenever the search term changes

  // Listen for the Escape key press to navigate to the home page
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        router.push('/home'); // Adjust this path based on your home route
      }
    };

    window.addEventListener('keydown', handleEscape);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [router]);

  return (
    <div className='flex flex-col h-[100vh] font-[family-name:var(--font-geist-mono)] border-r border-[var(--border)] px-8 py-8'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-semibold'>Chats</h1>
        <div className='flex gap-1 justify-center items-center'>
          <div className='hover:bg-[var(--hover)] px-3 py-2 rounded-md cursor-pointer'>
            <FiPlus className='w-[20px] h-[20px]' />
          </div>
          <div className='hover:bg-[var(--hover)] px-3 py-2 rounded-md cursor-pointer'>
            <MdFilterList className='w-[20px] h-[20px]' />
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className='w-full bg-[var(--hover)] rounded-md py-3 px-4 flex gap-2 items-center mb-10'>
        <FiSearch className='text-[var(--input)]' />
        <input
          type='search'
          placeholder='Search...'
          className='w-full h-full bg-transparent outline-none border-none placeholder:text-[var(--input)]'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        />
      </div>

      {/* Chat List */}
      <div className='flex flex-col gap-8'>
        {filteredUsers?.map((user, index) => {
          const latestChat = user.chat?.at(-1);
          const truncatedMessage = truncateMessage(latestChat?.message, 20);

          return (
            <div key={user.id} className=''>
              {/* User Avatar */}
              <Link href={`/home/${user.id}`} className='flex items-center gap-4'>

              <div className='w-[50px] h-[50px]'>
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={50}
                  height={50}
                  className='rounded-full w-full h-full object-cover'
                />
              </div>

              {/* User Chat Info */}
              
              <div className='flex-1'>
                <h2 className='text-sm font-semibold'>{user.name}</h2>
                <p className='text-xs text-[var(--tag)]'>
                  {formattedDates[index] || 'No timestamp'}
                </p>
                <p className='text-sm text-[var(--paragraph)] truncate'>
                  {truncatedMessage || 'No message'}
                </p>
              </div>

              </Link>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatList;
