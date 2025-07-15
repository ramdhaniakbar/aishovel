'use client'
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/app/navbar/navbar';
import { useParams } from 'next/navigation';

const Page = () => {
  const [contentHeight, setContentHeight] = useState(0);
  const [contentActive, setContentActive] = useState(0);
  const params = useParams()
  const slug = params.slug as string
  useEffect(() => {
    const updateHeight = () => {
      const availableHeight = window.innerHeight - 80;
      setContentHeight(availableHeight);
    };

  updateHeight();
  window.addEventListener('resize', updateHeight);

  return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <>
      <Navbar page={false} auth={false} />
      <div className={`flex mt-[80px]`}>
        <div
          className="w-3/4 bg-[#d9d9d9] overflow-auto custom-scrollbar"
          style={{ height: contentHeight }}
        >
          <div className="h-[500px] bg-[#d9d9d9] w-full">

          </div>
          <div className="bg-white w-full min-h-[300px] p-[40px]">
            <span className='font-[600] text-[20px]'>Judul</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.</p>
          </div>
        </div>
        <div
          className="w-1/4 overflow-y-auto custom-scrollbar"
          style={{ height: contentHeight }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-[100px] bg-white border-b border-[#c8c8c8] p-[20px] cursor-pointer" onClick={()=>setContentActive(index)}
            >
              <span className='font-[500] text-[15px]'>Judul</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


export default Page