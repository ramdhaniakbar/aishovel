'use client'
import Navbar from "../navbar/navbar"
import HomeNews from "../component/home-news"
import FooterCompo from "../component/footer-compo"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const Page = () => {
  interface Dekripsi {
      data: string[];
    }
    interface Program {
      id: number;
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
    const getImageUrl =  (path: string) => {
      const { data } = supabase.storage.from('images').getPublicUrl('template/'+path);
      return data.publicUrl;
    };
  return (
    <>
    <main
          className="flex flex-col row-start-2 items-center sm:items-start pt-[80px] max-[700px]:px-[0px]"
          style={{
            backgroundImage: "url('/home/background/bg-home-1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
          }}>
        <Navbar page={false} auth={false} />
        <div className="w-full h-[250px] bg-white rounded-b-3xl shadow-xl flex justify-center">
          <div className="w-[400px] h-full flex flex-col px-[60px] py-[70px]">
            <span className="">Selamat datang kembali,</span>
            <span className="text-[40px] font-[600] h-[55px]">Anonymous</span>
            <span className="">Apa rencanamu hari ini?</span>
          </div>
          <div className="w-[800px] h-full flex flex-col px-[60px] py-[20px] gap-[10px] max-[1200px]:hidden">
            <span className="font-[500]">Banyak hal baru yang menunggumu</span>
            <div className="w-full h-full ">
              <HomeNews params='course' />
            </div>
          </div>
        </div>
        <div className="w-full px-[100px] py-[50px] flex flex-col gap-[20px]">
          <div><span className="text-[20px] font-[600]">Programs</span></div>
          <div className="w-full flex gap-[20px] justify-center flex-wrap">
            {
              konten?.map((item, i) => (
                <div className="w-[300px] h-fit bg-white rounded-3xl shadow-2xl flex flex-col gap-[10px]" key={i}>
                  <div className="w-full h-[170px] rounded-t-3xl"
                  style={{
                        backgroundImage: `url("${getImageUrl(String(item.id))}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}></div>
                  <div className="px-[20px] w-full">
                    <span className="text-[20px] font-[700]">{item.judul}</span>
                    
                  </div>
                  <button onClick={() => window.location.href = `/course/${i + 1}`} className="w-full h-[50px] bg-[#242424] text-white rounded-b-3xl cursor-pointer">
                    Mulai
                  </button>
                </div>
              ))
            }
          </div>
        </div>
    </main>
    <footer>
      <FooterCompo />
    </footer>
    </>
    
  )
}

export default Page