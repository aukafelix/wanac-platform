"use client";
import { usePathname } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ChatComponent from '../../components/ChatComponent';
import LenisSmoothScroll from '../../components/LenisSmoothScroll';

const excludedPaths = [
  '/login',
  '/signup',
  '/client',
  '/coach',
  '/admin',
  '/pages/(dashboard)',
  '/pages/(dashboard)/client',
  '/pages/(dashboard)/coach',
  '/pages/(dashboard)/admin',
  '/pages/admin',
  '/onboarding',
  '/life-score',
  '/pages/client',
  '/pages/breakoutroom',
  '/pages/coach',
  '/pages/vsoclaimsupport',
  '/pages/cohortapplication',

];

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const shouldExclude = excludedPaths.some((path) => 
    pathname.startsWith(path) || pathname === path
  );

  return (
    <>
      {!shouldExclude && <Navbar />}
      <main className="flex-grow">
        <LenisSmoothScroll>{children}</LenisSmoothScroll>
      </main>
      {!shouldExclude && <Footer />}
      {!shouldExclude && <ChatComponent />}
    </>
  );
} 