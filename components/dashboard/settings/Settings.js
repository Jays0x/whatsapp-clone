'use client';

import { useState } from "react";
import settingsData from "./data";

function Settings({ close }) {
  // Use state to track the active setting
  const [isActive, setIsActive] = useState('Account');

  const handleClick = (title) => {
    setIsActive(title); 
  };

  return (
    <div className="flex flex-col justify-center items-center absolute w-full h-[100vh] top-0 left-0">

      <div className="bg-transparent w-full h-[100vh] top-0 left-0 absolute" onClick={close}></div>

      {/* Settings Modal */}

      <div className="bg-[var(--background)] w-[800px] h-[600px] rounded-md absolute z-990 p-8 flex">

        <div className="flex flex-col gap-4">
          {settingsData.map((item) => (
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
          {isActive === 'Account' && <div>Account page</div>}
          {isActive === 'Chats' && <div>Chats page</div>}
          {isActive === 'Video & Voice' && <div>Video & Voice page</div>}
          {isActive === 'Notification' && <div>Notification page</div>}
          {isActive === 'Personalization' && <div>Personalization page</div>}
          {isActive === 'Shortcut' && <div>Shortcut page</div>}
          {isActive === 'Help' && <div>Help page</div>}
        </div>
      </div>
    </div>
  );
}

export default Settings;
