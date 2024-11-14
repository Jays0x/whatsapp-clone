'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { CgMenuRight } from 'react-icons/cg';
import NavbarMenu from './NavbarMenu';

function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='flex justify-between w-full px-6 lg:max-w-screen-xl py-5 items-center font-[family-name:var(--font-geist-mono)]'>

      <div>
        <Link href='/'>
          <Image src='/logo.svg' alt='logo' width={180} height={50} />
        </Link>
      </div>


      <CgMenuRight
        className='text-[var(--foreground)] w-[30px] h-[30px] lg:hidden cursor-pointer'
        onClick={handleMenuToggle}
      />


      {menuOpen && <NavbarMenu onClose={handleMenuToggle} />}


      <div className='lg:flex hidden gap-5 justify-center items-center text-[var(--paragraph)]'>
        <Link href='#'>Contact</Link>

        {pathname === '/register' ? (
          <Link
            href='/login'
            className='bg-transparent py-3 px-8 border border-[var(--border)] text-[var(--foreground)] rounded-md'
          >
            Log in
          </Link>
        ) : pathname === '/login' ? (
          <Link
            href='/register'
            className='bg-transparent py-3 px-8 border border-[var(--border)] text-[var(--foreground)] rounded-md'
          >
            Register
          </Link>
        ) : (
          <Link
            href='/register'
            className='bg-transparent py-3 px-8 border border-[var(--border)] text-[var(--foreground)] rounded-md'
          >
            Register
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
