'use client';

import Loading from '@/app/loading';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);

export default function FindMemeberDetail() {
  const [isExamPostReady, setIsExamPostReady] = useState(false);
  const [isMarkdownPreviewReady, setIsMarkdownPreviewReady] = useState(false);
  const router = useRouter();

  const handleDeleteExam = () => {
    let userResponse = confirm('현재 팀원모집 게시글을 삭제하시겠습니까?');
    if (!userResponse) return;
    alert('게시글을 삭제하였습니다.');
    router.push('/findMembers');
  };

  useEffect(() => {
    setIsMarkdownPreviewReady(true);
    setIsExamPostReady(true);
  }, []);

  return isExamPostReady && isMarkdownPreviewReady ? (
    <div className='mt-6 mb-24 px-5 2lg:px-0 overflow-x-auto'>
      <div className='flex flex-col w-[60rem] mx-auto'>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-8'>
            <p className='text-2xl font-bold tracking-tight'>
              데이터베이스시스템 팀 프로젝트 팀원 모집
            </p>
            <div className='flex justify-between pb-3 border-b border-gray-300'>
              <div className='flex gap-2'>
                <span className='font-semibold'>
                  교과목명:{' '}
                  <span className='font-light'>데이터베이스시스템</span>
                </span>
                <span className='relative bottom-[0.055rem] font-thin before:content-["|"]' />
                <span className='font-semibold'>
                  교수명: <span className='font-light'>아지즈</span>
                </span>
                <span className='relative bottom-[0.055rem] font-thin before:content-["|"]' />
                <span className='font-semibold'>
                  모집 기간:
                  {/* <span className="text-red-500 font-bold">
                  {' '}
                  49분 45초 남음
                </span> */}
                  <span className='font-light'>
                    {' '}
                    2023:07:13 17:00 ~ 2023.07.13 18:00{' '}
                    <span className='text-blue-500 font-semibold'>
                      (41분 3초 전)
                    </span>
                  </span>
                  {/* <span className="text-red-500 font-bold"> 종료</span> */}
                </span>
                <span className='relative bottom-[0.055rem] font-thin before:content-["|"]' />
                <span className='font-semibold'>
                  작성일: <span className='font-light'>2023.06.26</span>
                </span>
              </div>
              <div className='flex gap-3'>
                <span className='font-semibold'>
                  작성자: <span className='font-light'>홍길동</span>
                </span>
              </div>
            </div>
          </div>
          <div className='gap-5 border-b mt-8 mb-4 pb-5'>
            <MarkdownPreview
              className='markdown-preview'
              source={`
안녕하세요! "데이터베이스시스템" 교과목에서 팀 프로젝트를 진행하게 되었는데, 열정 있는 팀원 1명을 모집하려고 합니다.

## 📌 모집 조건

- 데이터베이스에 관심이 많은 분
- 팀워크를 중요시하는 분
- 정해진 기한 안에 업무를 완료할 수 있는 분

## 📆 모집 기간

- **모집 시작**: ASAP
- **모집 마감**: [마감일자 입력]

## 📝 연락 방법

- **이메일**: [이메일 주소 입력]
- **디스코드**: [디스코드 닉네임 및 번호 입력]
- 또는 댓글로 관심 표시해주세요!
              `}
            />
          </div>
          <div>
            <div className='flex gap-3 justify-end'>
              <button
                onClick={() => alert('개발 예정')}
                className='flex gap-[0.375rem] items-center text-white bg-[#eba338] px-2 py-[0.4rem] rounded-[0.2rem] font-light focus:bg-[#dc9429] hover:bg-[#dc9429] box-shadow'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='20'
                  viewBox='0 -960 960 960'
                  width='20'
                  fill='white'
                >
                  <path d='M794-666 666-794l42-42q17-17 42.5-16.5T793-835l43 43q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Z' />
                </svg>
                게시글 수정
              </button>
              <button
                onClick={handleDeleteExam}
                className='flex gap-[0.375rem] items-center text-white bg-red-500 px-2 py-[0.4rem] rounded-[0.2rem] font-light focus:bg-[#e14343] hover:bg-[#e14343] box-shadow'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='20'
                  viewBox='0 -960 960 960'
                  width='20'
                  fill='white'
                >
                  <path d='m361-299 119-121 120 121 47-48-119-121 119-121-47-48-120 121-119-121-48 48 120 121-120 121 48 48ZM261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Z' />
                </svg>
                게시글 삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
