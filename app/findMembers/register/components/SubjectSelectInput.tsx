'use client';

import { Label } from 'flowbite-react';

export default function SubjectSelectInput() {
  return (
    <div className='max-w-md' id='select'>
      <div className='ml-1 mb-1 block'>
        <Label htmlFor='countries' value='교과목명' />
      </div>
      <select className='pl-[0.6rem] py-1 rounded-sm bg-[#f7f9fa] border-[#c7cbd2] text-sm'>
        <option>-</option>
        <option>데이터베이스시스템</option>
        <option>알고리즘</option>
        <option>소프트웨어공학</option>
        <option>인공지능</option>
        <option>펌웨어프로그래밍</option>
      </select>
    </div>
  );
}
