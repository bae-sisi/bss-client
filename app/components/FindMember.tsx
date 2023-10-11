import Link from 'next/link';
import React from 'react';

export default function FindMember() {
  return (
    <div className='relative flex flex-col gap-4 bg-[#f7f7f7] p-3 group'>
      <p className='font-bold'>
        <Link href='/' className='hover:underline'>
          데이터베이스시스템 팀 프로젝트 팀원 모집
        </Link>
      </p>
      <div>
        <span className='text-xs'>
          <span className='font-semibold'>모집 기간</span> :{' '}
          <span className='font-light'>
            2023.06.26. 03:00 ~ 2023.06.26. 03:00
          </span>
        </span>
      </div>
      <div className='mt-[-0.9rem]'>
        <span className='text-xs font-semibold text-blue-600'>#아지즈</span>
        <span className="before:content-['|'] mx-3 font-thin text-[#aaa]"></span>
        <span className='text-xs font-semibold'>데이터베이스시스템</span>
      </div>
      <div className='absolute right-0 bottom-0 border-l-[0.6rem] border-l-[#eee] border-t-[0.6rem] border-t-[#eee] border-b-[0.6rem] border-b-white border-r-[0.6rem] border-r-white group-hover:border-l-[#3274ba] group-hover:border-t-[#3274ba] ease-in duration-100'></div>
    </div>
  );
}
