'use client';

import React, { useState } from 'react';

export default function ProfInfo() {
  const [isLabIntroTextFullVisible, setIsLabIntroTextFullVisible] =
    useState(false);

  const handleLabIntroTextClick = () => {
    setIsLabIntroTextFullVisible(!isLabIntroTextFullVisible);
  };

  return (
    <div className='flex gap-4 border rounded-sm p-5 bg-gray-50 shadow-md'>
      <img
        src='/images/professors/홍장의.jpg'
        alt='profile_image'
        className='h-[9rem] rounded-sm shadow-lg'
      />
      <div className='mt-1'>
        <div className='flex items-center gap-1'>
          <span className='text-lg font-bold'>홍장의</span>
          <span className='text-[17px] font-light text-gray-500 pb-[1px]'>
            교수
          </span>
        </div>
        <div className='flex flex-col mt-3 gap-[0.325rem]'>
          <div className='flex'>
            <span className='w-[4.75rem] text-sm font-semibold'>학력</span>
            <span className='font-light'>KAIST</span>
          </div>
          <div className='flex'>
            <span className='w-[4.75rem] text-sm font-semibold'>연구분야</span>
            <span className='font-light'>소프트웨어공학</span>
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
              소프트웨어 개발, 운영, 및 관리 활동에 체계적이고 정량적인
              엔지니어링을 개발하고 적용하는 분야에서 고품질의 소프트웨어와
              서비스를 개발하기 위한 최고의 소프트웨어 엔지니어 그룹입니다.
            </span>
          </div>
          <div className='flex'>
            <span className='w-[4.75rem] text-sm font-semibold'>교수실</span>
            <span className='font-light'>
              {' '}
              <a
                href='tel:+820432612261'
                className='cursor-pointer hover:underline '
              >
                261-2261
              </a>{' '}
              / S4-1 320
            </span>
          </div>
          <div className='flex'>
            <span className='w-[4.75rem] text-sm font-semibold'>이메일</span>
            <a
              href='mailto:jehong@chungbuk.ac.kr'
              className='font-light text-blue-500 cursor-pointer hover:underline'
            >
              jehong@chungbuk.ac.kr
            </a>
          </div>
        </div>
      </div>
      <a href='http://selab.chungbuk.ac.kr/main/' target='_blank'>
        <img
          src='/images/icons/home_page.png'
          alt='profile_image'
          className='w-[1.5rem] h-[1.5rem] ml-auto cursor-pointer'
        />
      </a>
    </div>
  );
}
