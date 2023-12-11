'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import ReviewStars from './ReviewStars';

// lecturePost 객체의 타입 정의
interface LecturePost {
  progressID: number;
  grade: number;
  year: number;
  profName: string;
  lectureName: string;
  rate: number;
}

interface LecturePostItemProps {
  lecturePost: LecturePost;
}

export default function LectureListItem({ lecturePost }: LecturePostItemProps) {
  const router = useRouter();

  return (
    <tr
      className='border-b dark:border-gray-700 text-xs text-center cursor-pointer hover:bg-gray-50 focus:bg-gray-50'
      onClick={() => {
        router.push(`lectures/${lecturePost.progressID}`);
      }}
    >
      <th
        scope='row'
        className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        {lecturePost.progressID}
      </th>
      <td className='hover:underline focus:underline'>
        {lecturePost.lectureName}
      </td>
      <td className='font-medium'>{lecturePost.profName}</td>
      <td className='font-medium'>
        <span className='text-red-500'>
          <ReviewStars totalRate={lecturePost.rate} />
        </span>
      </td>
    </tr>
  );
}
