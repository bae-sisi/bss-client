'use client';

import { Label, Select } from 'flowbite-react';

export default function ProfNameSelectInput() {
  return (
    <div className='max-w-md' id='select'>
      <div className='ml-1 mb-1 block'>
        <Label htmlFor='countries' value='교수명' />
      </div>
      <select className='pl-[0.6rem]  py-1 rounded-sm bg-[#f7f9fa] border-[#c7cbd2] text-sm'>
        <option>-</option>
        <option>아지즈</option>
        <option>김저훈</option>
        <option>홍장의</option>
        <option>정지훈</option>
      </select>
    </div>
  );
}
