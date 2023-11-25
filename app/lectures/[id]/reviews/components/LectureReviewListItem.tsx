import ReviewStars from '@/app/lectures/components/ReviewStars';
import React from 'react';

export default function LectureReviewListItem() {
  const handleLikeLectureReview = () => {
    let userResponse = confirm('이 강의평을 추천하시겠습니까?');
    if (!userResponse) return;
    // DB에 좋아요 기능이 추가되고 좋아요 수 UI가 갱신되어야 함
  };

  return (
    <div className='flex justify-between items-center'>
      <div className='flex flex-col gap-1 text-sm cursor-pointer px-2 py-1 rounded-md hover:bg-gray-50 focus:bg-gray-50 mb-5'>
        <div className='scale-75 mr-auto ml-[-1.175rem]'>
          <ReviewStars />
        </div>
        <p className='flex items-center gap-3'>
          <span className='text-xs text-[#999]'>20년 2학기 수강자</span>
          <div className='flex items-center gap-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='17.5'
              viewBox='0 -960 960 960'
              width='17.5'
              fill='#da463e'
            >
              <path d='M840-640q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14H280v-520l240-238q15-15 35.5-17.5T595-888q19 10 28 28t4 37l-45 183h258Zm-480 34v406h360l120-280v-80H480l54-220-174 174ZM160-120q-33 0-56.5-23.5T80-200v-360q0-33 23.5-56.5T160-640h120v80H160v360h120v80H160Zm200-80v-406 406Z' />
            </svg>
            <span className='text-[#da463e]'>6</span>
          </div>
        </p>
        <p>
          강의는 편해서 좋았습니다. 중간은 시험, 기말은 영어 발표 열심히 하시면
          좋습니다.
        </p>
      </div>

      <button
        onClick={handleLikeLectureReview}
        className='flex items-center gap-2 mr-9 text-[#777] bg-[#eee] px-2 py-[0.4rem] rounded-[0.2rem]  focus:bg-[#dedede] hover:bg-[#dedede] box-shadow'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 -960 960 960'
          width='20'
          fill='#666'
        >
          <path d='M840-640q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14H280v-520l240-238q15-15 35.5-17.5T595-888q19 10 28 28t4 37l-45 183h258Zm-480 34v406h360l120-280v-80H480l54-220-174 174ZM160-120q-33 0-56.5-23.5T80-200v-360q0-33 23.5-56.5T160-640h120v80H160v360h120v80H160Zm200-80v-406 406Z' />
        </svg>
        추천
      </button>
    </div>
  );
}
