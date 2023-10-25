'use client';

import Loading from '@/app/loading';
import { useAppSelector } from '@/app/redux/store';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

export default function EditEvent() {
  const eventPostInfo = {
    title: '데이터베이스시스템 팀 프로젝트 팀원 모집',
    content: `## 1. 졸업작품 전시회
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

**문의사항**: 소프트웨어학과 사무실 오정은 조교 (043-261-2260)`,
  };

  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);
  const uid = useAppSelector((state) => state.authReducer.value.uid);

  const [isEditorReady, setIsEditorReady] = useState(false);
  const [title, setTitle] = useState(eventPostInfo.title);
  const [isTitleValidFail, setIsTitleValidFail] = useState(false);
  const [editorValue, setEditorValue] = useState(eventPostInfo.content);

  const titleRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push('/login');
      return;
    }

    if (uid !== '222') {
      alert('접근 권한이 없습니다');
      router.back();
      return;
    }

    setIsEditorReady(true);
  }, [isAuth, router, uid]);

  const handleEditorChange = useCallback((value?: string) => {
    setEditorValue(value || '');
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsTitleValidFail(false);
  };

  const handleCancelEventEdit = () => {
    const confirmResponse = confirm('수정을 취소하시겠습니까?');
    if (!confirmResponse) return;

    router.back();
  };

  const handleEditEventPost = () => {
    if (!title) {
      alert('제목을 입력해 주세요');
      window.scrollTo(0, 0);
      titleRef.current?.focus();
      setIsTitleValidFail(true);
      return;
    }

    if (!editorValue) {
      alert('본문을 입력해 주세요');
      window.scrollTo(0, 0);
      return;
    }

    // 임시 게시글로 이동(작성 게시물로 이동해야 함)
    router.push('/events/645f82d1dfc11e0020d07253');
  };

  return isEditorReady ? (
    <div className='mt-2 px-5 2lg:px-0 overflow-x-auto'>
      <div className='flex flex-col w-[60rem] mx-auto'>
        <p className='text-2xl font-semibold'>행사 등록</p>

        <div className='flex gap-5 mt-5 mb-8'>
          <div className='flex flex-col relative z-0 w-2/5 group'>
            <input
              type='text'
              name='floating_first_name'
              className={`block pt-3 pb-[0.175rem] pl-0 pr-0 w-full font-normal text-gray-900 bg-transparent border-0 border-b border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-${
                isTitleValidFail ? 'red' : 'blue'
              }-500 focus:outline-none focus:ring-0 focus:border-${
                isTitleValidFail ? 'red' : 'blue'
              }-600 peer`}
              placeholder=' '
              required
              value={title}
              ref={titleRef}
              onChange={handleTitleChange}
            />
            <label
              htmlFor='floating_first_name'
              className={`peer-focus:font-light absolute text-base left-[0.1rem] font-light text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-[0.1rem] peer-focus:text-${
                isTitleValidFail ? 'red' : 'blue'
              }-600 peer-focus:dark:text-${
                isTitleValidFail ? 'red' : 'blue'
              }-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[1.25rem]`}
            >
              제목
            </label>
            <p
              className={`text-${
                isTitleValidFail ? 'red' : 'gray'
              }-500 text-xs tracking-widest font-light mt-1`}
            >
              제목을 입력해 주세요
            </p>
          </div>
        </div>

        <div className='w-full mx-auto overflow-auto'>
          <MDEditor
            autoFocus
            value={editorValue}
            onChange={handleEditorChange}
            height={500}
            className='md-editor'
          />
        </div>

        <div className='mt-8 pb-2 flex justify-end gap-3'>
          <button
            onClick={handleCancelEventEdit}
            className=' px-4 py-[0.4rem] rounded-[0.2rem] font-light'
          >
            취소
          </button>
          <button
            onClick={handleEditEventPost}
            className=' text-white bg-[#3870e0] px-4 py-[0.4rem] rounded-[0.2rem] font-light focus:bg-[#3464c2] hover:bg-[#3464c2] box-shadow'
          >
            수정
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
