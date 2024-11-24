'use client'
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import statusData from '@/components/dashboard/status/data'; // Adjust this path to match your project structure
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiSend } from 'react-icons/fi';

function AllStatus() {
  const [currentProgress, setCurrentProgress] = useState(0);
  const swiperRef = useRef(null);
  const router = useRouter(); // Initialize the router

  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const status = statusData.find((status) => status.id === parseInt(id));

  if (!status) return <div>No status found</div>;

  // Handle progress bar click to navigate to a specific slide
  const handleProgressBarClick = (slideIndex) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(slideIndex);
    }
  };

  const onAutoplayTimeLeft = (s, time, progress) => {
    const percentage = 100 * (1 - progress);
    setCurrentProgress(percentage); // Update progress bar width
  };

  const handleSlideChange = (swiper) => {
    // Check if the last slide is reached
    if (swiper.activeIndex === status.content.length - 1) {
      // Navigate to /status after the last slide autoplay finishes
      setTimeout(() => {
        router.push('/status');
      }, swiper.params.autoplay.delay); // Use Swiper autoplay delay
    }
  };

  return (
    <div className='flex justify-center items-center w-full h-screen font-mono absolute top-0 left-0 bg-[var(--paragraph)]'>
      <div className='relative z-10 w-full h-full p-5'>
        <div className='flex justify-between mb-5'>
          <Link href='/status' className='bg-[var(--component)] p-4 rounded-md cursor-pointer'>
            <FaArrowLeftLong />
          </Link>
          <div className='hover:bg-[var(--component)] p-4 rounded-md cursor-pointer'>
            <HiOutlineDotsHorizontal />
          </div>
        </div>

       <div className='flex flex-col justify-center items-center h-[90vh]'>
       <Swiper
          className="w-[500px] h-[950px] flex flex-col justify-center items-center rounded-xl"
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          loop={false} // Prevent looping to other users' content
          modules={[Autoplay]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          onSlideChange={handleSlideChange} // Detect slide change
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance
          
        >
          {status.content.map((item, index) => (
            <SwiperSlide
              key={`${status.id}-${item.id}`}
              className='flex h-full justify-center items-center relative rounded-md'
            >
              {/* Clickable Progress Bar */}
              <div className='absolute top-0 left-0 w-full flex gap-1 p-2'>
                {status.content.map((_, idx) => (
                  <div
                    key={idx}
                    className="w-full h-1 bg-gray-700 rounded-full overflow-hidden cursor-pointer"
                    onClick={() => handleProgressBarClick(idx)} // Navigate on click
                  >
                    <div
                      className={`h-full ${index === idx ? 'bg-white' : 'bg-gray-400'}`}
                      style={{ width: index === idx ? `${currentProgress}%` : '100%' }}
                    />
                  </div>
                ))}
              </div>

              {/* Status Content */}
              <div className='text-white flex flex-col items-center justify-between'>
                <div className='w-full h-[750px] mb-4'>
                  {item.status_image.length > 0 && (
                    <Image
                      src={item.status_image[0]}
                      alt={item.message}
                      width={150}
                      height={780}
                      className='w-full h-full object-cover'
                    />
                  )}
                </div>
                <div className='absolute bottom-0 mb-[200px] bg-black/30 w-full flex justify-center items-center p-3'><p className='text-lg z-999 text-white text-center'>{item.message}</p></div>

                <div className='bg-[var(--component)] px-4 py-4 w-full flex gap-3 rounded-md'>
                  <input type="text" placeholder='Reply to this status' className='placeholder:text-[var(--input)] bg-transparent h-full w-full border-none outline-none text-[var(--foreground)] text-md'/>
                  <FiSend className='text-[var(--foreground)] hover:text-[var(--paragraph)] cursor-pointer' onClick={() => { router.push(`/home/${status.id}`)}}/>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
       </div>
      </div>
    </div>
  );
}

export default AllStatus;
