'use client'
import React from 'react'
import Image from "next/image";
import { useEffect, useState } from "react";

const CardAnimation = () => {
    const classSets = [
        ['transform translate-x-[-100px] z-[5]', 'transform translate-x-0 z-[10] scale-120', 'transform translate-x-[100px] z-[5]'],
        ['transform translate-x-0 z-[10] scale-120', 'transform translate-x-[100px] z-[5]', 'transform translate-x-[-100px] z-[5]'],
        ['transform translate-x-[100px] z-[5]', 'transform translate-x-[-100px] z-[5]', 'transform translate-x-0 z-[10] scale-120'],
    ];

    const texts = [
        "Cari tahu kecerdasan buatan apa saja yang telah lahir demi membantu kegiatan manusia.",
        "Pelajari logika cara AI bekerja dan cara sebuah AI memberikan manfaat.",
        "Coba gunakan AI sekarang juga.",
    ];

    const [index, setIndex] = useState(0);         // Untuk animasi image
    const [textIndex, setTextIndex] = useState(0); // Untuk teks aktif
    const [charIndex, setCharIndex] = useState(0); // Untuk ketik per huruf
    const [displayedText, setDisplayedText] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const interval_anim = setInterval(() => {
        setIndex((prev) => (prev + 1) % classSets.length);
        setTextIndex((prev) => (prev + 1) % texts.length); // ganti teks juga
        setDisplayedText(''); // reset teks
        setCharIndex(0);      // reset index ketikan
        }, 10000);

        const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
        }, 500);

        return () => {
        clearInterval(interval_anim);
        clearInterval(cursorInterval);
        };
    }, []);

    useEffect(() => {
        if (charIndex < texts[textIndex].length) {
        const typingTimeout = setTimeout(() => {
            setDisplayedText((prev) => prev + texts[textIndex][charIndex]);
            setCharIndex((prev) => prev + 1);
        }, 50);
        return () => clearTimeout(typingTimeout);
        }
    }, [charIndex, textIndex]);

    return (
        <div className="flex justify-center items-center m-auto flex-col">
        <div className="flex justify-center items-center flex-row gap-[20px] h-[300px] relative">
            <Image
            className={`${classSets[index][0]} absolute transition-all duration-700 ease-in-out`}
            src="/home/component/flow.png"
            alt="flow"
            width={200}
            height={200}
            />
            <Image
            className={`${classSets[index][1]} absolute transition-all duration-700 ease-in-out`}
            src="/home/component/search.png"
            alt="search"
            width={200}
            height={200}
            />
            <Image
            className={`${classSets[index][2]} transition-all duration-700 ease-in-out`}
            src="/home/component/demo.png"
            alt="demo"
            width={200}
            height={200}
            />
        </div>

        <p className="text-center w-[400px] text-[16px] font-[300] text-[#4E6688] mt-4">
            {displayedText}
            <span>{showCursor ? '|' : ' '}</span>
        </p>
    </div>
  );
};


export default CardAnimation