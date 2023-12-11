import Link from 'next/link';
import React from 'react';
import { formatDateTime } from '../utils/formatDate';

interface FindMemberInfo {
  sid: string;
  fid: number;
  title: string;
  end_date: string;
  created_at: string;
  author: string;
  content: string;
  stack: number;
  lecture_name: string;
  author_email: string;
  prof_name: string;
}

interface FindMemberProps {
  findMemberInfo: FindMemberInfo;
}

export default function FindMember({ findMemberInfo }: FindMemberProps) {
  return (
    <div className='relative flex flex-col gap-4 bg-[#f7f7f7] p-3 group mb-3'>
      <p className='font-bold'>
        <Link
          href={`/find-members/${findMemberInfo.fid}`}
          className='hover:underline'
        >
          {findMemberInfo.title}
        </Link>
      </p>
      <div>
        <span className='text-xs'>
          <span className='font-semibold'>모집 종료 기간</span> :{' '}
          <span className='font-light'>
            {formatDateTime(findMemberInfo.end_date)}
          </span>
        </span>
      </div>
      <div className='mt-[-0.9rem]'>
        <span className='text-xs font-semibold text-blue-600'>
          #{findMemberInfo.prof_name}
        </span>
        <span className="before:content-['|'] mx-3 font-thin text-[#aaa]"></span>
        <span className='text-xs font-semibold'>
          {findMemberInfo.lecture_name}
        </span>
      </div>
      <div className='absolute right-0 bottom-0 border-l-[0.6rem] border-l-[#eee] border-t-[0.6rem] border-t-[#eee] border-b-[0.6rem] border-b-white border-r-[0.6rem] border-r-white group-hover:border-l-[#3274ba] group-hover:border-t-[#3274ba] ease-in duration-100'></div>
    </div>
  );
}
