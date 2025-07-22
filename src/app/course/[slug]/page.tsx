'use client'
import { useEffect, useState } from 'react';
import Navbar from '@/app/navbar/navbar';
import { useParams } from 'next/navigation';
import { fetchPlaylistData } from '../backend';
import { useAuth } from '@/contexts/AuthContext';


const Page = () => {
  const [contentHeight, setContentHeight] = useState('');
  const [contentActive, setContentActive] = useState(0);
  const [content, setContent] = useState<VideoMeta[]>([]);
  type VideoMeta = {
    id: string;
    title: string;
    description: string;
  };
  const params = useParams();
const slug = params.slug as string;
const { user, loading } = useAuth();

// Memoize values yang tidak berubah
const allowedSlugs = ["1", "2", "3", "4"];

// Pisah effect untuk auth check
useEffect(() => {
  if (!user && !loading) {
    window.location.href = `/auth`;
  }
}, [user, loading]);

// Pisah effect untuk slug validation  
useEffect(() => {
  if (!allowedSlugs.includes(slug)) {
    window.location.href = "/course";
  }
}, [slug, allowedSlugs]);

// Pisah effect untuk window resize dan data fetching
useEffect(() => {
  const updateHeight = () => {
    if (window.innerWidth < 1200) {
      console.log("small screen");
      return;
    }
    const availableHeight = window.innerHeight - 80;
    setContentHeight(String(availableHeight) + 'px');
  };

  // Fetch data hanya sekali saat component mount
  const fetchData = async () => {
    try {
      const data = await fetchPlaylistData(
        'https://www.youtube.com/playlist?list=PL9ooVrP1hQOGHNaCT7_fwe9AabjZI1RjI',
        Number(slug)
      );
      setContent(data);
      alert("Konten video yang ditampilkan dalam aplikasi ini hanya digunakan sebagai bagian dari prototype atau demo pengujian. Tidak ada unsur komersialisasi maupun klaim hak cipta atas materi yang digunakan. Seluruh hak cipta tetap dimiliki oleh pemilik aslinya. Jika terdapat kekeliruan, kami terbuka untuk koreksi atau penghapusan sesuai kebijakan yang berlaku.");
    } catch (error) {
      console.error('Failed to fetch playlist data:', error);
    }
  };

  fetchData();
  updateHeight();
  
  window.addEventListener('resize', updateHeight);
  return () => window.removeEventListener('resize', updateHeight);
}, [slug]);

  return (
    <>
      <Navbar page={false} />
      <div className={`flex max-[1200px]:flex-col mt-[80px]`}>
        <div
          className="w-3/4 max-[1200px]:w-full bg-[#d9d9d9] min-[1200px]:overflow-auto custom-scrollbar"
          style={{ height: contentHeight }}
        >
          <div className="h-[500px] max-[800px]:h-[300px] bg-black w-full  flex justify-center">
            <iframe src={`https://www.youtube.com/embed/${content[contentActive]?.id}`} className='w-[800px] h-full'></iframe>
          </div>
          <div className="bg-white w-full min-h-[300px] p-[40px]">
            <span className='font-[600] text-[20px]'>{content[contentActive]?.title}</span>
            <p> {
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
              }
              </p>
          </div>
        </div>
        <div
          className="w-1/4 max-[1200px]:w-full overflow-y-auto custom-scrollbar border-t-4 border-[#242424]"
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