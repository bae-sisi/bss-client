'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import ReviewStars from './ReviewStars';

export default function LectureListItem() {
  const router = useRouter();

  return (
    <tr
      className='border-b dark:border-gray-700 text-xs text-center cursor-pointer hover:bg-gray-50 focus:bg-gray-50'
      onClick={() => {
        router.push('lectures/645f82d1dfc11e0020d07253');
      }}
    >
      <th
        scope='row'
        className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        1
      </th>
      <td className='hover:underline focus:underline'>데이터베이스시스템</td>
      <td className='font-medium'>나스리디노프 아지즈</td>
      <td className='font-medium'>
        <span className='text-red-500'>
          <ReviewStars />
        </span>
      </td>
    </tr>
  );
}
