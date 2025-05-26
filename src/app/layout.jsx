"use client"; // Enable client-side rendering for this file

import './globals.css';
import './fonts.css'; // Add this line to import the fonts
import React from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname for route detection
import { Toaster } from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current route
  const excludedPaths = [
    '/login',
    '/signup',
    '/pages/(dashboard)',
    '/pages/(dashboard)/client',
    '/pages/(dashboard)/coach',
    '/pages/(dashboard)/admin',
    '/onboarding',
    '/life-score',
  ];

  const shouldExclude = excludedPaths.some((path) => 
    pathname.startsWith(path) || pathname === path
  );

  return (
    <html lang="en" className="bg-[#002147] text-gray-800">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        {!shouldExclude && <Navbar />}
        <main className="flex-grow">{children}</main>
        {!shouldExclude && <Footer />}
      </body>
    </html>
  );
}
