'use client'
import React,{useEffect, useState} from 'react'
import Navbar from '@/app/navbar/navbar'
import {getSearch} from './backend'
import FooterCompo from '../component/footer-compo'

const Search = () => {
  const [data, setData] = useState<Property[] | []>([]);
  const [inputSearch, setInputSearch] = useState('');
  const [page, setPage] = useState(1);
  const filteredData = data.filter((item) =>
      item.nama.toLowerCase().includes(inputSearch.toLowerCase())
    );
  const pagination = Array.from({ length: Math.ceil(filteredData.length / 6) }, (_, i) => filteredData.slice(i * 6, (i + 1) * 6));
  useEffect(() => {
    getSearch().then((value : Property[] | null) => {
      if (!value) return;
      setData(value);
    })
  })
  interface Property {
    id: number;
    nama: string;
    quote: string;
    kategori: string;
  }
  return (
    <>
    <div>
      <main
        className="flex flex-col row-start-2 items-center sm:items-start"
              style={{
                backgroundImage: "url('/detail/background/main-background.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                minHeight: "100vh",
        }}>
          <Navbar page={false}/>
          <div className="flex flex-col h-full pt-[80px] w-full px-[100px]">
            <div className='flex flex-row gap-[20px] w-full justify-center mt-[40px]'>
              <div className='bg-white shadow-md rounded-2xl w-full max-w-[700px] h-[50px] px-[20px] flex'>
                <input type="text" className='w-full focus:outline-none' placeholder='Search'
                value={inputSearch}
                onChange={(e) => {
                  setInputSearch(e.target.value);
                }}/>
              </div>
              <div className='bg-white shadow-md rounded-2xl w-[300px] h-[50px] flex px-[20px]'>
                <InputDropdown />
              </div>
            </div>
            <div className='flex flex-col w-full h-[90vh] justify-between'>
              <div className='flex flex-row gap-[20px] w-full max-w-[1200px] mx-auto justify-center flex-wrap'>
                {pagination[page - 1] &&
                  pagination[page - 1].map((item, index) => (
                    <div key={index} className='bg-white shadow-md rounded-2xl h-[220px] flex w-[300px] flex-col items-center mt-[40px] cursor-pointer' onClick={() => window.location.href = `/detail/${item?.id}`}>
                      <div className='rounded-t-2xl bg-gray-300 w-[300px] h-[130px]'></div>
                      <div className='h-auto w-full py-[10px] px-[20px]'>
                        <div className='flex justify-between gap-[20px]'>
                          <span className='font-[500] not-hover:truncate hover:underline decoration-1 underline-offset-[2px]'>{item?.nama}</span>
                          <span className='font-[300] text-[#636363] text-[12px]'>{item?.kategori}</span>
                        </div>
                        <p className='text-[10px] font-[300] text-[#808080]'>{item?.quote}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='flex h-[100px] w-full justify-center items-center gap-[30px] '>
                  <div className="z-10">
                    <button onClick={() =>page> 1 ? setPage(page-1) : setPage(page)} className={`${page> 1 ? 'opacity-100 cursor-pointer' : 'opacity-0'} px-3 py-3 rounded cursor-pointer hover:bg-gray-200`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                        <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                <div className='w-fit overflow-hidden relative flex justify-center cursor-pointer' onClick={() => setPage(page-1)}>
                  {pagination.length > 1 && (page - 1) != 0 && (page - 1)}
                </div>
                <div className='w-fit overflow-hidden relative flex justify-center'>
                  {pagination.length > 1 && page}
                </div>
                <div className='w-fit overflow-hidden relative flex justify-center cursor-pointer' onClick={() => setPage(page+1)}>
                  {pagination.length > 1 && (page+1) <= pagination.length && (page+1)}
                </div>
                  <div className="z-10">
                    <button onClick={() => page< pagination.length ? setPage(page+1) : setPage(page)} className={`${page< pagination.length ? 'opacity-100 cursor-pointer' : 'opacity-0'} px-3 py-3 rounded hover:bg-gray-200`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
              </div>
            </div>
          </div>
      </main>
      <footer>
        <FooterCompo/>
      </footer>
    </div>
    </>
  )
}

const options = ['General', 'Game'];

function InputDropdown() {
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const filteredOptions = options.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isValid = options.some(
        (item) => item.toLowerCase() === inputValue.trim().toLowerCase()
      );
      if (!isValid) {
        if (filteredOptions.length > 0) {
          setInputValue(filteredOptions[0]);
        }
        else{
          setInputValue('');
        }
        
      }
      setShowDropdown(false);
    }
  };

    return (
      <div className="relative w-full">
        <input
          type="text"
          className="w-full focus:outline-none h-full"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowDropdown(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => {
            // Delay sedikit agar klik di dropdown keburu tereksekusi
            setTimeout(() => setShowDropdown(false), 100);
          }}
          placeholder="Kategori"
        />

        {showDropdown && filteredOptions.length > 0 && (
          <ul className="absolute w-full rounded-b shadow-md max-h-60 overflow-auto bg-[#fbfbfb]">
            {filteredOptions.map((item, index) => (
              <li
                key={index}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => {
                  setInputValue(item);
                  setShowDropdown(false);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

export default Search