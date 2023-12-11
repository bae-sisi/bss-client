'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import ReviewStars from '../../components/ReviewStars';
import { ReviewInfo } from './LectureReviewList';

interface LectureReviewListItemProps {
  id: string;
  item: ReviewInfo;
}

export default function LectureReviewListItem({
  id,
  item,
}: LectureReviewListItemProps) {
  const router = useRouter();

  return (
    <div
      className='flex flex-col gap-1 text-sm cursor-pointer px-2 py-1 h-[7.25rem] rounded-md hover:bg-gray-50 focus:bg-gray-50'
      onClick={() => {
        router.push(`/lectures/${id}/reviews`);
      }}
    >
      <div className='scale-75 mr-auto ml-[-0.9rem]'>
        <ReviewStars totalRate={item.rate} />
      </div>
      <p className='flex items-center gap-3'>
        <span className='text-xs text-[#999]'>{item.enrollSems}</span>
        <div className='flex items-center gap-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='17.5'
            viewBox='0 -960 960 960'
            width='17.5'
            fill='#da463e'
          >
            <path d='M840-640q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14H280v-520l240-238q15-15 35.5-17.5T595-888q19 10 28 28t4 37l-45 183h258Zm-480 34v406h360l120-280v-80H480l54-220-174 174ZM160-120q-33 0-56.5-23.5T80-200v-360q0-33 23.5-56.5T160-640h120v80H160v360h120v80H160Zm200-80v-406 406Z' />
          </svg>
          <span className='text-[#da463e]'>{item.recmndCnt}</span>
        </div>
      </p>
      <p className='overflow-ellipsis overflow-hidden text-overflow-ellipsis line-clamp-2'>
        {item.content}
      </p>
    </div>
  );
}
