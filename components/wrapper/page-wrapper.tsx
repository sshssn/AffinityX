"use client"
import Footer from './footer';
import NavBar from './navbar';
import { BackToTop } from '../ui/back-to-top';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="flex min-w-screen min-h-screen flex-col pt-16 sm:pt-20 items-center bg-white dark:bg-black">
        <div className="absolute z-[-99] pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="w-full max-w-full">
          {children}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}