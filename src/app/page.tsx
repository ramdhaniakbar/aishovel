/* eslint-disable react/no-unescaped-entities */
"use client"
import { Suspense } from 'react'
import Image from "next/image"
import Navbar from "./navbar/navbar"
import CardAnimation from "./component/home-card-anm"
import HomeNews from "./component/home-news"
import HomeFAQ from "./component/home-FAQ"
import FooterCompo from "./component/footer-compo"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

function ScrollHandler() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (searchParams.get('scroll') === 'tujuan') {
      document.getElementById('tujuan')?.scrollIntoView({ behavior: 'smooth' });
    }
    else if (searchParams.get('scroll') === 'news') {
      document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' });
    }
    else if (searchParams.get('scroll') === 'faq') {
      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchParams]);

  return null; // Komponen ini tidak render apa-apa
}

export default function Home() {
  return (
    <>
      <div>
        <Suspense fallback={null}>
          <ScrollHandler />
        </Suspense>
        <Navbar page={true} />
        <main
          className="flex flex-col row-start-2 items-center sm:items-start scroll-smooth"
          style={{
            backgroundImage: "url('/home/background/bg-home-1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
          }}>
          <div className="flex flex-row h-[100vh] pt-[80px] w-full px-[100px] max-[640px]:px-[50px]">
            <div className="flex flex-col gap-[20px] justify-center max-w-[700px] h-full">
              <div className="text-[40px] font-[800]">
                <p className="text-[#4E6688]">Kecerdasan Buatan</p>{" "}
                <p>Temukan, Pahami, Manfaatkan</p>{" "}
              </div>
              <div className="text-[16px] font-[300] mt-[-20px]">
                Cari tahu bagaimana kecerdasan buatan membentuk dunia di
                sekitarmu dan membuka peluang baru.
              </div>
              <button className="w-[200px] h-[50px] p-[5px] bg-[#332D56] text-white rounded-full font-[600] cursor-pointer" onClick={() => window.location.href = `/search`}>
                Jelajahi Sekarang
              </button>
            </div>
            <CardAnimation />
          </div>

          <div className="flex flex-col h-[100vh] max-[1100px]:h-fit pt-[80px] w-full px-[100px] max-[640px]:px-[50px]">
            <span className="text-[30px] font-[600] text-center">
              Perkembangan AI makin melesat, Apakah kita<span className="text-[#65549e]"> siap?</span>
            </span>
            <div className="flex mt-[100px] justify-between font-[300] max-[1100px]:items-center max-[1100px]:gap-[50px] max-[1100px]:flex-col-reverse">
              <div className="flex flex-col w-[500px] max-[1100px]:w-auto">
                <p className="text-[18px] font-[600]">
                  Apa yang dikatakan Elon Musk?
                </p>
                <p>
                  AI development, he said, needs to be grounded in truth-seeking
                  and rigorous safety protocols, in order to prevent it from
                  spinning out of control. “I think we’re quite close to digital
                  superintelligence,” he said. “If it doesn’t happen this year,
                  next year for sure.”
                </p>
                <p className="font-[500]">source: Inc.com</p>
                <br />
                <p>
                  katanya, Pengembangan AI, perlu didasarkan pada pencarian
                  kebenaran dan protokol keselamatan yang ketat, untuk
                  mencegahnya lepas kendali. "Saya pikir kita sudah cukup dekat
                  dengan kecerdasan digital super," katanya. "Jika itu tidak
                  terjadi tahun ini, tahun depan pasti."
                </p>
              </div>

              <div>
                <Image
                  className="rounded-[30px]"
                  aria-hidden
                  src="/home/component/elon.jpg"
                  alt="Elon Musk"
                  width={250}
                  height={250}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col h-[100vh] pt-[80px] w-full px-[100px] max-[640px]:px-[50px] items-center justify-center" id="tujuan">
            <span className="text-[30px] font-[600] text-center">
             <span className="text-[#4E6688]" >Mengapa</span> website ini dibuat?
            </span>
            <div className="flex mt-[20px] w-auto font-[300]">
                <p className="text-center">
                  Paham dan mengerti tentang AI, bukan hanya sebagai pengguna, tapi sebagai orang yang berilmu.
                  Informasi tentang AI yang jujur, jelas, dan membuat kita terbebas dari belenggu ketidaktahuan.
                  Itulah inti dari pembuatan website ini
                </p>
            </div>
          </div>
          <span className="text-[30px] max-[640px]:text-[20px] font-[600] text-center w-full">
             Apa yang terjadi<span className="text-[#71C0BB]"> sekarang?</span> 
          </span>
          <div className="flex flex-col h-[2000px] pt-[240px] w-full px-[100px] max-[640px]:px-[50px] items-center"
            style={{
              backgroundImage: "url('/home/background/bg-news.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              }}>
            <p className="text-center text-white" id="news">
                Jadilah yang paling pertama mengetahui informasi terbaru
              </p>
            <HomeNews params="home"/>
          </div>
          <div className="flex flex-col h-fit pt-[80px] w-full px-[100px] gap-[50px]">
            <span className="text-[30px] font-[600] text-center">
              Apa yang membuat kami<span className="text-[#71C0BB]"> berbeda?</span>
            </span>
            <div className="w-full flex gap-[20px] justify-center flex-wrap">
              <div className="flex flex-col items-center p-[20px] w-[300px] h-[300px] rounded-3xl bg-white shadow-2xl text-black hover:bg-[#242424] hover:text-white cursor-pointer transition-colors duration-300">
                <div className="w-[100px] h-[100px] my-[30px]">
                  <img src="/home/component/search.png"alt="flow" />
                </div>
                <div className="flex flex-col w-full items-center">
                  <span className="font-[600]">Search</span>
                  <span className="text-[12px] font-[400] text-center">Temukan informasi akurat dan relevan dengan bantuan AI yang paham konteks dan kebutuhanmu.</span>
                </div>
              </div>
              <div className="flex flex-col items-center p-[20px] w-[300px] h-[300px] rounded-3xl bg-white shadow-2xl text-black hover:bg-[#242424] hover:text-white cursor-pointer transition-colors duration-300">
                <div className="w-[100px] h-[100px] my-[30px]">
                  <img src="/home/component/demo.png"alt="flow" />
                </div>
                <div className="flex flex-col w-full items-center">
                  <span className="font-[600]">Try</span>
                  <span className="text-[12px] font-[400] text-center">Eksplorasi fitur dan simulasi langsung.</span>
                </div>
              </div>
              <div className="flex flex-col items-center p-[20px] w-[300px] h-[300px] rounded-3xl bg-white shadow-2xl text-black hover:bg-[#242424] hover:text-white cursor-pointer transition-colors duration-300">
                <div className="w-[100px] h-[100px] my-[30px]">
                  <img src="/home/component/flow.png"alt="flow" />
                </div>
                <div className="flex flex-col w-full items-center">
                  <span className="font-[600]">Learn</span>
                  <span className="text-[12px] font-[400] text-center">Pelajari topik rumit dengan panduan interaktif, insight dari AI, dan pembelajaran adaptif.</span>
                </div>
              </div>
            </div>
          </div>
          <HomeFAQ/>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <FooterCompo/>
        </footer>
      </div>
    </>
  )
}
