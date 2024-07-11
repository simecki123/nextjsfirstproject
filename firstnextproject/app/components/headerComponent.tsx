"use client";
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ToolbarComponent() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [user, setUser] = useState({ firstName: '', lastName: '' });
  const menuRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Stored User: ', storedUser);
    setUser({
      firstName: storedUser.firstName || '',
      lastName: storedUser.lastName || ''
    });
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node) && !(event.target as HTMLElement).closest('button')) {
      setIsMenuOpen(false);
    }
    if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
      setIsSettingsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="w-full bg-gray-800 text-white shadow-lg">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative group">
            <div className="relative flex flex-col overflow-hidden items-center justify-center rounded-full w-[40px] h-[40px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-4 focus:ring-2 ring-opacity-30 duration-200 shadow-md">
              <div className={`transform transition-all duration-150 overflow-hidden ${isMenuOpen ? 'translate-y-3' : '-translate-y-5'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className={`flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden ${isMenuOpen ? 'translate-y-3' : '-translate-y-3'}`}>
                <div className={`bg-white mb-1.5 h-[2px] w-7 transform transition-all duration-300 origin-left ${isMenuOpen ? 'translate-y-6' : ''}`}></div>
                <div className={`bg-white mb-1.5 h-[2px] w-7 rounded transform transition-all duration-300 ${isMenuOpen ? 'translate-y-6 delay-75' : 'delay-75'}`}></div>
                <div className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${isMenuOpen ? 'translate-y-6 delay-100' : 'delay-100'}`}></div>
              </div>
            </div>
          </button>
          {isMenuOpen && (
            <div ref={menuRef} className="absolute top-16 left-4 bg-white text-gray-800 rounded shadow-lg py-2 w-40 pointer-events-auto">
              <p onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">Log out</p>
              <Link href="/mainpage">
                <p className="block px-4 py-2 hover:bg-gray-200">Home</p>
              </Link>
              <Link href="/mainpage/leaderboard">
                <p className="block px-4 py-2 hover:bg-gray-200">Leaderboard</p>
              </Link>
            </div>
          )}
          <img src="/profile_picture.png" alt="User Avatar" className="rounded-full w-10 h-10" />
          <h1 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <img src="/profile_picture.png" alt="User Avatar" className="rounded-full w-10 h-10" />
        </div>
      </div>
      <hr className="border-gray-700" />
    </div>
  );
}
