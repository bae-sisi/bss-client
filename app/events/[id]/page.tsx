'use client';

import Loading from '@/app/loading';
import { useAppSelector } from '@/app/redux/store';
import { formatDate } from '@/app/utils/formatDate';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DefaultProps {
  params: {
    id: string;
  };
}

const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);

export default function EventDetail(props: DefaultProps) {
  const [eventPostInfo, setEventPostInfo] = useState({
    sid: '',
    eid: '',
    title: '',
    created_at: '',
    author: '',
    content: '',
  });
  const [isEventPostReady, setIsEventPostReady] = useState(false);
  const [isMarkdownPreviewReady, setIsMarkdownPreviewReady] = useState(false);

  const sid = useAppSelector((state) => state.authReducer.value.sid);
  const role = useAppSelector((state) => state.authReducer.value.role);

  const eid = props.params.id;

  const router = useRouter();

  const handleDeleteEventPost = async () => {
    let userResponse = confirm('게시글을 삭제하시겠습니까?');
    if (!userResponse) return;

    try {
      const res = await fetch(`/api/auth/delete/event?eid=${eid}`, {
        method: 'GET',
      });

      switch (res.status) {
        case 201:
          // '행사' 목록 페이지로 이동
          router.push('/events');
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

  const handleEditEventPost = () => {
    router.push(`/events/${eid}/edit`);
  };

  useEffect(() => {
    const fetchEventPost = async () => {
      try {
        const res = await fetch(`/api/get/one/event?eid=${eid}`, {
          method: 'GET',
        });
        res
          .json()
          .then((data) => {
            setEventPostInfo({
              sid: data.sid,
              eid: data.eid,
              title: data.title,
              created_at: data.created_at,
              content: data.content,
              author: data.author,
            });
            setIsMarkdownPreviewReady(true);
            setIsEventPostReady(true);
          })
          .catch(() => {
            alert('존재하지 않는 게시물입니다');
            router.push('/events');
            return;
          });
      } catch (err) {
        console.error('Fetch error:', err);
        throw err;
      }
    };

    fetchEventPost();
  }, [eid, router]);

  return isEventPostReady && isMarkdownPreviewReady ? (
    <div className='mt-6 mb-24 px-5 2lg:px-0 overflow-x-auto'>
      <div className='flex flex-col w-[60rem] mx-auto'>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-8'>
            <p className='text-2xl font-bold tracking-tight'>
              {eventPostInfo.title}
            </p>
            <div className='flex justify-between pb-3 border-b border-gray-300'>
              <div className='flex gap-3'>
                <span className='font-semibold'>
                  작성일:{' '}
                  <span className='font-light'>
                    {formatDate(eventPostInfo.created_at)}
                  </span>
                </span>
              </div>
              <div className='flex gap-3'>
                <span className='font-semibold'>
                  작성자:{' '}
                  <span className='font-light'>{eventPostInfo.author}</span>
                </span>
              </div>
            </div>
          </div>
          <div className='gap-5 border-b mt-8 mb-4 pb-5'>
            <MarkdownPreview
              className='markdown-preview'
              source={`
${eventPostInfo.content}
`}
            />
          </div>

          {sid === eventPostInfo.sid || role === 'ADMIN' ? (
            <div className='flex gap-3 justify-end'>
              {sid === eventPostInfo.sid ? (
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
