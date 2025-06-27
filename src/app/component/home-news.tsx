import React from 'react'
import Image from 'next/image'

const HomeNews = () => {
  return (
    <div className="flex w-full justify-between mt-[100px] gap-[30px]">
        <div className="max-w-[800px]">
            <Image
            className="rounded-[30px]"
            aria-hidden
            src="/home/component/news.webp"
            alt="News"
            width={800}
            height={800}
            />
            <div className="mt-[100px] bg-[rgba(51,51,51,0.3)] rounded-[20px] p-[40px] backdrop-blur-[3px] text-white gap-[10px] flex flex-col">
            <p className=" text-[18px] font-[600]">
                See Boston Dynamics robots show off seriously impressive dance moves
            </p>
            <p >
                Boston Dynamics robots can climb rough terrain, help doctors and remind humans to maintain social distance protocols in public parks. We just got reminded the sophisticated robots can learn choreography too. 
            </p>
            <p>In a video posted by Boston Dynamics on Tuesday, the company's machines -- Atlas, Spot the dog robot and Handle -- dance in unison to the Contours hit tune Do You Love Me.</p>
            <p>The bots are so good at shaking it on the dance floor it almost feels like you're watching a robot version of the movie Dirty Dancing, which also featured the song. </p>
            <p>"Our whole crew got together to celebrate the start of what we hope will be a happier year: Happy New Year from all of us at Boston Dynamics," the video description says.</p>
            <p>This isn't the first time Boston Dynamics has shown off its robots' sweet dancing moves. The company showcased a video of its Spot robot doing dancing to the song Uptown Funk in 2018.</p>
            <p>Previously, the Atlas robot showed it has gymnastic skills. Atlas, the almost 5-foot humanoid robot can complete a series of somersaults, jumps, twists, and a handstand. It also understands how to navigate through a complex obstacle course.</p>
            </div>
        </div>
        <div className="w-[400px] flex flex-col gap-[20px]">
            {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="relative group rounded-[30px] min-w-[300px] h-[200px] overflow-hidden">
                <div className="absolute inset-0 bg-[url('/home/component/news.webp')] bg-cover bg-center" />
                <div className="absolute inset-0 group-hover:bg-[rgba(51,51,51,0.5)]" />
                <div className="relative z-10 p-[20px] flex items-end h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-[500]">
                    Boston Dynamics robots show off seriously impressive
                </span>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default HomeNews