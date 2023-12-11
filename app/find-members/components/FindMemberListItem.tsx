'use client';

import { formatDate } from '@/app/utils/formatDate';
import { useRouter } from 'next/navigation';
import React from 'react';

// findMemberPost 객체의 타입 정의
interface FindMemberPost {
  fid: string;
  title: string;
  author: string;
  created_at: string;
}

interface FindMemberItemProps {
  findMemberPost: FindMemberPost;
}

export default function FindMemberListItem({
  findMemberPost,
}: FindMemberItemProps) {
  const router = useRouter();

  return (
    <tr
      className='border-b dark:border-gray-700 text-xs text-center cursor-pointer hover:bg-gray-50 focus:bg-gray-50'
      onClick={() => {
        router.push(`find-members/${findMemberPost.fid}`);
      }}
    >
      <th
        scope='row'
        className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        {findMemberPost.fid}
      </th>
      <td className='hover:underline focus:underline'>
        {findMemberPost.title}
      </td>
      <td className='font-medium'>{findMemberPost.author}</td>
      <td className='font-medium'>
        <span className='text-red-500 '>
          {formatDate(findMemberPost.created_at)}
        </span>
      </td>
    </tr>
  );
}
