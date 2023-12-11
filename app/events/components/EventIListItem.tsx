'use client';

import { formatDate } from '@/app/utils/formatDate';
import { useRouter } from 'next/navigation';
import React from 'react';

// eventPost 객체의 타입 정의
interface EventPost {
  eid: string;
  title: string;
  author: string;
  created_at: string;
}

interface EventPostItemProps {
  eventPost: EventPost;
}

export default function EventListItem({ eventPost }: EventPostItemProps) {
  const router = useRouter();

  return (
    <tr
      className='border-b dark:border-gray-700 text-xs text-center cursor-pointer hover:bg-gray-50 focus:bg-gray-50'
      onClick={() => {
        router.push(`/events/${eventPost.eid}`);
      }}
    >
      <th
        scope='row'
        className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
        style={{ textDecoration: 'none' }}
      >
        {eventPost.eid}
      </th>
      <td className='hover:underline focus:underline'>{eventPost.title}</td>
      <td className='font-medium'>{eventPost.author}</td>
      <td className='font-medium'>
        <span className='text-red-500 '>
          {formatDate(eventPost.created_at)}
        </span>
      </td>
    </tr>
  );
}
