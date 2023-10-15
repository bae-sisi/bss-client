import React from 'react';

export default function NoneSearchedSubjectInfoListItem() {
  return (
    <tr className='dark:border-gray-700 text-xs text-center'>
      <th
        scope='row'
        className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        1
      </th>
      <td>조회된 교과목 정보가 없습니다</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    </tr>
  );
}
