import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx';

// IMPORTANT: Replace this with your actual Google Client ID
const GOOGLE_CLIENT_ID = "54499747961-nd1tufmg0j0kb91n174cfrh5q9b37mk2.apps.googleusercontent.com";

const AppContainer: React.FC = () => {
  if (GOOGLE_CLIENT_ID.startsWith('YOUR_GOOGLE_CLIENT_ID')) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-2xl p-8 text-center border border-gray-700">
          <h1 className="text-4xl font-bold text-cyan-400 mb-4">Configuration Required</h1>
          <p className="text-lg text-gray-300 mb-6">
            To enable Google Sign-In, you need to provide your Google Client ID.
          </p>
          <p className="text-gray-400 mb-2">1. Open the file <code className="bg-gray-700 text-amber-400 rounded px-2 py-1 text-sm">index.tsx</code> in your editor.</p>
          <p className="text-gray-400 mb-6">2. Replace the placeholder value in the <code className="bg-gray-700 text-amber-400 rounded px-2 py-1 text-sm">GOOGLE_CLIENT_ID</code> constant with your actual ID.</p>
          <a
            href="https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            How to get a Client ID
          </a>
        </div>
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);