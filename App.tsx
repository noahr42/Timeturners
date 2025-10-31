import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { TimeEntry, UserProfile } from './types.ts';
import { useTimer } from './hooks/useTimer.ts';
import { formatTime } from './utils/formatTime.ts';
import Timer from './components/Timer.tsx';
import TimeLog from './components/TimeLog.tsx';
import LoginScreen from './components/LoginScreen.tsx';
import UserProfileDropdown from './components/UserProfileDropdown.tsx';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const { elapsedTime, isActive, startTime, startTimer, stopTimer, resetTimer } = useTimer();
  
  const userTimeEntriesKey = useMemo(() => (user ? `timeEntries_${user.id}` : null), [user]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('userProfile');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from local storage:", error);
    }
  }, []);

  useEffect(() => {
    if (userTimeEntriesKey) {
      try {
        const storedEntries = localStorage.getItem(userTimeEntriesKey);
        if (storedEntries) {
          setTimeEntries(JSON.parse(storedEntries));
        } else {
          setTimeEntries([]);
        }
      } catch (error) {
        console.error("Failed to load time entries from local storage:", error);
        setTimeEntries([]);
      }
    }
  }, [userTimeEntriesKey]);

  useEffect(() => {
    if (userTimeEntriesKey) {
      try {
        localStorage.setItem(userTimeEntriesKey, JSON.stringify(timeEntries));
      } catch (error) {
        console.error("Failed to save time entries to local storage:", error);
      }
    }
  }, [timeEntries, userTimeEntriesKey]);

  const handleLoginSuccess = useCallback((credentialResponse: any) => {
    try {
      const decoded: any = jwtDecode(credentialResponse.credential);
      const newUserProfile: UserProfile = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      };
      localStorage.setItem('userProfile', JSON.stringify(newUserProfile));
      setUser(newUserProfile);
    } catch (error) {
      console.error("Failed to decode token or set user:", error);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('userProfile');
    setUser(null);
    setTimeEntries([]);
    resetTimer();
  }, [resetTimer]);

  const handleStart = useCallback(() => startTimer(), [startTimer]);

  const handleStop = useCallback(() => {
    const duration = stopTimer();
    if (startTime && duration > 0) {
      const newEntry: TimeEntry = {
        id: startTime,
        startTime: startTime,
        endTime: Date.now(),
        duration: duration,
      };
      setTimeEntries(prevEntries => [newEntry, ...prevEntries]);
    }
  }, [stopTimer, startTime]);

  const handleReset = useCallback(() => resetTimer(), [resetTimer]);
  
  const handleDelete = useCallback((id: number) => {
    setTimeEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  }, []);

  const totalTime = useMemo(() => {
    return timeEntries.reduce((total, entry) => total + entry.duration, 0);
  }, [timeEntries]);

  if (!user) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen text-gray-100 flex flex-col items-center justify-start pt-8 sm:pt-12 px-4 sm:px-6 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="text-left">
            <h1 className="text-5xl sm:text-7xl font-quintessential text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]">
              Timeturners
            </h1>
             <p className="text-gray-400 mt-1 text-lg">Welcome, {user.name.split(' ')[0]}!</p>
          </div>
          <UserProfileDropdown user={user} onLogout={handleLogout} />
        </header>

        <main className="flex flex-col gap-8">
          <div className="bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-700">
            <Timer
              elapsedTime={elapsedTime}
              isActive={isActive}
              onStart={handleStart}
              onStop={handleStop}
              onReset={handleReset}
            />
            <div className="mt-6 border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-gray-300">Time turned</h3>
              <p className="text-3xl font-mono font-bold text-cyan-400 mt-2">
                {formatTime(totalTime)}
              </p>
            </div>
          </div>
          
          <TimeLog entries={timeEntries} onDelete={handleDelete} />
        </main>
      </div>
    </div>
  );
};

export default App;