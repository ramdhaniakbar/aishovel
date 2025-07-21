'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ClientOnly from '@/components/ClientOnly';

const Navbar = ({page}: {page: boolean}) => {
  const { user, loading} = useAuth();
  const [showNavbar, setShowNavbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [Responsive, setResponsive] = useState(false);
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
    
    const checkWidth = () => {
      const width = window.innerWidth;
      if (width <= 680) {
        setResponsive(true);
      } else {
        setResponsive(false);
      }
    };

    // Panggil sekali pas pertama mount
    checkWidth();

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkWidth);

    // Cleanup saat komponen di-unmount
    return () => {
      window.removeEventListener('resize', checkWidth);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  if(Responsive) {
    return (
      <>
      {/* Elemen kosong untuk ukur tinggi navbar */}
      <div ref={navRef} className="h-[80px] fixed transition-all duration-700 ease-in-out z-100"/>
        <div className={`${showNavbar || page !== true ? 'opacity-100' : isOpen ? 'opacity-100' : 'opacity-0'}  flex fixed top-0 bg-[#242424] w-full h-[80px] text-white z-[100] transition-opacity duration-300`}>
          <div className="flex justify-between p-4 w-full">
            <div className="font-[800] text-[30px] w-[180px]">AISHOVEL</div>
             <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8"
              >
                <g>
                  <rect
                    width="18"
                    height="2"
                    x="3"
                    y="6"
                    rx="1"
                    className={`fill-white transition-transform duration-300 origin-center ${
                      isOpen ? 'rotate-45 translate-y-[3.5px]' : ''
                    }`}
                  />
                  <rect
                    width="18"
                    height="2"
                    x="3"
                    y="11"
                    rx="1"
                    className={`fill-white transition-opacity duration-300 ${
                      isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <rect
                    width="18"
                    height="2"
                    x="3"
                    y="16"
                    rx="1"
                    className={`fill-white transition-transform duration-300 origin-center ${
                      isOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
                    }`}
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div className={`flex top-0 w-full h-[80px] fixed  transition-opacity duration-300`}>
          <div className="flex justify-between p-4 w-full">
            <div className="font-[800] text-[30px] w-[180px] ">AISHOVEL</div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8"
              >
                <g>
                  <rect
                    width="18"
                    height="2"
                    x="3"
                    y="6"
                    rx="1"
                    className={`fill-black transition-transform duration-300 origin-center ${
                      isOpen ? 'rotate-45 translate-y-[3.5px]' : ''
                    }`}
                  />
                  <rect
                    width="18"
                    height="2"
                    x="3"
                    y="11"
                    rx="1"
                    className={`fill-black transition-opacity duration-300 ${
                      isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <rect
                    width="18"
                    height="2"
                    x="3"
                    y="16"
                    rx="1"
                    className={`fill-black transition-transform duration-300 origin-center ${
                      isOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
                    }`}
                  />
                </g>
              </svg>
            </button>
          </div>
          
        </div>
        <Tab isOpen={isOpen} user={user} loading={loading}/>
    </>
    )
  }
  else {
    return (
    <>
      {/* Elemen kosong untuk ukur tinggi navbar */}
      <div ref={navRef} className="h-[80px] fixed transition-all duration-700 ease-in-out"/>
        <div className={`${showNavbar || page !== true ? 'opacity-100' : 'opacity-0'}  flex fixed top-0 bg-[#242424] w-full h-[80px] text-white z-[100] transition-opacity duration-300`}>
          <div className="flex justify-between p-4 w-full">
            <div className="font-[800] text-[30px] w-[180px]">AISHOVEL</div>
              <div className='w-[180px] text-center justify-center items-center flex gap-[20px]'>
                <span className='cursor-pointer' onClick={()=>router.push('/')}>Home</span> 
                <span className='cursor-pointer'onClick={()=>router.push('/search')}>Cari</span>
                <span className='cursor-pointer'onClick={user ? () => window.location.href = `/course` : () => window.location.href = `/pricing`}>Kursus</span>
              </div>
              <ClientOnly fallback={
                <div className={`w-[180px] flex justify-center`}>
                  <div className='text-white'>Loading...</div>
                </div>
              }>
                {loading ? (
                  <div className={`w-[180px] flex justify-center`}>
                    <div className='text-white'>Loading...</div>
                  </div>
                ) : user ? (
                  <div className={`w-[200px] flex justify-end items-center gap-[10px]`}>
                    <div className='cursor-pointer rounded-xl font-[500] px-[10px] py-[5px] flex justify-center items-center text-white text-sm' onClick={()=>router.push('/profile')}>Profile</div>
                  </div>
                ) : (
                  <div className={`w-[180px] flex justify-between`}>
                    <div className='cursor-pointer rounded-xl font-[500] px-[15px] bg-white text-[#242424] flex justify-center items-center' onClick={()=>router.push('/auth?param=true')}>Masuk</div>
                    <div className='cursor-pointer rounded-xl font-[500] px-[15px] bg-[#65549e] flex justify-center items-center' onClick={()=>router.push('/auth')}>Daftar</div>
                  </div>
                )}
              </ClientOnly>
          </div>
        </div>
        <div className={`flex top-0 w-full h-[80px] fixed  transition-opacity duration-300`}>
          <div className="flex justify-between p-4 w-full">
            <div className="font-[800] text-[30px] w-[180px] ">AISHOVEL</div>
            <div className='w-[180px] text-center justify-center items-center flex gap-[20px]'>
              <span className='cursor-pointer ' onClick={()=>router.push('/')}>Home</span> 
              <span className='cursor-pointer 'onClick={()=>router.push('/search')}>Cari</span>
              <span className='cursor-pointer 'onClick={user ? () => window.location.href = `/course` : () => window.location.href = `/pricing`}>Kursus</span>
            </div>
            <ClientOnly fallback={
              <div className={`w-[180px] flex justify-center`}>
                <div className='text-black'>Loading...</div>
              </div>
            }>
              {loading ? (
                <div className={`w-[180px] flex justify-center`}>
                  <div className='text-black'>Loading...</div>
                </div>
              ) : user ? (
                <div className={`w-[200px] flex justify-end  items-center gap-[10px]`}>
                  <div className='cursor-pointer rounded-full font-[500] px-[20px] py-[15px] bg-[#71C0BB] flex justify-center items-center text-white text-sm' onClick={()=>router.push('/profile')}>Profile</div>
                </div>
              ) : (
                <div className={`w-[180px] flex justify-between`}>
                  <div className='shadow-2xl cursor-pointer rounded-xl font-[500] px-[15px] bg-white text-[#242424] flex justify-center items-center' onClick={()=>router.push('/auth?param=true')}>Masuk</div>
                  <div className='shadow-2xl cursor-pointer rounded-xl font-[500] px-[15px] bg-[#65549e] flex justify-center items-center text-white' onClick={()=>router.push('/auth')}>Daftar</div>
                </div>
              )}
            </ClientOnly>
            
          </div>
        </div>
    </>
      );
    };
  }


const Tab = ({isOpen, user, loading}:{isOpen: boolean, user: any, loading: boolean})=> {
  return(
    <>
    <div className='h-full w-[300px] bg-[#1d1d1d] fixed right-0 z-50 
    duration-300 ease-in-out'
    style={{transform: isOpen ? 'translateX(0)' : 'translateX(300px)'}}>
    <div className='w-full text-center justify-center items-center flex gap-[20px] flex-col text-white mt-[80px]'>
        <span className='cursor-pointer p-[20px]' onClick={() => window.location.href = `/`}>Home</span> 
        <span className='cursor-pointer p-[20px]'onClick={()=>window.location.href = `/search`}>Cari</span>
        <span className='cursor-pointer p-[20px]'onClick={user ? () => window.location.href = `/course` : () => window.location.href = `/pricing`}>Kursus</span>
      </div>
      {loading ? (
        <div className={`w-full flex flex-col justify-center p-[20px]`}>
          <div className='text-white text-center'>Loading...</div>
        </div>
      ) : user ? (
        <div className={`w-full flex flex-col justify-center gap-[10px]`}>
          <div className='text-white text-center p-[10px] text-sm'>{user.email}</div>
          <div className='cursor-pointer font-[500] px-[15px] bg-[#71C0BB] flex justify-center items-center p-[20px] text-white' onClick={()=> window.location.href = `/profile`}>Profile</div>
        </div>
      ) : (
        <div className={`w-full flex flex-col justify-between`}>
          <div className='cursor-pointer font-[500] px-[15px] bg-white text-[#242424] flex justify-center items-center p-[20px]' onClick={()=> window.location.href = `/auth?param=true`}>Masuk</div>
          <div className='cursor-pointer font-[500] px-[15px] bg-[#65549e] flex justify-center items-center p-[20px] text-white' onClick={()=> window.location.href = `/auth`}>Daftar</div>
        </div>
      )}
    </div>
    </>
  )
}

export default Navbar;