'use client'
import React, { useState } from 'react';
import userData from '../data';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

function UserProfile({ close }) {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('Info');
  const userModal = [
    { id: 1, title: 'Info' },
    { id: 2, title: 'Media' },
    { id: 3, title: 'Link' },
    { id: 4, title: 'File' },
  ];

  // Get the current pathname
  const pathname = usePathname();
  const id = pathname.split('/').pop();

  // Get the user ID 
  const user = userData.find((user) => user.id === parseInt(id));



  if (!user) return <div>No user found</div>;

  return (
    <div className='flex flex-col justify-center items-center absolute w-full top-0 left-0'>
      {/* Overlay to close the modal */}
      <div
        className='bg-transparent w-full h-[100vh] top-0 left-0 relative cursor-pointer'
        onClick={close}
      ></div>

      {/* Modal Content */}
      <div className='bg-[var(--background)] w-[700px] h-[600px] rounded-md absolute z-990 p-8 flex gap-8'>
        {/* Tabs */}
        <div>
          {userModal.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col text-center rounded-md mb-8 cursor-pointer ${
                activeTab === item.title ? 'bg-[var(--component)] px-8 py-2' : 'text-[var(--paragraph)]'
              }`}
              onClick={() => setActiveTab(item.title)}
            >
              <h1>{item.title}</h1>
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <div className='mt-8 w-full'>
          {activeTab === 'Info' && (
            <div className=''>
              <div className='flex flex-col justify-center items-center w-full gap-5'>
                    <div className='w-[80px] h-[80px]' >
                    <Image
                    src={user.avatar}
                    alt={user.name}
                    width={30}
                    height={30}
                    className='rounded-full w-full h-full object-cover'
                    />
                    </div>
                    <div className='text-center flex flex-col mb-4'>
                        <h1 className='text-lg text-[var(--foreground)]'>{user.name}</h1>
                        <p className='text-sm text-[var(--paragraph)]'>{user.email}</p>
                    </div>
                    <Link href='#' className='bg-[var(--button)] text-white py-3 px-[115px] rounded-md mb-4'>Send email</Link>

                    <div className='mb-4'>   
                        <h1 className='text-sm text-[var(--tag)] mb-3'>About {user.name}</h1>
                        <p>Just a little description about {user.name}</p>
                    </div>

                    <div className='flex justify-center items-center gap-3 w-full px-8 mt-8'>
                        <button className='bg-[var(--component)] py-3 w-full rounded-md text-[var(--paragraph)]'>Block account</button>
                        <button className='bg-[var(--component)] py-3 w-full rounded-md text-red-500'>Report account</button>
                    </div>

              </div>
            </div>
          )}

          {activeTab === 'Media' && 
          <div>
                <div className='w-[120px] h-[100px]' >
                <Image
                src={user.avatar}
                alt={user.name}
                width={30}
                height={30}
                className='rounded-md w-full h-full object-cover'
                />
                </div>
          </div>
          }

          {activeTab === 'Link' && 
          <div className='flex flex-col justify-center items-center w-full gap-5 h-full'>Coming soon</div>
          }

          {activeTab === 'File' && 
          <div className='flex flex-col justify-center items-center w-full gap-5 h-full'>Coming soon</div>
          }
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
