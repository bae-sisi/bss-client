'use client';

import Loading from '@/app/loading';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

export default function RegisterEvent() {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [eventName, setEventName] = useState('');
  const [editorValue, setEditorValue] = useState('');

  const router = useRouter();

  const handleEditorChange = useCallback((value?: string) => {
    setEditorValue(value || '');
  }, []);

  const handleCancelContestRegister = () => {
    let userResponse = confirm('행사 등록을 취소하시겠습니까?');
    if (!userResponse) return;

    router.push('/events');
  };

  useEffect(() => {
    setIsEditorReady(true);
  }, []);

  return (
    <div className='mt-2 px-5 2lg:px-0 overflow-x-auto'>
      <div className='flex flex-col w-[60rem] mx-auto'>
        <p className='text-2xl font-semibold'>행사 등록</p>

        <div className='flex gap-5 mt-5 mb-8'>
          <div className='flex flex-col relative z-0 w-2/5 group'>
            <input
              type='text'
              name='floating_first_name'
              id='floating_first_name'
              className='block pt-3 pb-[0.175rem] pl-0 pr-0 w-full font-normal text-gray-900 bg-transparent border-0 border-b border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <label
              htmlFor='floating_first_name'
              className='peer-focus:font-light absolute text-base left-[0.1rem] font-light text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-[0.1rem] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[1.25rem]'
            >
              제목
            </label>
            <p className='text-gray-500 text-xs tracking-widest font-light mt-1'>
              제목을 입력해 주세요
            </p>
          </div>
        </div>

        {isEditorReady ? (
          <div className='w-full mx-auto overflow-auto'>
            <MDEditor
              value={editorValue}
              onChange={handleEditorChange}
              height={500}
              className='md-editor'
            />
          </div>
        ) : (
          <Loading />
        )}

        <div className='mt-8 pb-2 flex justify-end gap-3'>
          <button
            onClick={handleCancelContestRegister}
            className=' px-4 py-[0.4rem] rounded-[0.2rem] font-light'
          >
            취소
          </button>
          <button
            onClick={() => alert('개발 예정')}
            className=' text-white bg-[#3870e0] px-4 py-[0.4rem] rounded-[0.2rem] font-light focus:bg-[#3464c2] hover:bg-[#3464c2] box-shadow'
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}