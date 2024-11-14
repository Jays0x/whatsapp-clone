// pages/home/[id].js
'use client'
import { usePathname } from 'next/navigation';
import userData from '@/components/dashboard/chat/data';
import Image from 'next/image';
import { useState, useEffect } from 'react';

function UserPage() {
  const pathname = usePathname(); // Get the current pathname
  const id = pathname.split('/').pop();

    // State to handle the formatted date
  const [formattedDate, setFormattedDate] = useState('');

  console.log({ id: id });

  const user = userData.find((user) => user.id === parseInt(id));
  console.log(user);

    // Use useEffect to format the date on the client side to avoid hydration errors
    useEffect(() => {
      if (latestChat?.timestamp) {
        const formatted = new Date(latestChat.timestamp).toLocaleString();
        setFormattedDate(formatted);
      } else {
        setFormattedDate('No timestamp');
      }
    }, []);

  if (!user) {
    return <div>User not found</div>; // Return an error message if user not found
  }

  // Extract the latest chat
  const latestChat = user.chat?.at(-1);


 



  return (
    <div className='flex flex-col h-[100vh] font-[family-name:var(--font-geist-mono)]'>
      {/* Header Section */}
      <div className='border-b border-[var(--border)] h-[65px] px-10 flex justify-between items-center'>
        <div className='flex gap-3 justify-center items-center'>
          {/* User Avatar */}
          <div className='w-[40px] h-[40px]'>
            <Image
              src={user.avatar}
              alt={user.name}
              width={30}
              height={30}
              className='rounded-full w-full h-full object-cover'
            />
          </div>

          {/* User Info */}
          <div>
            <h1 className='font-semibold'>{user.name}</h1>
            <p className='text-[12px] text-[var(--tag)]'>
              {formattedDate || 'No timestamp'}
            </p>
          </div>
        </div>
      </div>

      <div></div>
      <div></div>
    </div>
  );
}

export default UserPage;
