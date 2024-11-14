'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { LiaTimesSolid } from 'react-icons/lia';

function NavbarMenu({ onClose }) {
  const pathname = usePathname();

  return (
    <div className='flex flex-col justify-start items-center w-full h-[100vh] absolute top-0 left-0 bg-[var(--button)] z-50 font-[family-name:var(--font-geist-mono)]'>

      <LiaTimesSolid
        className='text-[var(--foreground)] w-[30px] h-[30px] cursor-pointer self-end m-5'
        onClick={onClose}
      />


      <div className='flex flex-col gap-5 items-center justify-center h-[90vh]'>
        <Link href='#' onClick={onClose}>
          Contact
        </Link>

        {pathname === '/register' ? (
          <Link
            href='/login'
            className='bg-transparent py-3 px-8 border border-[var(--border)] text-[var(--foreground)] rounded-md'
            onClick={onClose}
          >
            Log in
          </Link>
        ) : pathname === '/login' ? (
          <Link
            href='/register'
            className='bg-transparent py-3 px-8 border border-[var(--border)] text-[var(--foreground)] rounded-md'
            onClick={onClose}
          >
            Register
          </Link>
        ) : (
          <Link
            href='/register'
            className='bg-transparent py-3 px-8 border border-[var(--border)] text-[var(--foreground)] rounded-md'
            onClick={onClose}
          >
            Register
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavbarMenu;
