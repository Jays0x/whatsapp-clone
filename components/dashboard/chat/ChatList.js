'use client';
import React, { useEffect, useState } from 'react';
import { MdFilterList } from 'react-icons/md';
import { FiSearch, FiPlus } from 'react-icons/fi';
import userData from './data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AllUser from '../popup/AllUser';
import FilterChat from '../popup/FilterChat';

function ChatList() {
  const router = useRouter();
  const [formattedDates, setFormattedDates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(userData);
  const [allUser, setAllUser] = useState(false);
  const [filteredChat, setFilteredChat] = useState(false);
  const [filterType, setFilterType] = useState('All');

  const handleOpen = () => setAllUser(true);
  const handleClose = () => setAllUser(false);
  const handleFilter = () => setFilteredChat(true);
  const closeFilter = () => setFilteredChat(false);

  useEffect(() => {
    // Format the dates for each user
    const dates = userData.map((user) => {
      const latestChat = user.chat?.at(-1);
      return latestChat?.timestamp
        ? new Date(latestChat.timestamp).toLocaleString()
        : 'No timestamp';
    });
    setFormattedDates(dates);
  }, []);

  // Filter users based on the search term and selected chat type
  useEffect(() => {
    let filtered = userData;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((user) => {
        const nameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
        const messageMatch = user.chat?.at(-1)?.message.toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch || messageMatch;
      });
    }

    // Apply chat type filter
    if (filterType !== 'All') {
      filtered = filtered.filter((user) => user.type === filterType);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, filterType]);

  return (
    <div className='flex flex-col h-[100vh] font-[family-name:var(--font-geist-mono)] border-r border-[var(--border)] px-8 py-8'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-semibold'>Chats</h1>
        <div className='flex gap-1 justify-center items-center'>
          <div className='hover:bg-[var(--hover)] px-3 py-2 rounded-md cursor-pointer'>
            <FiPlus className='w-[20px] h-[20px]' onClick={handleOpen} />
          </div>
          {allUser && <AllUser close={handleClose} />}
          <div className='hover:bg-[var(--hover)] px-3 py-2 rounded-md cursor-pointer'>
            <MdFilterList className='w-[20px] h-[20px]' onClick={handleFilter} />
          </div>
          {filteredChat && <FilterChat close={closeFilter} setFilterType={setFilterType} />}
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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Chat List */}
      <div className='flex flex-col gap-8'>
        {filteredUsers.map((user, index) => {
          const latestChat = user.chat?.at(-1);
          const truncatedMessage = latestChat?.message?.slice(0, 20) + '...';

          return (
            <div key={user.id}>
              <Link href={`/home/${user.id}`} className='flex items-center gap-4'>
                {/* User Avatar */}
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
