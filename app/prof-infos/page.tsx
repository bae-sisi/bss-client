import React from 'react';
import ProfInfo from './components/ProfInfo';

export default function ProfInfos() {
  return (
    <div className='mt-2 px-5 2lg:px-0 overflow-x-auto'>
      <div className='flex flex-col w-[60rem] mx-auto'>
        <p className='flex items-center gap-3'>
          <img
            src='/images/icons/person_flag.png'
            alt='logo'
            style={{ width: '47.5px' }}
          />
          <span className='text-2xl font-semibold'>교수 정보</span>
        </p>
        <div className='mt-10 mb-10 grid grid-cols-2 gap-7'>
          <ProfInfo />
          <ProfInfo />
          <ProfInfo />
          <ProfInfo />
          <ProfInfo />
          <ProfInfo />
          <ProfInfo />
          <ProfInfo />
        </div>
      </div>
    </div>
  );
}
