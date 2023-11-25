'use client';

import Loading from '@/app/loading';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Label } from 'flowbite-react';
import { AppDispatch, useAppSelector } from '@/app/redux/store';
import { useDispatch } from 'react-redux';
import { initSubjectInfo } from '@/app/redux/features/selectSubjectSlice';
import SubjectSearch from './components/SubjectSearch';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

export default function RegisterFindMemeber() {
  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);
  const subjectName = useAppSelector(
    (state) => state.selectSubject.value.subjectName
  );
  const profName = useAppSelector(
    (state) => state.selectSubject.value.profName
  );
  const isSubjectSelected = useAppSelector(
    (state) => state.selectSubject.value.isSubjectSelected
  );
  const [selectedReqPosition, setSelectedReqPosition] = useState<string[]>([]);

  const [isEditorReady, setIsEditorReady] = useState(false);
  const [title, setTitle] = useState('');
  const [subjectNameState, setSubjectNameState] = useState('');
  const [isTitleValidFail, setIsTitleValidFail] = useState(false);
  const [isSubjectInfoValidFail, setIsSubjectInfoValidFail] = useState(false);
  const [profNameState, setProfNameState] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const [selectedFindMemberDateTime, setSelectedFindMemberDateTime] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const titleRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  useEffect(() => {
    setSubjectNameState(subjectName);
    setProfNameState(profName);
  }, [subjectName, profName]);

  useEffect(() => {
    if (!isAuth) {
      router.push('/login');
      return;
    }

    setIsEditorReady(true);
    dispatch(initSubjectInfo());
  }, [dispatch, isAuth, router]);

  useEffect(() => {
    if (isSubjectSelected) setIsSubjectInfoValidFail(false);
  }, [isSubjectSelected]);

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

  const handleReqPositionClick = (value: string) => {
    setSelectedReqPosition((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((pos) => pos !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  const handleCancelFindMemberRegister = () => {
    let userResponse = confirm('팀원모집 게시글 등록을 취소하시겠습니까?');
    if (!userResponse) return;

    router.push('/find-members');
  };

  const handleRegisterFindMemberPost = () => {
    if (!title) {
      alert('제목을 입력해 주세요');
      window.scrollTo(0, 0);
      titleRef.current?.focus();
      setIsTitleValidFail(true);
      return;
    }

    if (!isSubjectSelected) {
      alert('교과목을 선택해 주세요');
      window.scrollTo(0, 0);
      setIsSubjectInfoValidFail(true);
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
              className={`peer-focus:font-light absolute text-base left-[0.1rem] font-light text-${
                isTitleValidFail ? 'red' : 'gray'
              }-500 dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-[0.1rem] peer-focus:text-${
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
                  {subjectNameState}
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
                  {profNameState}
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

        <div className='mt-8 flex flex-col gap-1'>
          <div className='ml-1 block'>
            <Label
              htmlFor='subjectClass'
              value='모집할 개발 포지션'
              className='text-base'
            />
          </div>
          <div className='flex gap-1'>
            {['Frontend', 'Backend', 'DevOps'].map((value) => (
              <button
                key={value}
                className={`${
                  selectedReqPosition.includes(value)
                    ? 'border-2 border-[#3870e0] text-[#3870e0] font-semibold shadow-md'
                    : 'border border-[#9ba3af]'
                }  px-4 h-8 rounded-md w-[6rem]`}
                onClick={() => handleReqPositionClick(value)}
              >
                {value}
              </button>
            ))}
          </div>
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
              onClick={handleCancelFindMemberRegister}
              className=' px-4 py-[0.4rem] rounded-[0.2rem] font-light'
            >
              취소
            </button>
            <button
              onClick={handleRegisterFindMemberPost}
              className=' text-white bg-[#3870e0] px-4 py-[0.4rem] rounded-[0.2rem] font-light focus:bg-[#3464c2] hover:bg-[#3464c2] box-shadow'
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
