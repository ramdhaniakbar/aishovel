'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = ({page, auth}: {page: boolean, auth: boolean}) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      const navHeight = navRef.current?.offsetHeight || 80;
      const scrollY = window.scrollY;
      
      if (scrollY > navHeight) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Elemen kosong untuk ukur tinggi navbar */}
      <div ref={navRef} className="h-[80px] fixed transition-all duration-700 ease-in-out" />
        <div className={`${showNavbar || page !== true ? 'opacity-100' : 'opacity-0'}  flex fixed top-0 bg-[#242424] w-full h-[80px] text-white z-[100] transition-opacity duration-300`}>
          <div className="flex justify-between p-4 w-full">
            <div className="font-[800] text-[30px] w-[180px]">AISHOVEL</div>
            <div className='w-[180px] text-center justify-center items-center flex gap-[20px]'>
              <span className='cursor-pointer' onClick={()=>router.push('/')}>Home</span> 
              <span className='cursor-pointer'onClick={()=>router.push('/search')}>Cari</span></div>
              {auth ?
               <div className={`w-[180px] flex justify-center`}>
                <div className='cursor-pointer rounded-xl font-[500] px-[15px] bg-[#65549e] flex justify-center items-center' onClick={()=>router.push('/auth')}>Dashboard</div>
              </div>
              :
              <div className={`w-[180px] flex justify-between`}>
                <div className='cursor-pointer rounded-xl font-[500] px-[15px] bg-white text-[#242424] flex justify-center items-center' onClick={()=>router.push('/auth')}>Masuk</div>
                <div className='cursor-pointer rounded-xl font-[500] px-[15px] bg-[#65549e] flex justify-center items-center' onClick={()=>router.push('/auth')}>Daftar</div>
              </div>
              }
          </div>
        </div>
        <div className={`flex top-0 w-full h-[80px] fixed text-white transition-opacity duration-300`}>
          <div className="flex justify-between p-4 w-full">
            <div className="font-[800] text-[30px] w-[180px] text-black">AISHOVEL</div>
            <div className='w-[180px] text-center justify-center items-center flex gap-[20px]'>
              <span className='cursor-pointer text-black' onClick={()=>router.push('/')}>Home</span> 
              <span className='cursor-pointer text-black'onClick={()=>router.push('/search')}>Cari</span></div>
            {auth ?
              <div className={`w-[180px] flex justify-center`}>
                <div className='cursor-pointer rounded-xl font-[500] px-[15px] bg-[#65549e] flex justify-center items-center' onClick={()=>router.push('/auth')}>Dashboard</div>
              </div>
            :
              <div className={`w-[180px] flex justify-between`}>
                <div className='shadow-2xl cursor-pointer rounded-xl font-[500] px-[15px] bg-white text-[#242424] flex justify-center items-center' onClick={()=>router.push('/auth')}>Masuk</div>
                <div className='shadow-2xl cursor-pointer rounded-xl font-[500] px-[15px] bg-[#65549e] flex justify-center items-center' onClick={()=>router.push('/auth')}>Daftar</div>
              </div>
              
            }
            
          </div>
        </div>
    </>
  );
};

export default Navbar;