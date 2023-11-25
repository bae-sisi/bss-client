'use client';

import Loading from '@/app/loading';
import { useAppSelector } from '@/app/redux/store';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);

export default function EventDetail() {
  const [isEventPostReady, setIsEventPostReady] = useState(false);
  const [isMarkdownPreviewReady, setIsMarkdownPreviewReady] = useState(false);

  const uid = useAppSelector((state) => state.authReducer.value.uid);
  const isAdmin = useAppSelector((state) => state.authReducer.value.isAdmin);

  const router = useRouter();

  const handleDeleteEventPost = () => {
    let userResponse = confirm('게시글을 삭제하시겠습니까?');
    if (!userResponse) return;
    alert('게시글을 삭제하였습니다');
    router.push('/events');
  };

  const handleEditEventPost = () => {
    router.push(`/events/${'645f82d1dfc11e0020d07253'}/edit`);
  };

  useEffect(() => {
    setIsMarkdownPreviewReady(true);
    setIsEventPostReady(true);
  }, []);

  return isEventPostReady && isMarkdownPreviewReady ? (
    <div className='mt-6 mb-24 px-5 2lg:px-0 overflow-x-auto'>
      <div className='flex flex-col w-[60rem] mx-auto'>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-8'>
            <p className='text-2xl font-bold tracking-tight'>
              2023학년도 졸업작품전시회(캡스톤디자인전시회)일정 및 작품소개서
              제출 안내(~10/17)
            </p>
            <div className='flex justify-between pb-3 border-b border-gray-300'>
              <div className='flex gap-3'>
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
## 1. 졸업작품 전시회
- **일시**: 2022. 11. 3(금) (9-18시)
- **장소**: 개신문화관 1층
- _자세한 일정이 확정되면 추후 공지 예정_

## 2. 제출서류

- **최종본 제출기한**: 2023.10.17.(화) (_*기한 엄수_)
- 작품소개서 및 작품포스터를 지도교수님께 검토받아 10월 17일까지 comdpt@cbnu.ac.kr(오정은 조교) 메일로 제출해 주시기 바랍니다.
  - 메일 제출 제목 형식: \`[팀번호]_졸업작품 포스터 및 소개서 제출\`
- 작년 샘플자료도 함께 업로드하니 참고하여 작성하기 바랍니다.

### (1) 작품소개서

- **작성방법**: "2023졸업작품전시회_작품소개서양식"을 다운받아 팀별 작성
- **제출방법**: 메일 제출, comdpt@cbnu.ac.kr(오정은 조교)
  - 파일명: \`[팀번호]_작품제목_작품소개서\` 예: [01-01]_IoT실내환기알람시스템_작품소개서

### (2) 작품포스터

- **작성방법**: PPT 파일, A2 size (420mm * 594mm)
  - 사이즈 확인하세요! 작게 만들면 나중에 출력할 때 깨져서 사용이 어렵습니다.
- **제작방법**:
  - 자유 양식이지만 다음 사항을 포함시킬 것.
  - 작품명
  - 지도교수 및 팀명(팀원)
  - 개발 목적
  - 구성도: 작품을 한눈에 파악할 수 있는 그림 또는 구성도/개념도, 주요기능, 적용기술
  - 기대 효과 및 활용 분야
- **제출방법**: 메일 제출, comdpt@cbnu.ac.kr(오정은 조교)
  - 파일명: \`[팀번호]_작품제목_작품포스터\` 예: [01-01]_IoT실내환기알람시스템_작품포스터

### (3) 작품전시 준비사항 제출 안내

- 각 팀장이 이메일로 제출: 팀장명, 팀번호, 작품 구현에 필요한 랜선 개수 및 콘센트 개수 회신 (예: 홍길동, 01-01, 랜선 1개, 콘센트 3구 2개)
- 기타 필요한 사항을 메일로 회신
- 제출기한 및 방법: comdpt@cbnu.ac.kr 로 10/17(화) 까지 메일 회신
- 미회신시 발생하는 문제에 대하여 책임지지 않음.

## 3. 팀별 작품 셋팅 일정

_자세한 일정이 확정되면 추후 공지 예정_

**문의사항**: 소프트웨어학과 사무실 오정은 조교 (043-261-2260)
              `}
            />
          </div>

          {uid === '222' || isAdmin ? (
            <div className='flex gap-3 justify-end'>
              {uid === '222' ? (
                <button
                  onClick={handleEditEventPost}
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
              ) : null}

              <button
                onClick={handleDeleteEventPost}
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
          ) : null}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
