'use client'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Sidebar({ first, second }) {
  const pathname = usePathname();


  const isActive = (link) => {
    if (!link) return false;

    return pathname.startsWith(link) || pathname === link;
  };

  return (
    <div className='flex flex-col justify-between items-center font-[family-name:var(--font-geist-mono)] h-[100vh] py-8'>
      <div className='mb-4 flex flex-col gap-7 justify-center items-center'>
        <div className='mb-8'>
          <Image src='/icon.svg' alt='Logo' width={40} height={40} className='mb-10' />
          <hr className='border-[var(--input)]'/>
        </div>
        {first.map((item, i) => (
          <div
            key={i}
            className={`${
              isActive(item.link) ? 'bg-[var(--component)]' : 'bg-transparent'
            } flex items-center justify-center hover:bg-[var(--component)] rounded-md`}
          >
            <Link href={item.link}>
              {item.icon && (
                <div className='flex justify-center items-center py-3 px-3'>
                  {item.icon}
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>

      <div className='mb-4 flex flex-col gap-7'>
        {second.map((item, i) => (
          <div
            key={i}
            className={`${
              isActive(item.link) ? 'bg-[var(--component)]' : 'bg-transparent'
            } flex items-center justify-center hover:bg-[var(--component)] rounded-md`}
          >
            <Link href={item.link}>
              {item.icon && (
                <div className='flex justify-center items-center py-3 px-3'>
                  {item.icon}
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
