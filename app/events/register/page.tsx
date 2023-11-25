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

export default function RegisterEvent() {
  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);

  const [isEditorReady, setIsEditorReady] = useState(false);
  const [title, setTitle] = useState('');
  const [isTitleValidFail, setIsTitleValidFail] = useState(false);
  const [editorValue, setEditorValue] = useState('');

  const titleRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push('/login');
      return;
    }

    setIsEditorReady(true);
  }, [isAuth, router]);

  const handleEditorChange = useCallback((value?: string) => {
    setEditorValue(value || '');
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsTitleValidFail(false);
  };

  const handleCancelEventRegister = () => {
    let userResponse = confirm('행사 게시글 등록을 취소하시겠습니까?');
    if (!userResponse) return;

    router.push('/events');
  };

  const handleRegisterEventPost = () => {
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
            onClick={handleCancelEventRegister}
            className=' px-4 py-[0.4rem] rounded-[0.2rem] font-light'
          >
            취소
          </button>
          <button
            onClick={handleRegisterEventPost}
            className=' text-white bg-[#3870e0] px-4 py-[0.4rem] rounded-[0.2rem] font-light focus:bg-[#3464c2] hover:bg-[#3464c2] box-shadow'
          >
            등록
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
