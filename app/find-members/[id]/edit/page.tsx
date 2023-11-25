'use client';

import Loading from '@/app/loading';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Label } from 'flowbite-react';
import SubjectSearch from '../../register/components/SubjectSearch';
import { useAppSelector } from '@/app/redux/store';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

export default function EditFindMemeber() {
  const findMemberPostInfo = {
    title: '데이터베이스시스템 팀 프로젝트 팀원 모집',
    subjectName: '데이터베이스시스템',
    profName: '아지즈',
    content: `안녕하세요! "데이터베이스시스템" 교과목에서 팀 프로젝트를 진행하게 되었는데, 열정 있는 팀원 1명을 모집하려고 합니다.

## 📌 모집 조건

- 데이터베이스에 관심이 많은 분
- 팀워크를 중요시하는 분
- 정해진 기한 안에 업무를 완료할 수 있는 분

## 📆 모집 기간

- **모집 시작**: ASAP
- **모집 마감**: [마감일자 입력]

## 📝 연락 방법

- **이메일**: [이메일 주소 입력]
- **디스코드**: [디스코드 닉네임 및 번호 입력]`,
    selectedFindMemberDateTime: {
      startDate: '2023-06-25',
      endDate: '2023-06-28',
    },
  };

  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);
  const uid = useAppSelector((state) => state.authReducer.value.uid);

  const [isEditorReady, setIsEditorReady] = useState(false);
  const [title, setTitle] = useState(findMemberPostInfo.title);
  const [subjectName, setSubjectName] = useState(
    findMemberPostInfo.subjectName
  );
  const [isTitleValidFail, setIsTitleValidFail] = useState(false);
  const [isSubjectInfoValidFail, setIsSubjectInfoValidFail] = useState(false);
  const [profName, setProfName] = useState(findMemberPostInfo.profName);
  const [editorValue, setEditorValue] = useState(findMemberPostInfo.content);
  const [selectedFindMemberDateTime, setSelectedFindMemberDateTime] = useState({
    startDate: new Date(
      findMemberPostInfo.selectedFindMemberDateTime.startDate
    ),
    endDate: new Date(findMemberPostInfo.selectedFindMemberDateTime.endDate),
  });

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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsTitleValidFail(false);
  };

  const handleEditorChange = useCallback((value?: string) => {
    setEditorValue(value || '');
  }, []);

  const handleFindMemberStartDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedFindMemberDateTime((prevState) => ({
      ...prevState,
      startDate: new Date(e.target.value),
    }));
  };

  const handleFindMemberEndDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedFindMemberDateTime((prevState) => ({
      ...prevState,
      endDate: new Date(e.target.value),
    }));
  };

  const handleCancelFindMemberEdit = () => {
    const confirmResponse = confirm('수정을 취소하시겠습니까');
    if (!confirmResponse) return;

    router.push('/find-members');
  };

  const handleEditFindMemberPost = () => {
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
    router.push('/find-members/645f82d1dfc11e0020d07253');
  };

  return isEditorReady ? (
    <div className='mt-2 px-5 2lg:px-0 overflow-x-auto'>
      <div className='flex flex-col w-[60rem] mx-auto'>
        <p className='text-2xl font-semibold'>팀원모집 등록</p>

        <div className='flex flex-col gap-10 mt-5 mb-2'>
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

          <div className='flex flex-col gap-2'>
            <Label
              htmlFor='countries'
              value='교과목 선택'
              className='text-base'
            />
            <div className='flex gap-8 relative border rounded-sm p-3 group bg-slate-50'>
              <SubjectSearch />
              <div className='flex items-center gap-3'>
                <div className='m-1 block'>
                  <Label
                    htmlFor='subjectName'
                    value='교과목명'
                    className={`${
                      isSubjectInfoValidFail ? 'text-red-500' : ''
                    }`}
                  />
                </div>
                <span
                  className={`border text-left min-w-[10rem] px-1 h-[1.4rem] rounded-sm bg-[#f7f9fa] border-${
                    isSubjectInfoValidFail ? 'red-500' : '[#c7cbd2]'
                  } text-sm`}
                >
                  {subjectName}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='m-1 block'>
                  <Label
                    htmlFor='profName'
                    value='교수명'
                    className={`${
                      isSubjectInfoValidFail ? 'text-red-500' : ''
                    }`}
                  />
                </div>
                <span
                  className={`border text-left min-w-[6rem] px-1 h-[1.4rem] rounded-sm bg-[#f7f9fa] border-${
                    isSubjectInfoValidFail ? 'red-500' : '[#c7cbd2]'
                  } text-sm`}
                >
                  {profName}
                </span>
              </div>
            </div>
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

        <div className='mt-8 pb-2 justify-end gap-3'>
          <p>모집 종료 기간</p>
          <div className='flex gap-5 items-center mt-2'>
            <input
              type='datetime-local'
              id='start-date'
              name='start-date'
              value={selectedFindMemberDateTime.startDate
                .toISOString()
                .slice(0, 16)}
              className='text-sm appearance-none border rounded shadow py-[0.375rem] px-2 text-gray-500'
              onChange={handleFindMemberStartDateChange}
            />
          </div>

          <div className='mt-14 pb-2 flex justify-end gap-3'>
            <button
              onClick={handleCancelFindMemberEdit}
              className=' px-4 py-[0.4rem] rounded-[0.2rem] font-light'
            >
              취소
            </button>
            <button
              onClick={handleEditFindMemberPost}
              className=' text-white bg-[#3870e0] px-4 py-[0.4rem] rounded-[0.2rem] font-light focus:bg-[#3464c2] hover:bg-[#3464c2] box-shadow'
            >
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
