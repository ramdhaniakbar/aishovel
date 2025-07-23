'use client'
import React,{useEffect, useState} from 'react'
import Navbar from '@/app/navbar/navbar'
import {getSearch} from './backend'
import FooterCompo from '../component/footer-compo'

const Search = () => {
  const [data, setData] = useState<Property[] | []>([]);
  const [inputSearch, setInputSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // State untuk kategori yang dipilih
  const [page, setPage] = useState(1);
  
  // Filter data berdasarkan search input dan kategori
  const filteredData = data.filter((item) => {
    const matchesSearch = item.nama.toLowerCase().includes(inputSearch.toLowerCase());
    const matchesCategory = selectedCategory === '' || item.kategori.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });
  
  const pagination = Array.from({ length: Math.ceil(filteredData.length / 6) }, (_, i) => filteredData.slice(i * 6, (i + 1) * 6));
  
  // Reset halaman ke 1 ketika filter berubah
  useEffect(() => {
    setPage(1);
  }, [inputSearch, selectedCategory]);
  
  useEffect(() => {
    getSearch().then((value : Property[] | null) => {
      if (!value) return;
      setData(value);
    })
  }, [data]) // Tambahkan dependency array kosong
  
  interface Property {
    id: number;
    nama: string;
    quote: string;
    kategori: string;
    image: string;
  }
  
  // Dapatkan kategori unik dari data
  const getUniqueCategories = () => {
    const categories = data.map(item => item.kategori);
    return [...new Set(categories)];
  };
  
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
          <div className="flex flex-col h-full pt-[80px] w-full px-[100px] max-[640px]:px-[50px]">
            <div className='flex flex-row gap-[20px] w-full justify-center mt-[40px] max-[640px]:flex-col'>
              <div className='bg-white shadow-md rounded-2xl w-full max-w-[700px] h-[50px] px-[20px] flex'>
                <input type="text" className='w-full focus:outline-none' placeholder='Search'
                value={inputSearch}
                onChange={(e) => {
                  setInputSearch(e.target.value);
                }}/>
              </div>
              <div className='bg-white shadow-md rounded-2xl w-[300px] max-[1200px]:w-full h-[50px] flex px-[20px]'>
                <InputDropdown 
                  options={getUniqueCategories()}
                  selectedValue={selectedCategory}
                  onValueChange={setSelectedCategory}
                />
              </div>
            </div>
            <div className='flex flex-col w-full h-[90vh] max-[1200px]:h-fit justify-between'>
              <div className='flex flex-row gap-[20px] w-full max-w-[1200px] mx-auto justify-center flex-wrap'>
                {pagination[page - 1] &&
                  pagination[page - 1].map((item, index) => (
                    <div key={index} className='bg-white shadow-md rounded-2xl h-[220px] flex w-[300px] flex-col items-center mt-[40px] cursor-pointer' onClick={() => window.location.href = `/detail/${item?.id}`}>
                     <div
                          className='rounded-t-2xl w-[300px] h-[130px]'
                          style={{
                            backgroundImage: `url("${item.image}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                          }}
                        ></div>
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
              
              {/* Tampilkan info jika tidak ada data */}
              {filteredData.length === 0 && (
                <div className='flex justify-center items-center h-[300px]'>
                  <p className='text-gray-500'>Tidak ada data yang sesuai dengan pencarian</p>
                </div>
              )}
              
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

interface InputDropdownProps {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

function InputDropdown({ options, selectedValue, onValueChange }: InputDropdownProps) {
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    // Update inputValue ketika selectedValue berubah
    useEffect(() => {
      setInputValue(selectedValue);
    }, [selectedValue]);

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
            onValueChange(filteredOptions[0]);
          } else {
            setInputValue('');
            onValueChange('');
          }
        } else {
          onValueChange(inputValue.trim());
        }
        setShowDropdown(false);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      setShowDropdown(true);
      
      // Jika input kosong, reset filter
      if (value === '') {
        onValueChange('');
      }
    };

    const handleOptionClick = (item: string) => {
      setInputValue(item);
      onValueChange(item);
      setShowDropdown(false);
    };

    const handleClearFilter = () => {
      setInputValue('');
      onValueChange('');
      setShowDropdown(false);
    };

    return (
      <div className="relative w-full">
        <div className="flex items-center w-full h-full">
          <input
            type="text"
            className="w-full focus:outline-none h-full pr-8"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => {
              setTimeout(() => setShowDropdown(false), 100);
            }}
            placeholder="Kategori"
          />
          {/* Tombol clear filter */}
          {selectedValue && (
            <button
              onClick={handleClearFilter}
              className="absolute right-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {showDropdown && filteredOptions.length > 0 && (
          <ul className="absolute w-full rounded-b shadow-md max-h-60 overflow-auto bg-[#fbfbfb] z-20">
            {filteredOptions.map((item, index) => (
              <li
                key={index}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => handleOptionClick(item)}
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