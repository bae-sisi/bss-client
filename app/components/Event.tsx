import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Event() {
  return (
    <div className='relative flex flex-col gap-4 bg-[#f7f7f7] p-3 group'>
      <p className='font-bold'>
        <Link
          href='/events/645f82d1dfc11e0020d07253'
          className='hover:underline'
        >
          2023학년도 졸업작품전시회(캡스톤디자인전시회)일정 및 작품소개서 제출
          안내(~10/17)
        </Link>
      </p>
      <div className='flex flex-col 3xs:inline-block'>
        <span className='text-xs'>
          <span className='font-semibold'>작성일</span> :{' '}
          <span className='font-light'>2023.06.26. 03:00</span>
        </span>
      </div>
      <div className='absolute right-0 bottom-0 border-l-[0.6rem] border-l-[#eee] border-t-[0.6rem] border-t-[#eee] border-b-[0.6rem] border-b-white border-r-[0.6rem] border-r-white group-hover:border-l-[#3274ba] group-hover:border-t-[#3274ba] ease-in duration-100'></div>
    </div>
  );
}
