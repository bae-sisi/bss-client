import React from 'react';

export default function NonePostInfoListItem() {
  return (
    <tr className='border-b dark:border-gray-700 text-xs text-center'>
      <th
        scope='row'
        className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      ></th>
      <td className='text-sm'>작성된 게시물이 존재하지 않습니다</td>
      <td className='font-medium'>-</td>
      <td className='font-medium'>-</td>
    </tr>
  );
}
