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
        <title>WANAC COACHING PLATFORM - Empowering Veterans to Thrive After Service</title>
        <meta name="description" content="Get tailored coaching, smart tools, and a community that truly understands your veteran journey. Join 5000+ veterans in our supportive community." />
        <meta name="keywords" content="veteran coaching, military transition, career coaching, veteran support, PTSD support, veteran community, Promise Land Education Pathway, Peak Performance Coaching" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Open Graph */}
        <meta property="og:title" content="WANAC COACHING PLATFORM" />
        <meta property="og:description" content="Empowering Veterans to Thrive After Service" />
        <meta property="og:image" content="/landingpage4.jpg" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WANAC COACHING PLATFORM" />
        <meta name="twitter:description" content="Empowering Veterans to Thrive After Service" />
        <meta name="twitter:image" content="/landingpage4.jpg" />
        
        <link rel="icon" href="/WANAC N 8 Old Glory.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="/jitsi-custom.css" />
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
