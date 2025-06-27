import React, { useEffect, useState, useRef } from 'react';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

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
        <div className={`${showNavbar ? 'opacity-100' : 'opacity-0'}  flex fixed top-0 bg-[#242424] w-full h-[80px] text-white z-[100] transition-opacity duration-300`}>
          <div className="flex justify-between p-4 w-full">
            <div className="font-[800] text-[30px]">AISHOVEL</div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className={`flex top-0 w-full h-[80px] fixed text-white transition-opacity duration-300`}>
          <div className="flex justify-between p-4 w-full">
            <div className="font-[800] text-[30px] text-[#242424]">AISHOVEL</div>
            <div></div>
            <div></div>
          </div>
        </div>
    </>
  );
};

export default Navbar;