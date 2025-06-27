'use client'
import Image from "next/image";
import Navbar from "./navbar/navbar";
import CardAnimation from "./component/home-card-anm";

export default function Home() {

  return (
    <div>
      <Navbar/>
      <main className="flex flex-col row-start-2 items-center sm:items-start" 
      style={{
          backgroundImage: "url('/home/background/bg-home-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}>
        <div className="flex flex-row h-[100vh] pt-[80px] w-full px-[50px]">
          <div className="flex flex-col gap-[20px] justify-center max-w-[700px] h-full">
            <div className="text-[40px] font-[800]"><p className="text-[#4E6688]">Kecerdasan Buatan</p> <p>Temukan, Pahami, Manfaatkan</p> </div>
            <div className="text-[16px] font-[300] mt-[-20px]">Cari tahu bagaimana kecerdasan buatan membentuk dunia di sekitarmu dan membuka peluang baru.</div>
            <button className="w-[200px] h-[50px] p-[5px] bg-[#332D56] text-white rounded-full font-[600]">Jelajahi Sekarang</button>
          </div>
          <CardAnimation/>
        </div>
          

        <div className="flex flex-col h-[100vh] pt-[80px] w-full px-[50px]">
          <span className="text-[30px] font-[600] text-center" >Perkembangan AI makin melesat, Apakah kita siap?</span>
          <div className="flex mt-[100px] justify-between">
            <div className="flex flex-col w-[500px]">
              <p className="text-[18px] font-[600]">Apa yang dikatakan Elon Musk?</p>
              <p>AI development, he said, needs to be grounded in truth-seeking and rigorous safety protocols, in order to prevent it from spinning out of control. “I think we’re quite close to digital superintelligence,” he said. “If it doesn’t happen this year, next year for sure.”</p>
              <p className="font-[500]">source: Inc.com</p>
              <br />
              <p>katanya, Pengembangan AI, perlu didasarkan pada pencarian kebenaran dan protokol keselamatan yang ketat, untuk mencegahnya lepas kendali. "Saya pikir kita sudah cukup dekat dengan kecerdasan digital super," katanya. "Jika itu tidak terjadi tahun ini, tahun depan pasti."</p>
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
        
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}