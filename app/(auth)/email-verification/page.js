'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function Page() {

  const [count, setCount] = useState(30);
  const [ isCounting, setIsCounting ] = useState(true);


  // Countdown effect
  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000); 

      return () => clearInterval(timer); 
    }
    else{
      setIsCounting(false);
    }
  }, [count, isCounting, setIsCounting]);

  return (
    <div className='flex flex-col justify-center items-center h-[90vh] w-full font-[family-name:var(--font-geist-mono)]'>
      <div className='mb-8'>
        <h1 className='lg:text-2xl text-xl text-center font-semibold'>Verify your email</h1>
        <p className='text-[var(--paragraph)] text-[14px]'>Kindly verify your email to reset your password</p>
      </div>

      <div className='flex flex-col gap-4'>
        <label htmlFor='name'>Enter code</label>
        <input
          type='text'
          id='code'
          name='code'
          placeholder='e.g 123456'
          className='bg-[var(--component)] py-3 px-4 rounded-md placeholder:text-[var(--input)] w-[400px]'
          required
          maxLength={6}
        />

        <Link href='/reset-password' className='bg-[var(--button)] py-4 rounded-md text-center mb-8'>
          Continue
        </Link>

        <p className='text-center text-[var(--paragraph)]'>
          Didn&apos;t receive a code?{' '}
          {
            isCounting ? (
              <strong className='text-[var(--button)] font-semibold'>
            Resend in 00:{count < 10 ? `0${count}` : count}
          </strong>
            )
            : 
            (
              <button className='text-[var(--button)] font-semibold'>
                Resend code
              </button>
            )
          }
        </p>
      </div>
    </div>
  );
}

export default Page;
