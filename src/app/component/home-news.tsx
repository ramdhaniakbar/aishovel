import React from 'react'
import { useEffect, useState } from 'react'
import {getNews} from './backend'

const HomeNews = ({params} : {params:string}) => {
    const [data, setData] = React.useState<Property[] | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    interface Property {
    judul: string;
    konten: string;
    link:string;
    gambar: string;
  }
  useEffect(() => {
    getNews().then((value : Property[] | null) => {
      if (value) {
        setData(value);
      }
      
    });
  }, [])
  if (params === 'home') {
    return (
        <div className="flex w-full justify-between mt-[100px] gap-[30px]">
            <div className="max-w-[800px]">
                <p className=" text-[30px] text-white font-[600] mb-[20px] bg-[#242424]">
                    {data?.[activeIndex]?.judul}
                </p>
                <img
                className="rounded-[30px] max-h-[400px] w-full object-cover"
                aria-hidden
                src={data?.[activeIndex]?.gambar || '/home/news/news.png'}
                alt="News"
                />
                <div className="mt-[100px] bg-[rgba(51,51,51,0.3)] rounded-[20px] p-[40px] backdrop-blur-[3px] text-white gap-[10px] flex flex-col">
                <p>
                    {
                        (() => {
                        const text = data?.[activeIndex]?.konten || '';
                        const sentences = text.split('.');

                        const result = [];

                        for (let i = 0; i < sentences.length; i++) {
                            const sentence = sentences[i].trim();
                            if (!sentence) continue;

                            // Tambahkan kalimat
                            result.push(sentence + '. ');

                            // Setiap 4 kalimat, tambahkan 2x <br />
                            if ((i + 1) % 4 === 0) {
                            result.push(<br key={`br1-${i}`} />);
                            result.push(<br key={`br2-${i}`} />);
                            }
                        }

                        return result;
                        })()
                    }
                    </p>
                </div>
                <div className='flex justify-center items-center mt-[50px] text-white'>
                    <button onClick={() => window.open(data?.[activeIndex]?.link, '_blank')} className='w-[200px] h-[60px] bg-[#65549e] rounded-2xl hover:bg-[#443d6f] cursor-pointer'>Baca Selengkapnya</button>
                </div>
            </div>
            <div className="w-[400px] flex flex-col gap-[20px]">
                {data && Array.from({ length: data.length}).map((_, i) => (
                <div key={i} className={`relative group rounded-[30px] min-w-[300px] h-[200px] overflow-hidden ${i === activeIndex ? 'hidden' : ''}`}>
                    <div className={`absolute inset-0 bg-cover bg-center`} 
                    style={{backgroundImage: `url(${data[i].gambar})`}}/>
                    <div className="absolute inset-0 group-hover:bg-[rgba(51,51,51,0.5)]" />
                    <div className="relative z-10 p-[20px] flex items-end h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-[500] cursor-pointer hover:underline decoration-1 underline-offset-[2px]" onClick={() => setActiveIndex(i)}>
                        {data[i].judul}
                    </span>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
  }
  else if (params === "course"){
    const [activeIndexCourse, setActiveIndexCourse] = useState(0);
    const handleNext = () => {
    if (!data){return}
        setActiveIndexCourse((prev) => (prev + 1) % data?.length);
    };
    const handlePrev = () => {
    if (!data){return}
        setActiveIndexCourse((prev) => (prev - 1 + data?.length) % data?.length);
    };
    return (
        <div className="w-full">
            <div className='flex'>
                <div className="flex">
                <button onClick={handlePrev} className="bg-[#242424] px-3 py-3 rounded-l cursor-pointer hover:bg-[#333333]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-white">
                    <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                </div>
                <div className="py-[10px] w-full flex gap-[20px] transition-all duration-500 overflow-hidden bg-[#4f4e4e]">
                    <div className="w-full flex gap-[20px] transition-all duration-500"
                     style={{ transform: `translateX(-${activeIndexCourse * 270}px)` }}>
                        {data && Array.from({ length: data.length}).map((_, i) => (
                        <div key={i} className={`relative group rounded-[30px] min-w-[250px] h-[150px] overflow-hidden`}>
                            <div className={`absolute inset-0 bg-cover bg-center`} 
                            style={{backgroundImage: `url(${data[i].gambar})`}}/>
                                <div className="absolute inset-0 bg-[rgba(51,51,51,0.4)] group-hover:bg-[rgba(51,51,51,0.7)]" />
                                <div className="relative z-10 p-[20px] flex items-end h-full">
                                <span className="text-white text-[12px] font-[400] cursor-pointer hover:underline decoration-1 underline-offset-[2px]" onClick={() => window.open(data?.[activeIndex]?.link, '_blank')}>
                                    {data[i].judul}
                                </span>
                            </div>
                            
                        </div>
                        ))}
                    </div>
                </div>
                <div className="flex">
                <button onClick={handleNext} className="bg-[#242424] px-3 py-3 rounded-r cursor-pointer hover:bg-[#333333]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-full text-white">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                </div>
            </div>
        </div>
    )
  }
}

export default HomeNews