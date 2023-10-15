'use client';

import { Label } from 'flowbite-react';
import React, { useState } from 'react';
import SubjectSearchModal from './SubjectSearchModal';

export default function SubjectSearch() {
  const [openSubjectSearchModal, setOpenSubjectSearchModal] = useState<
    string | undefined
  >();

  return (
    <div className='flex items-center gap-3 mr-5'>
      <Label htmlFor='countries' value='개설강좌' />
      <button
        onClick={() => setOpenSubjectSearchModal('default')}
        className='flex gap-1 text-white bg-[#3870e0] px-2 py-[0.175rem] rounded-[0.2rem] font-sm focus:bg-[#3464c2] hover:bg-[#3464c2] box-shadow'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='18'
          viewBox='0 -960 960 960'
          width='18'
          fill='white'
          className='relative top-[0.125rem]'
        >
          <path d='M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z' />
        </svg>
        조회
      </button>

      {openSubjectSearchModal ? (
        <SubjectSearchModal
          openSubjectSearchModal={openSubjectSearchModal}
          setOpenSubjectSearchModal={setOpenSubjectSearchModal}
        />
      ) : null}
    </div>
  );
}
