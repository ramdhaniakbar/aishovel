'use client'
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/app/navbar/navbar';
import { useParams } from 'next/navigation';
import { fetchPlaylistData } from '../backend';

const Page = () => {
  const [contentHeight, setContentHeight] = useState(0);
  const [contentActive, setContentActive] = useState(0);
  const [content, setContent] = useState<VideoMeta[]>([]);
  type VideoMeta = {
    id: string;
    title: string;
    description: string;
  };
  const params = useParams()
 const slug = params.slug as string;
useEffect(() => {
    const allowedSlugs = ["1", "2", "3", "4"];
    if (!allowedSlugs.includes(slug)) {
      window.location.href = "/course";
    }
    alert("Konten video yang ditampilkan dalam aplikasi ini hanya digunakan sebagai bagian dari prototype atau demo pengujian. Tidak ada unsur komersialisasi maupun klaim hak cipta atas materi yang digunakan. Seluruh hak cipta tetap dimiliki oleh pemilik aslinya. Jika terdapat kekeliruan, kami terbuka untuk koreksi atau penghapusan sesuai kebijakan yang berlaku.");
    const updateHeight = () => {
      const availableHeight = window.innerHeight - 80;
      setContentHeight(availableHeight);
    };
    fetchPlaylistData('https://www.youtube.com/playlist?list=PL9ooVrP1hQOGHNaCT7_fwe9AabjZI1RjI',Number(slug)).then((data) => {setContent(data)
    });
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
          <div className="h-[500px] bg-black w-full  flex justify-center">
            <iframe src={`https://www.youtube.com/embed/${content[contentActive]?.id}`} className='w-[800px] h-full'></iframe>
          </div>
          <div className="bg-white w-full min-h-[300px] p-[40px]">
            <span className='font-[600] text-[20px]'>{content[contentActive]?.title}</span>
            <p>{
              (() => {
                  const text = content?.[contentActive]?.description || '';
                  const sentences = text.split('.');
                  const result = [];

                  let wordCount = 0;
                  const isWide = typeof window !== 'undefined' && window.innerWidth < 640;

                  for (let i = 0; i < sentences.length; i++) {
                  const sentence = sentences[i].trim();
                  if (!sentence) continue;

                  const words = sentence.split(/\s+/);

                  if (isWide && wordCount + words.length > 70) {
                      // ambil sisa kata yang bisa ditambah
                      const remainingWords = 70 - wordCount;
                      const trimmedSentence = words.slice(0, remainingWords).join(' ');
                      result.push(trimmedSentence + '. ');
                      break;
                  }

                  result.push(sentence + '. ');
                  wordCount += words.length;

                  // Setiap 4 kalimat (string), tambahkan <br /><br />
                  const stringCount = result.filter(r => typeof r === 'string').length;
                  if (stringCount % 4 === 0) {
                      result.push(<br key={`br1-${i}`} />);
                      result.push(<br key={`br2-${i}`} />);
                  }
                  }

                  return result;
              })()
              }</p>
          </div>
        </div>
        <div
          className="w-1/4 overflow-y-auto custom-scrollbar"
          style={{ height: contentHeight }}
        >
          {content.map((item, index) => (
            <div
              key={index}
              className="w-full min-h-[100px] h-fit bg-white border-b border-[#c8c8c8] p-[20px] cursor-pointer" onClick={()=>setContentActive(index)}
            >
              <span className={`text-[15px] ${index === contentActive ? 'font-[800]' : ''}`}>{item?.title}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


export default Page