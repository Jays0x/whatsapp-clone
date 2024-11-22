import React, { useRef, useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import statusData from '../data'; // Adjust this path to match your project structure
import Image from 'next/image';

function AllStatus({ close }) {
  const progressBar = useRef([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeUserIndex, setActiveUserIndex] = useState(0); // Track active user index

  const onAutoplayTimeLeft = (s, time, progress) => {
    const percentage = 100 * (1 - progress);
    setCurrentProgress(percentage); // Update progress bar width
  };

  const swiperRef = useRef(null);

  // Handle progress bar click to navigate to a specific slide
  const handleProgressBarClick = (slideIndex) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(slideIndex);
    }
  };

  return (
    <div className='flex justify-center items-center w-full h-screen font-mono absolute top-0 left-0 bg-[var(--background)]'>
      <div className='relative z-10 w-full h-full p-5'>
        <div className='flex justify-between mb-5'>
          <div className='hover:bg-[var(--component)] p-4 rounded-md cursor-pointer' onClick={close}>
            <FaArrowLeftLong />
          </div>
          <div className='hover:bg-[var(--component)] p-4 rounded-md cursor-pointer'>
            <HiOutlineDotsHorizontal />
          </div>
        </div>

        <Swiper
          className="w-[500px] h-[600px]"
          autoplay={{ 
            delay: 10000, 
            disableOnInteraction: false 
          }}
          loop={false} // Prevent looping to other users' content
          modules={[Autoplay]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance
          onSlideChange={(swiper) => {
            // Restrict navigation within the current user's content
            const currentUserContentLength = statusData[activeUserIndex].content.length;
            if (swiper.activeIndex >= currentUserContentLength) {
              swiperRef.current.slideTo(currentUserContentLength - 1); // Stop at the last slide of current user
            }
          }}
        >
          {statusData[activeUserIndex].content.map((item, index) => (
            <SwiperSlide key={`${statusData[activeUserIndex].id}-${item.id}`} className='bg-[var(--component)] flex justify-center items-center relative'>
              {/* Clickable Progress Bar */}
              <div className='absolute top-0 left-0 w-full flex gap-1 p-2'>
                {statusData[activeUserIndex].content.map((_, idx) => (
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
                <div className='w-full h-[550px]'>
                    {item.status_image.length > 0 && (
                    <Image 
                        src={item.status_image[0]} 
                        alt={item.message} 
                        width={150}
                        height={850}
                        className='w-full h-full object-cover'
                    />
                    )}
                </div>
                <div><p className='text-lg mb-4 z-999'>{item.message}</p> </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default AllStatus;
