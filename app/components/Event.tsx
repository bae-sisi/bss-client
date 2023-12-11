import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { formatDate } from '../utils/formatDate';

interface EventInfo {
  sid: string;
  eid: number;
  title: string;
  created_at: string;
  author: string;
  content: string;
}

interface EventProps {
  eventInfo: EventInfo;
}

export default function Event({ eventInfo }: EventProps) {
  return (
    <div className='relative flex flex-col gap-4 bg-[#f7f7f7] p-3 group mb-3'>
      <p className='font-bold'>
        <Link href={`/events/${eventInfo.eid}`} className='hover:underline'>
          {eventInfo.title}
        </Link>
      </p>
      <div className='flex flex-col 3xs:inline-block'>
        <span className='text-xs'>
          <span className='font-semibold'>작성일</span> :{' '}
          <span className='font-light'>{formatDate(eventInfo.created_at)}</span>
        </span>
      </div>
      <div className='absolute right-0 bottom-0 border-l-[0.6rem] border-l-[#eee] border-t-[0.6rem] border-t-[#eee] border-b-[0.6rem] border-b-white border-r-[0.6rem] border-r-white group-hover:border-l-[#3274ba] group-hover:border-t-[#3274ba] ease-in duration-100'></div>
    </div>
  );
}
