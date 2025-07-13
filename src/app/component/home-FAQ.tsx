import React, { useState } from 'react';
import Image from 'next/image';

const faqs = [
  {
    question: 'Apakah AI berbahaya?',
    answer: 'AI bisa berbahaya jika disalahgunakan, tapi dengan regulasi dan etika yang tepat, AI sangat bermanfaat.',
  },
  {
    question: 'Apakah AI bisa menggantikan manusia?',
    answer: 'AI bisa menggantikan beberapa pekerjaan, tapi tidak bisa menggantikan kreativitas, empati, dan intuisi manusia.',
  },
  {
    question: 'Apakah data saya aman dengan AI?',
    answer: 'Keamanan data tergantung dari siapa yang mengelola dan bagaimana AI itu dibangun serta digunakan.',
  },
];

const HomeFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col h-[100vh] pt-[80px] w-full px-[100px]" id="faq">
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
              maxHeight: openIndex === i ? '200px' : '50px',
            }}
          >
            <div className="h-[50px] flex items-center justify-between cursor-pointer" onClick={() => toggleFAQ(i)}>
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
