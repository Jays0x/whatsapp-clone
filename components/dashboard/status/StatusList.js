'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { FiPlus } from 'react-icons/fi'
import statusData from './data'
import Link from 'next/link'
import AllStatus from './popup/AllStatus'

function StatusList() {

    const [openStatus, setOpenStatus] = useState(false);
    const [today, setToday] = useState('');

    const handleStatusOpen = () => {
        setOpenStatus(true)
    }

    const closeStatus = () => {
        setOpenStatus(false)
    }

    useEffect(() => {
        const todayDate = Date.now();
        setToday(todayDate);
    },[])

  return (
    <div className='flex flex-col justify-between w-full px-6 lg:max-w-screen-xl py-5 items-center font-[family-name:var(--font-geist-mono)]'>
        {/* Header */}
      <div className='flex justify-between items-center mb-8 w-full'>
        <h1 className='text-2xl font-semibold'>Status</h1>
        <div className='hover:bg-[var(--hover)] px-3 py-2 rounded-md cursor-pointer'>
            <FiPlus className='w-[20px] h-[20px]'/>
        </div>
       
      </div>

      <div className='w-full flex gap-5 mb-8'>
        <div className='w-[50px] h-[50px] rounded-full'>
            <Image src='/status4.jpeg' alt='status' width={50} height={50} className='w-full h-full rounded-full'/>
        </div>

        <div>
            <h1>You</h1>
            <p className='text-sm text-[var(--paragraph)]'>{today}</p>
        </div>
      </div>


      {/* Status list */}
       
       <div className='w-full'>
       <p className='text-[var(--tag)] mb-5'>Other status</p>
        {
            statusData.map((status) => {

                const lastStatus = status.content.at(-1);
                const lastImage = lastStatus.status_image.at(-1);
                
                return (
                    <Link href={`/status/${status.id}`} key={status.id} className='flex gap-5 mb-8'>
                       
                        <div className='w-[50px] h-[50px] rounded-full'>
                            <Image src={lastImage} alt='status' width={50} height={50} className='w-full h-full rounded-full'/>
                        </div>

                        <div>
                            <h1>{status?.name}</h1>
                            <p className='text-sm text-[var(--paragraph)]'>{lastStatus.timestamp}</p>
                        </div>

                    </Link>
                    
                )
            })
        }
        {/* {
            openStatus && <AllStatus close={closeStatus} />
        } */}
       </div>

    </div>
  )
}

export default StatusList