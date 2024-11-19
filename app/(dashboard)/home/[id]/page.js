'use client';
import { usePathname } from 'next/navigation';
import userData from '@/components/dashboard/chat/data';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { FiSend, FiPaperclip, FiSearch } from 'react-icons/fi';
import UserProfile from '@/components/dashboard/chat/popup/UserProfile';
import UserMenuDrop from '@/components/dashboard/chat/popup/UserMenuDrop';

function UserPage() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();

  const [formattedDate, setFormattedDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState([]);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleProfile = () =>{
    setShowProfile(true);
  }

  const closeProfile = () =>{
    setShowProfile(false);
  }

  const handleUserMenu = () =>{
    setShowUserMenu(true);
  }

  const closeUserMenu = () =>{
    setShowUserMenu(false);
  }


  const editorRef = useRef(null);
  const user = userData.find((user) => user.id === parseInt(id));
  const latestChat = user?.chat?.at(-1);

  useEffect(() => {
    if (latestChat?.timestamp) {
      const formatted = new Date(latestChat.timestamp).toLocaleString();
      setFormattedDate(formatted);
    } else {
      setFormattedDate('No timestamp');
    }

    if (user?.chat) {
      setMessages(user.chat);
    }
  }, [user, latestChat]);

  if (!user) {
    return <div>User not found</div>;
  }

  // Handle sending a message
  const handleSendMessage = () => {
    const messageInput = editorRef.current?.textContent.trim();

    // Only send the message if it's not empty or just the placeholder text
    if (messageInput === '' || messageInput === 'Type a message...') {
      return; // Don't send the message if it's empty or only the placeholder
    }

    const newMessage = {
      id: Date.now(),
      message: messageInput,
      sender: 'me',
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Clear the contenteditable div
    if (editorRef.current) {
      editorRef.current.textContent = '';
      setIsPlaceholderVisible(true);
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }

    if (e.key === 'b' && e.ctrlKey) {
      e.preventDefault();
      document.execCommand('bold');
    }

    if (e.key === 'i' && e.ctrlKey) {
      e.preventDefault();
      document.execCommand('italic');
    }
  };

  const handleFocus = () => {
    if (isPlaceholderVisible) setIsPlaceholderVisible(false);
  };

  const handleBlur = () => {
    if (editorRef.current?.textContent.trim() === '') {
      setIsPlaceholderVisible(true);
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      typeof msg.message === 'string' &&
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex flex-col h-[100vh] font-[family-name:var(--font-geist-mono)]'>
      <div className='border-b border-[var(--border)] h-[65px] px-10 flex justify-between items-center'>
        <div className='flex gap-3 items-center cursor-pointer' onClick={handleProfile}>
          <div className='w-[40px] h-[40px]' >
            <Image
              src={user.avatar}
              alt={user.name}
              width={30}
              height={30}
              className='rounded-full w-full h-full object-cover'
            />
          </div>
          <div>
            <h1 className='font-semibold text-[14px]'>{user.name}</h1>
            <p className='text-[12px] text-[var(--tag)]'>
              {formattedDate || 'No timestamp'}
            </p>
          </div>
        </div>
          {
            showProfile && <UserProfile close={closeProfile} />
          }
        <div className='hover:bg-[var(--hover)] px-3 py-2 rounded-md cursor-pointer' onClick={handleUserMenu}>
          <HiOutlineDotsVertical className='w-[20px] h-[20px]' />
        </div>
        {
          showUserMenu && <UserMenuDrop close={closeUserMenu}/>
        }
      </div>

      <div className='border-b border-[var(--border)] px-5 py-3'>
        <div className='flex items-center bg-[var(--input-bg)] px-4 py-2 rounded-full'>
          <FiSearch className='text-[var(--tag)]' />
          <input
            type='text'
            placeholder='Search messages'
            className='flex-1 ml-3 bg-transparent outline-none placeholder:text-[var(--input)]'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className='flex-1 overflow-y-auto lg:px-[150px] py-8 space-y-4 px-8'>
        {filteredMessages.map((chat) => (
          <div key={chat.id} className={`flex ${chat.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`${
                chat.sender === 'me' ? 'bg-[var(--button)] text-[14px] text-white' : 'bg-[var(--hover)] text-[14px]'
              } rounded-lg px-4 py-4 max-w-[50%]`}
              dangerouslySetInnerHTML={{ __html: chat.message }}
            />
          </div>
        ))}
      </div>

      <div className='border-t border-[var(--border)] px-8 py-5'>
        <div className='flex items-center'>
          <button className='text-[var(--tag)]'>
            <FiPaperclip className='w-[20px] h-[20px]' />
          </button>
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning={true}
            className='flex-1 mx-3 bg-transparent text-[14px] outline-none resize-none rounded-lg p-3'
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {isPlaceholderVisible && (
              <span className='text-[var(--input)] pointer-events-none'>Type a message...</span>
            )}
          </div>
          <button className='text-[var(--foreground)] hover:text-[var(--paragraph)]' onClick={handleSendMessage}>
            <FiSend className='w-[20px] h-[20px]' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
