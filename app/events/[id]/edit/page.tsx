'use client';

import Loading from '@/app/loading';
import { AppDispatch, useAppSelector } from '@/app/redux/store';
import { UserInfo, fetchCurrentUser } from '@/app/utils/fetchCurrentUser';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

interface DefaultProps {
  params: {
    id: string;
  };
}

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

export default function EditEvent(props: DefaultProps) {
  const sid = useAppSelector((state) => state.authReducer.value.sid);

  const eid = props.params.id;

  const [eventPostInfo, setEventPostInfo] = useState({
    sid: '',
    eid: '',
    title: '',
    created_at: '',
    content: '',
    author: '',
  });
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isTitleValidFail, setIsTitleValidFail] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  useEffect(() => {
    fetchCurrentUser(dispatch).then((res) => {
      if (res === false || !res.isAuth) {
        location.href = '/login';
        return;
      }
      fetchEventPost(res);
    });

    const fetchEventPost = async (userInfo: UserInfo) => {
      try {
        const res = await fetch(`/api/get/one/event?eid=${eid}`, {
          method: 'GET',
        });
        const data = await res.json();
        setEventPostInfo({
          sid: data.sid,
          eid: data.eid,
          title: data.title,
          created_at: data.created_at,
          content: data.content,
          author: data.author,
        });

        if (userInfo.sid !== data.sid) {
          alert('접근 권한이 없습니다');
          router.back();
          return;
        }
        setIsEditorReady(true);
      } catch (err) {
        console.error('Fetch error:', err);
        throw err;
      }
    };
  }, [dispatch, eid, sid, router]);

  const handleEditorChange = useCallback(
    (value?: string) => {
      setEventPostInfo({ ...eventPostInfo, content: value || '' });
    },
    [eventPostInfo]
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventPostInfo({ ...eventPostInfo, title: e.target.value });
    setIsTitleValidFail(false);
  };

  const handleCancelEventEdit = () => {
    const confirmResponse = confirm('수정을 취소하시겠습니까?');
    if (!confirmResponse) return;

    router.back();
  };

  const handleEditEventPost = async () => {
    if (!eventPostInfo.title) {
      alert('제목을 입력해 주세요');
      window.scrollTo(0, 0);
      titleRef.current?.focus();
      setIsTitleValidFail(true);
      return;
    }

    if (!eventPostInfo.content) {
      alert('본문을 입력해 주세요');
      window.scrollTo(0, 0);
      return;
    }

    try {
      const res = await fetch(`/api/auth/update/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eid,
          title: eventPostInfo.title,
          content: eventPostInfo.content,
        }),
      });

      switch (res.status) {
        case 201:
          // 수정된 게시물로 이동
          router.push(`/events/${eid}`);
          break;
        case 400:
          location.href = '/login';
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      throw err;
    }
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
              value={eventPostInfo.title}
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
            value={eventPostInfo.content}
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
