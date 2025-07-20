'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const Page = () => {
  interface Dekripsi {
    data: string[];
  }
  interface Program {
    judul: string;
    price: string;
    deskripsi: Dekripsi;
    section: string;
  }
  const [konten, setKonten] = useState<Program[] | null>(null);
  useEffect(() => {
    const fetchkonten = async () : Promise<Program[] | null>  => {
      const { data, error } = await supabase
        .from('programs')
        .select()
      if (error) {
        return null;
      }
      return data;
    }
    fetchkonten().then((value : Program[] | null) => {
      if (value) {
        setKonten(value)
      }
    })
    
  }, [])
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
              konten?.map((items, i) => (
                <div className="w-[300px] h-[400px] bg-white rounded-3xl shadow-2xl flex flex-col gap-[10px] justify-between" key={i}>
                  <div className='w-full h-[100px] border-b-2 border-[#c7c7c7] px-[30px] py-[20px] flex  items-center'>
                    <span className='font-[600] text-[18px]'>{items.judul}</span>
                  </div>
                  <div className='w-full h-[180px] px-[20px] flex flex-col justify-between'>
                    <div className='w-full flex flex-col'>
                      <span className='font-[600] text-[20px]'>{items.price}</span>
                      <span className='font-[400] text-[12px] text-[#a9a9a9]'>Sekali seumur hidup</span>
                    </div>
                    <ul className='flex flex-col gap-[5px] font-[300] list-disc ml-[20px] text-[15px]'>
                      {konten[i].deskripsi.data.map((item, e) => 
                      <li key={e}>{item}</li>
                      )}
                    </ul>
                    <span className='font-[600] text-[15px]'>{items.section}</span>
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