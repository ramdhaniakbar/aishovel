'use client'
import React from 'react'

const Page = () => {
  return (
    <>
      <main className='flex justify-center items-center'
        style={{
          backgroundImage: "url('/detail/background/main-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}>
        <div className='w-full h-full flex flex-col justify-center items-center gap-[40px]'>
          <span className='text-[30px] font-[600]'>Ayo pelajari Machine Learning dan Artificial Intelegent lebih mendalam</span>
          <div className="w-full flex gap-[20px] justify-center ">
            {
              Array.from({ length: 4 }).map((_, i) => (
                <div className="w-[300px] h-[400px] bg-white rounded-3xl shadow-2xl flex flex-col gap-[10px] justify-between" key={i}>
                  <div className='w-full h-[100px] border-b-2 border-[#c7c7c7] px-[30px] pt-[20px]'>
                    <span className='font-[600] text-[18px]'>Apa Itu Artificial Intelligence</span>
                  </div>
                  <div className='w-full h-[180px] px-[20px] flex flex-col justify-between'>
                    <span className='font-[600] text-[20px]'>Gratis</span>
                    <ul className='flex flex-col gap-[5px] font-[300] list-disc ml-[20px] text-[15px]'>
                      <li>Sejarah dan konsep dasar AI</li>
                      <li>Sejarah dan konsep dasar AI</li>
                      <li>Sejarah dan konsep dasar AI</li>
                    </ul>
                    <span className='font-[600] text-[15px]'>3 sections • 10 lectures</span>
                  </div>
                  <button onClick={() => window.location.href = `/course`} className="w-full h-[50px] bg-[#242424] text-white rounded-b-3xl cursor-pointer">
                    Mulai
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default Page