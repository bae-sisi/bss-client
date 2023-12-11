'use client';

import React, { useState } from 'react';

interface ProfInfo {
  name: string;
  office: string;
  phone: string;
  major: string;
  email: string;
  pid: number;
  isOfficial: boolean;
  labIntro: string;
  eduBackground: string;
  labUrl: string;
}

interface ProfInfoProps {
  profInfo: ProfInfo;
}

export default function ProfInfo({ profInfo }: ProfInfoProps) {
  const [isLabIntroTextFullVisible, setIsLabIntroTextFullVisible] =
    useState(false);

  const handleLabIntroTextClick = () => {
    setIsLabIntroTextFullVisible(!isLabIntroTextFullVisible);
  };

  return (
    <div className='flex gap-4 border rounded-sm p-5 bg-gray-50 shadow-md'>
      <img
        src={`/api/prof/${profInfo.name}/profileImg`}
        alt='profile_image'
        className='h-[9rem] rounded-sm shadow-lg'
      />
      <div className='mt-1'>
        <div className='flex items-center gap-1'>
          <span className='text-lg font-bold'>{profInfo.name}</span>
          <span className='text-[17px] font-light text-gray-500 pb-[1px]'>
            교수
          </span>
        </div>
        <div className='flex flex-col mt-3 gap-[0.325rem]'>
          <div className='flex'>
            <span className='w-[4.75rem] text-sm font-semibold'>학력</span>
            <span className='font-light'>{profInfo.eduBackground}</span>
          </div>
          <div className='flex'>
            <span className='w-[4.75rem] text-sm font-semibold'>연구분야</span>
            <span className='font-light'>{profInfo.major}</span>
          </div>
          <div className='flex'>
            <span className='w-[4.75rem] text-sm font-semibold'>연구실</span>
            <span
              onClick={handleLabIntroTextClick}
              className={`w-[11.5rem] text-xs overflow-hidden ${
                isLabIntroTextFullVisible
                  ? 'whitespace-normal h-auto'
                  : 'lab-intro-text-overflow-ellipsis whitespace-normal h-8 leading-4'
              } cursor-pointer hover:underline`}
            >
              {profInfo.labIntro}
            </span>
          </div>
          <div className='flex'>
            <span className='w-[4.75rem] text-sm font-semibold'>교수실</span>
            <span className='font-light'>
              {' '}
              <a
                href={`tel:+82${profInfo.phone}`}
                className='cursor-pointer hover:underline '
              >
                {profInfo.phone}
              </a>{' '}
              / {profInfo.office}
            </span>
          </div>
          <div className='flex'>
            <span className='w-[4.75rem] text-sm font-semibold'>이메일</span>
            <a
              href={`mailto:${profInfo.email}`}
              className='font-light text-blue-500 cursor-pointer hover:underline'
            >
              {profInfo.email}
            </a>
          </div>
        </div>
      </div>
      {profInfo.labUrl ? (
        <a href={`${profInfo.labUrl}`} target='_blank'>
          <img
            src='/images/icons/home_page.png'
            alt='profile_image'
            className='w-[1.5rem] h-[1.5rem] ml-auto cursor-pointer'
          />
        </a>
      ) : (
        <img
          src='/images/icons/home_page_none.png'
          alt='profile_image'
          className='w-[1.5rem] h-[1.5rem] ml-auto'
        />
      )}
    </div>
  );
}
