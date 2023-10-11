'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function Event() {
  const router = useRouter();

  return (
    <tr
      className='border-b dark:border-gray-700 text-xs text-center cursor-pointer hover:bg-gray-50 focus:bg-gray-50'
      onClick={() => {
        router.push('events/645f82d1dfc11e0020d07253');
      }}
    >
      <th
        scope='row'
        className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        1
      </th>
      <td className=''>
        2023학년도 졸업작품전시회(캡스톤디자인전시회)일정 및 작품소개서 제출
        안내(~10/17)
      </td>
      <td className='font-medium'>홍길동</td>
      <td className='font-medium'>
        <span className='text-red-500 '>2023.06.26</span>
      </td>
    </tr>
  );
}
