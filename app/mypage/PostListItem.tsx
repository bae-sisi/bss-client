'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { AppDispatch, useAppSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import { storeSelectedPostIds } from '../redux/features/selectedPostForDeleteSlice';

interface PostListItemProps {
  index: number;
}

export default function PostListItem({ index }: PostListItemProps) {
  const selectedPostIds = useAppSelector(
    (state) => state.selectedPostForDeleteSlice.value.selectedPostIds
  );

  const router = useRouter();

  const checkboxRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // selectedPostIds 배열이 비어 있으면 체크박스의 체크를 해제합니다.
    if (selectedPostIds.length === 0 && checkboxRef.current)
      checkboxRef.current.checked = false;
  }, [selectedPostIds]);

  const handleCheckPostListItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    // 체크 될 떄
    if (isChecked) {
      const newSelectedPostIds = [...selectedPostIds, index.toString()];
      dispatch(storeSelectedPostIds({ selectedPostIds: newSelectedPostIds }));
      return;
    }

    // 체크 해제 될 때
    const newSelectedPostIds = selectedPostIds.filter(
      (id) => id !== index.toString()
    );
    dispatch(storeSelectedPostIds({ selectedPostIds: newSelectedPostIds }));
  };

  return (
    <tr className='border-b dark:border-gray-700 text-xs text-center cursor-pointer hover:bg-gray-50 focus:bg-gray-50'>
      <th
        scope='row'
        className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        <input
          type='checkbox'
          className='rounded-sm text-sm w-[0.8rem] h-[0.8rem]'
          ref={checkboxRef}
          onChange={handleCheckPostListItem}
        />
      </th>
      <td>1</td>
      <td
        onClick={() => {
          router.push('events/645f82d1dfc11e0020d07253');
        }}
        className='hover:underline focus:underline'
      >
        2023학년도 졸업작품전시회(캡스톤디자인전시회)일정 및 작품소개서 제출
        안내(~10/17)
      </td>
      <td className='font-medium'>
        <span className='text-red-500 '>2023.06.26</span>
      </td>
    </tr>
  );
}
