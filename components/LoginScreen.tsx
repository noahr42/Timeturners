import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

interface LoginScreenProps {
  onLoginSuccess: (credentialResponse: any) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-700 text-center">
        <h1 className="text-6xl sm:text-8xl font-quintessential text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.4)] mb-4">
          Timeturners
        </h1>
        <p className="text-xl text-gray-300 mb-8 font-sans">
          Track your time with magical precision.
        </p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={onLoginSuccess}
            onError={() => {
              console.error('Login Failed');
              alert('Google Sign-In failed. Please try again.');
            }}
            theme="filled_black"
            size="large"
            shape="pill"
          />
        </div>
         <p className="text-xs text-gray-500 mt-8">
            Sign in to securely store and manage your time entries.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;