import React, { useState } from 'react';
import Image from 'next/image';

const faqs = [
  {
    question: 'Apakah sistem mendukung autentikasi realtime?',
    answer: 'Ya, platform ini terintegrasi penuh dengan Supabase yang memungkinkan proses login dan registrasi berlangsung secara realtime dengan keamanan tingkat enterprise.',
  },
  {
    question: 'Bagaimana prosedur pendaftaran akun?',
    answer: 'Pengguna dapat mengakses formulir pendaftaran melalui tombol "Daftar" di navigation bar. Setelah berhasil mendaftar, Anda dapat langsung menggunakan kredensial (email dan password) untuk mengakses platform. Untuk keperluan demo, mohon gunakan data dummy dan hindari penggunaan informasi pribadi yang sensitif. PENTING! silahkan konfirmasi pendaftaran melalui email anda. Terima kasih.',
  },
  {
    question: 'Apakah platform ini hanya dapat diakses melalui desktop?',
    answer: 'Tidak, platform ini telah dioptimalkan dengan desain responsif yang memastikan pengalaman pengguna yang konsisten di berbagai perangkat, baik desktop, tablet, maupun mobile.',
  },
];

const HomeFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col h-fit pt-[80px] w-full px-[100px] mb-[40px] max-[640px]:px-[50px]" id="faq">
      <span className="text-[30px] font-[600] text-center text-[#242424]">
        Frequently Asked Questions
      </span>

      <div className="flex mt-[100px] justify-center flex-col font-[300] gap-[10px]">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="relative rounded-[20px] bg-white px-[20px] justify-between transition-all duration-300 overflow-hidden"
            style={{
              boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
              maxHeight: openIndex === i ? '400px' : '80px',
            }}
          >
            <div className="h-[50px] max-[800px]:h-[80px] flex items-center justify-between cursor-pointer" onClick={() => toggleFAQ(i)}>
              <span className="font-[500]">{faq.question}</span>
              <Image
                src={openIndex === i ? '/home/component/minus.png' : '/home/component/plus.png'}
                alt="Toggle"
                width={30}
                height={30}
              />
            </div>
            {openIndex === i && (
              <div className="pt-[10px] text-[14px] text-[#333] mb-[20px]">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeFAQ;
