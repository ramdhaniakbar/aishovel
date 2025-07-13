'use client'
import React,{useState} from 'react'

const Page = () => {
const [auth, setAuth] = useState(false);

  return (
    <>
    <div>
        <main
          className="flex flex-col row-start-2 items-center sm:items-start py-[50px] px-[100px] max-[700px]:px-[0px]"
          style={{
            backgroundImage: "url('/home/background/bg-home-1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
          }}>
            <div className='flex flex-row h-[600px] max-w-[1200px] w-full mx-auto bg-white rounded-3xl shadow-2xl'>
                <div className='absolute cursor-pointer mt-[20px] ml-[30px] text-[#787878]' onClick={() => window.location.href = '/'}> &lt; Kembali ke home</div>
                <div className='flex justify-center w-[50%] max-[1200px]:w-[100%] h-full'>
                    <div className='flex flex-col gap-[20px] py-[50px] w-[400px] '>
                        <div className='text-[40px] font-[800] max-[480px]:ml-[40px]' >AISHOVEL</div>
                        <div className='w-full justify-center text-center text-[#a2a2a2]'>
                            {auth ? <span>Selamat datang kembali</span> 
                            : 
                            <span>Ayo bergabung bersama kami</span>
                            }
                        </div>
                        <div className='flex justify-center '>
                            <div className='flex justify-center gap-[30px] bg-[#313131] text-white py-[10px] px-[20px] rounded-3xl'>
                                <div className='w-[80px] h-[35px] bg-[#71C0BB] rounded-3xl absolute transition-all duration-300 ease-in-out'
                                style={{ transform: `translateX(${auth ? '-40px' : '40px'}) translateY(-6px)` }}/>
                                <div className='relative z-[5] cursor-pointer' onClick={() => setAuth(true)}>Masuk</div> 
                                <div className='relative z-[5] cursor-pointer' onClick={() => setAuth(false)}>Daftar</div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col justify-between h-full'>
                            {auth ?
                            <div className='flex flex-col gap-[30px] px-[20px] max-[480px]:px-[60px]'>
                                <input name='email' type="text" placeholder='Email' className='focus:outline-none border-[#2424] border-b'/>
                                <input name='password' type="text" placeholder='Password' className='focus:outline-none border-[#2424] border-b'/>
                            </div>
                            :
                            <div className='flex flex-col gap-[30px] px-[20px] max-[480px]:px-[60px]'>
                                <input name='username' type="text" placeholder='Username' className='focus:outline-none border-[#2424] border-b'/>
                                <input name='email' type="text" placeholder='Email' className='focus:outline-none border-[#2424] border-b'/>
                                <input name='password' type="text" placeholder='Password' className='focus:outline-none border-[#2424] border-b'/>
                                <input name='cpassword' type="text" placeholder='Confirm Password' className='focus:outline-none border-[#2424] border-b'/>
                            </div>
                            }
                            <button className=' bg-[#71C0BB] text-white py-[10px] rounded-3xl mx-[10px] max-[480px]:mx-[40px] mb-[50px]'>
                                {auth ? 'Masuk' : 'Daftar'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center w-[50%] h-full rounded-r-3xl max-[1200px]:hidden'
                    style={{
                        backgroundImage: "url('/detail/component/authd.png')",
                        backgroundSize: "cover", // Gambar akan menutupi seluruh area
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        minHeight: "fit-content",
                    }}>
                </div>
            </div>
          </main>
    </div>
    </>
  )
}

export default Page