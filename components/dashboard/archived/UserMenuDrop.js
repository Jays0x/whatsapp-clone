'use client';
import Link from 'next/link';
import React, { useRef, useEffect } from 'react';

function UserMenuDrop({ close }) {

  const filterRef = useRef(null);

  // Function to handle clicks outside of the component
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        close(); // Call the close function when clicking outside
      }
    }

    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [close]);

  return (
    <div
      ref={filterRef} // Attach the ref here
      className='absolute right-0 mr-[40px] mt-[220px] bg-[var(--background)] p-8 rounded-md shadow-lg flex flex-col justify-between'
    >
      <Link href='/starred' className='cursor-pointer mb-2'>Close chat</Link>
      <button className='cursor-pointer mb-2 text-left'>Select</button>
      <button className='cursor-pointer mb-2 text-left'>Unarchived</button>
      <button className='cursor-pointer text-left'>Block account</button>
    </div>
  );
}

export default UserMenuDrop;
