import React from 'react';

export default function NoneFindMemeberPostInfoListItem() {
  return (
    <tr className='border-b dark:border-gray-700 text-xs text-center'>
      <th
        scope='row'
        className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        -
      </th>
      <td className='text-sm'>조회된 모집 정보가 없습니다</td>
      <td className='font-medium'>-</td>
      <td className='font-medium'>-</td>
    </tr>
  );
}
