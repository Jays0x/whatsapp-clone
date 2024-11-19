'use client';
import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import contactData from './data';
import Link from 'next/link';
import Image from 'next/image';
import AllContacts from './popup/AllUserContact';

function ContactList() {
  const [allContact, setAllContact] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Mark the component as hydrated
    setHydrated(true);
  }, []);

  const handleAllContact = () => {
    setAllContact(true);
  };

  const CloseAllContact = () => {
    setAllContact(false);
  };

  return (
    <div className='flex flex-col h-[100vh] font-[family-name:var(--font-geist-mono)] border-r border-[var(--border)] px-8 py-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-semibold'>Contact</h1>
        <div className='hover:bg-[var(--hover)] px-4 py-3 rounded-md cursor-pointer' onClick={handleAllContact}>
          <FaPlus />
        </div>
        {allContact && <AllContacts close={CloseAllContact} />}
      </div>

      {/* Contact List */}
      <div>
        {contactData.map((contact) => {
          // Get the last email content
          const lastMessage = contact.content.at(-1);

          // Render the timestamp only if the component is hydrated
          const timestamp = hydrated
            ? new Date(lastMessage.timestamp).toLocaleString()
            : 'Loading...';

          return (
            <div key={contact.id} className='mb-6'>
              <Link href={`/contact/${contact.id}`} className='flex items-start gap-4'>
                {/* Avatar */}
                <div className='w-[70px] h-[50px]'>
                  <Image
                    src={contact.avatar}
                    alt={contact.name}
                    width={150}
                    height={150}
                    className='rounded-full w-full h-full object-cover'
                  />
                </div>

                <div>
                  {/* Display last email content */}
                  <h1 className='text-sm font-semibold mb-2'>{lastMessage.subject}</h1>
                  <p className='text-sm text-[var(--paragraph)] line-clamp-2 mb-2'>{lastMessage.message}</p>
                  <p className='text-xs text-[var(--tag)]'>{timestamp}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContactList;
