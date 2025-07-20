'use client'
import Navbar from '@/app/navbar/navbar'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import {getDetail} from './backend'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import FooterCompo from '@/app/component/footer-compo'

const Detail = () => {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [data, setData] = React.useState<Property | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemCount = data? data.image.length : 0;
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % itemCount);
  };
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount);
  };
  interface Property {
    nama: string;
    definisi: string;
    tujuan: string;
    flowchart: string;
    quote: string;
    image: string[][];
  }
  useEffect(() => {
    getDetail(slug).then((value : Property | null) => {
      if (value) {
        setData(value);
      }
      else {
        router.push('/');
      }
    });
  }, [slug])

  

  return data && (
    <>
      <div>
        <main
        className="flex flex-col row-start-2 items-center sm:items-start"
              style={{
                backgroundImage: "url('/detail/background/main-background.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                minHeight: "100vh",
              }}>
          <Navbar page={false}/>
          <div className='px-[100px] pt-[100px] w-full flex flex-col items-center'>
                <span className='font-[700] text-[30px]'>{data?.nama}</span>
                <p className='font-[300] text-center'>{data?.quote}</p>
          </div>
          <div className='max-[1000px]:flex-col max-[1000px]:px-[40px] max-[1000px]:h-fit min-h-[400px]  px-[100px] pt-[70px] w-full flex  gap-[20px]'>
              <div className='flex flex-col w-full h-fit min-[1000px]:min-h-[350px] items-center bg-[#242424]/60 p-[30px] rounded-2xl text-white'>
                <div className='w-fit'>
                  <span className='font-[600] text-[20px] max-[1000px]:text-center'>Definisi</span>
                  <p className='font-[300] max-[1000px]:text-[12px]'>{data?.definisi}</p>
                </div>
              </div>
              <div className='flex flex-col w-full min-[1000px]:min-h-[350px] h-fit items-center bg-[#242424]/60 p-[30px] rounded-2xl text-white'>
                <div className='w-fit'>
                  <span className='font-[600] text-[20px] max-[1000px]:text-center'>Tujuan</span>
                  <p className='font-[300] max-[1000px]:text-[12px]'>{data?.tujuan}</p>
                </div>
              </div>
          </div>
          <div className='h-[600px] mx-auto w-full flex gap-[20px] mt-[75px] max-[1000px]:flex-col max-[1000px]:items-center px-[40px] min-[1000px]:w-[900px]'>
              <span className='font-[700] text-[30px]'>Gimana Logikanya?</span>
              {data.flowchart?
                <iframe className='h-[400px] w-full rounded-2xl' src={data?.flowchart} ></iframe>
                :
                <div className='h-[400px] w-full flex bg-[#242424] rounded-2xl'/>
              }
          </div>
      <div className='h-[700px] mx-auto min-[1000px]:w-[900px] w-full flex gap-[20px] flex-col'>
        <span className='font-[700] text-[30px] w-full text-center'>Ayo Coba</span> 
        
        <div className='h-fit p-[50px] w-full flex flex-col items-center bg-[#242424] rounded-2xl relative overflow-hidden gap-[50px] max-[1000px]:scale-[0.9]'>
            <div 
              className='flex items-center gap-[20px] h-[300px] w-[500px] transition-transform duration-500' 
              style={{ transform: `translateX(-${activeIndex * 520}px)` }}
            >
              {data.image.map((item, i) => (
                <div key={i} className={`transition-all duration-500 relative min-w-[500px] h-[300px] ${activeIndex>i || activeIndex<i ? 'opacity-[50%]' : 'opacity-[100%]'}`}>
                  <div className={`transition-all duration-500 relative rounded-[30px] w-full h-full bg-white flex justify-center items-center text-black font-bold text-xl ${activeIndex>i ? 'ml-[200px] scale-[0.5]' : ''}  ${activeIndex<i ? 'ml-[-200px] scale-[0.5]' : ''} ${activeIndex==i ? 'z-10' : 'z-[5]'}`}
                  style={{
                          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("${item[1]}")`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}>
                          <div className='flex flex-col gap-[20px] justify-center items-center transition-all duration-500'
                          style={{opacity: activeIndex==i ? 1 : 0}}>
                            <span className='text-white'>{item[0]}</span>
                            <button className='px-3 py-3 rounded-full cursor-pointer bg-gray-200'>Ayo Coba</button>
                          </div>
                        </div>
                </div>
              ))}
            </div>
            
            <div className='flex h-[100px] w-[500px] justify-center items-center gap-[30px]'>
              <div className="z-10">
                <button onClick={handlePrev} className="bg-white px-3 py-3 rounded cursor-pointer hover:bg-gray-200">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                    <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className='w-[150px] overflow-hidden relative flex justify-center'>
                <div className='relative flex items-center gap-[20px] h-[200px] w-[100px] transition-all duration-500' style={{ transform: `translateX(-${activeIndex * 120}px)` }}>
                  {data.image.map((item, i) => (
                    <div 
                      key={i} 
                      onClick={() => setActiveIndex(i)}
                      className={`transition-all min-w-[100px] h-[100px]  ${activeIndex>i || activeIndex<i ? 'opacity-[50%]' : 'opacity-[100%]'}`}
                    >
                      <div className={`transition-all relative cursor-pointer rounded-[30px] w-[100px] h-[100px] flex justify-center items-center ${activeIndex>i ? 'ml-[70px] scale-[0.5]' : ''}  ${activeIndex<i ? 'ml-[-70px] scale-[0.5]' : ''} ${activeIndex==i ? 'z-10' : 'z-[5]'}`}
                      style={{
                          backgroundImage: `url("${item[2]}")`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}>
                      
                      </div>
                    </div>
                  ))}
              </div>
              </div>
              
              <div className="z-10">
                <button onClick={handleNext} className="bg-white px-3 py-3 rounded cursor-pointer hover:bg-gray-200">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
            </div>
        </div>
        <div className='w-full h-fit bg-[#71C0BB] text-white py-[40px] px-[60px] flex justify-center items-center max-[1000px]:flex-col gap-[20px]'>
            <span className='text-[40px] max-[1000px]:text-[20px] font-[700]'>Ingin naik level dengan skill yang relevan dan terpakai langsung di dunia nyata?</span>
            <div className='flex justify-end'>
              <button className='w-[200px] bg-[#242424] px-3 py-[20px] rounded-full cursor-pointer hover:bg-[#373737] text-[20px] max-[1000px]:text-[13px] font-[600] h-[100px] max-[1000px]:h-fit' onClick={() => router.push('/pricing')}>Mulai Belajar Sekarang</button>
            </div>
        </div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <FooterCompo/>
        </footer>
      </div>
    </>
    
    
  )
}

export default Detail