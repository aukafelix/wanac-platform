"use client"; // Enable client-side rendering for this file

import './globals.css';
import './fonts.css'; // Add this line to import the fonts
import React from 'react';
import { Toaster } from 'react-hot-toast';
import ClientLayoutWrapper from './ClientLayoutWrapper';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-[#002147] text-gray-800">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Toaster position="top-center" toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: 'green',
            },
          },
          error: {
            style: {
              background: 'red',
            },
          },
        }} />
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
