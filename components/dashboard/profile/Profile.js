'use client';

import { useState } from "react";
import profileData from "./data";

function Profile({ close }) {
  // Use state to track the active setting
  const [isActive, setIsActive] = useState('Profile');

  const handleClick = (title) => {
    setIsActive(title); 
  };

  return (
    <div className="flex flex-col justify-center items-center absolute w-full h-[100vh] top-0 left-0">

      <div className="bg-transparent w-full h-[100vh] top-0 left-0 absolute" onClick={close}></div>

      {/* Settings Modal */}

      <div className="bg-[var(--background)] w-[800px] h-[600px] rounded-md absolute z-990 p-8 flex">

        <div className="flex flex-col gap-4">
          {profileData.map((item) => (
            <div
              key={item.id}
              className={`cursor-pointer rounded-md hover:bg-[var(--component)] py-3 px-3 ${
                isActive === item.title ? 'bg-[var(--component)] px-3 py-3 font-bold' : 'text-gray-700'
              }`}
              onClick={() => handleClick(item.title)} 
            >
              {item.title}
            </div>
          ))}
        </div>


        <div className="ml-8 flex-grow">
          {isActive === 'Profile' && <div>Profile page</div>}
          {isActive === 'Security' && <div>Security page</div>}
  
        </div>
      </div>
    </div>
  );
}

export default Profile;
