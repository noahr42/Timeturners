import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types.ts';
import LogoutIcon from './icons/LogoutIcon.tsx';

interface UserProfileDropdownProps {
  user: UserProfile;
  onLogout: () => void;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <img
          src={user.picture}
          alt="User avatar"
          className="h-14 w-14 rounded-full border-2 border-cyan-500/50 hover:border-cyan-400 transition-all duration-300"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700 z-10">
          <div className="p-4 border-b border-gray-700 flex items-center gap-4">
            <img src={user.picture} alt="User avatar" className="h-12 w-12 rounded-full" />
            <div>
              <p className="font-semibold text-white truncate">{user.name}</p>
              <p className="text-sm text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 text-left px-4 py-3 text-gray-300 hover:bg-cyan-500/20 hover:text-white transition-colors duration-200"
          >
            <LogoutIcon />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;