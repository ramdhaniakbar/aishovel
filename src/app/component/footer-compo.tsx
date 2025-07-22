import React from 'react'
import { useRouter } from 'next/navigation';

const FooterCompo = () => {
    const router = useRouter()
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
            });
        }

    return (
        <div className="w-full h-[200px] max-[640px]:h-fit bg-[#242424] flex flex-col text-white px-[50px] py-[20px] justify-between">
                <div className="flex justify-between max-[640px]:flex-col max-[640px]:gap-[20px]">
                <div className="font-[800] text-[30px]">AISHOVEL</div>
                <div className="flex gap-[40px] w-[350px] justify-between max-[500px]:flex-wrap max-[500px]:w-fit">
                    <div className='flex flex-col gap-[5px]'>
                    <span className='font-[600]'>About us</span>
                    <ul className='flex flex-col gap-[8px]'>
                        <li className='h-[20px] w-fit text-[12px] hover:border-b-2 cursor-pointer border-white' onClick={()=>router.push('/')}>Home</li>
                        <li className='h-[20px] w-fit text-[12px] hover:border-b-2 cursor-pointer border-white' onClick={()=>router.push('/?scroll=tujuan')}>Mission</li>
                        <li className='h-[20px] w-fit text-[12px] hover:border-b-2 cursor-pointer border-white' onClick={()=>router.push('/?scroll=news')}>News</li>
                    </ul>

                    </div>
                    <div className='flex flex-col gap-[5px]'>
                    <span className='font-[600]'>Support</span>
                    <ul className='flex flex-col gap-[8px]'>
                        <li className='h-[20px] w-fit text-[12px] hover:border-b-2 cursor-pointer border-white'>Contact</li>
                        <li className='h-[20px] w-fit text-[12px] hover:border-b-2 cursor-pointer border-white' onClick={()=>router.push('/?scroll=faq')}>FAQs</li>
                    </ul>

                    </div>
                    <div className='flex flex-col gap-[5px]'>
                    <span className='font-[600]'>Sosial</span>
                    <ul className='flex flex-col gap-[8px]'>
                        <li className='h-[20px] w-fit text-[12px] hover:border-b-2 cursor-pointer border-white'>Instagram</li>
                        <li className='h-[20px] w-fit text-[12px] hover:border-b-2 cursor-pointer border-white'>Linkedin</li>
                    </ul>

                    </div>
                    <span className="text-[12px] cursor-pointer hover:border-b-2 border-white flex items-end min-[500px]:hidden" onClick={handleClick}>Back to top</span>
                </div>
                </div>
                <div className="flex justify-between border-t-[1px] pt-[10px] max-[500px]:mt-[20px]">
                <div>
                    <span className='text-[12px]'>Copyright @aishovel 2025</span>
                    <span className="ml-[30px] text-[12px]">Terms of Service</span>
                </div>
                <span className="ml-[30px] text-[12px] cursor-pointer hover:border-b-2 border-white max-[500px]:hidden" onClick={handleClick}>Back to top</span>
                </div>
            </div>
        )
}

export default FooterCompo