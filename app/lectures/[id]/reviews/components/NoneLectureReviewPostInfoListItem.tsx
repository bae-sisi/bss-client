import React from 'react';

export default function NoneLectureReviewPostInfoListItem() {
  return (
    <div className='flex flex-col justify-center items-center h-full text-base pb-16'>
      <iframe
        className='w-[3rem] fade-in'
        src='https://lottie.host/embed/07e05d26-860a-481d-bd63-48660f276d37/Vfrk95DPED.json'
      />
      <span className='relative mt-[-1.5rem] font-light text-gray-500'>
        등록된 강의평이 없습니다
      </span>
    </div>
  );
}
