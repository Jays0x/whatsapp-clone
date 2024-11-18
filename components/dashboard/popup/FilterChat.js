'use client';
import React, { useEffect, useRef } from 'react';
import userData from '../chat/data';

function FilterChat({ close, setFilterType }) {
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

  // Get unique types from userData
  const chatTypes = ['All', ...new Set(userData.map((user) => user.type))];

  return (
    <div
      ref={filterRef}
      className='absolute mt-[300px] mr-[90px] bg-[var(--background)] p-8 rounded-md shadow-lg'
    >
      <p className='text-sm text-[var(--tag)] mb-3'>Filter chat by</p>
      <div>
        {chatTypes.map((type, index) => (
          <div key={index} className='flex flex-col mb-2'>
            <h1
              className='cursor-pointer hover:text-[var(--primary)]'
              onClick={() => {
                setFilterType(type)
                close(); // Call the close function when clicking a type
                }
                
              }
            >
              {type}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterChat;
