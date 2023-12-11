'use client';

import Loading from '@/app/loading';
import { useAppSelector } from '@/app/redux/store';
import {
  calculateTimeDifference,
  formatDate,
  formatDateTime,
  TimeDifference,
} from '@/app/utils/formatDate';
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

export default function FindMemeberDetail(props: DefaultProps) {
  const [findMemberPostInfo, setFindMemberPostInfo] = useState({
    sid: '',
    fid: '',
    title: '',
    created_at: '',
    end_date: '',
    content: '',
    author: '',
    lecture_name: '',
    prof_name: '',
    author_email: '',
    stack: 0,
  });
  const [isFindMemberPostReady, setIsFindMemberPostReady] = useState(false);
  const [isMarkdownPreviewReady, setIsMarkdownPreviewReady] = useState(false);
  const [timeDiff, setTimeDiff] = useState<TimeDifference | null>(null);

  const sid = useAppSelector((state) => state.authReducer.value.sid);
  const role = useAppSelector((state) => state.authReducer.value.role);

  const fid = props.params.id;

  const router = useRouter();

  const handleDeleteFindMemberPost = async () => {
    let userResponse = confirm('게시글을 삭제하시겠습니까?');
    if (!userResponse) return;

    try {
      const res = await fetch(`/api/auth/delete/fidmem?fid=${fid}`, {
        method: 'GET',
      });

      switch (res.status) {
        case 201:
          // '팀원 모집' 목록 페이지로 이동
          router.push('/find-members');
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

  const handleEditFindMemberPost = () => {
    router.push(`/find-members/${fid}/edit`);
  };

  useEffect(() => {
    const fetchFindMemberPost = async () => {
      try {
        const res = await fetch(`/api/get/one/fidmem?fid=${fid}`, {
          method: 'GET',
        });
        res
          .json()
          .then((data) => {
            setFindMemberPostInfo({
              sid: data.sid,
              fid: data.fid,
              title: data.title,
              created_at: data.created_at,
              end_date: data.end_date,
              content: data.content,
              author: data.author,
              lecture_name: data.lecture_name,
              prof_name: data.prof_name,
              author_email: data.author_email,
              stack: data.stack,
            });
            setIsMarkdownPreviewReady(true);
            setIsFindMemberPostReady(true);
          })
          .catch(() => {
            alert('존재하지 않는 게시물입니다');
            router.push('/find-members');
            return;
          });
      } catch (err) {
        console.error('Fetch error:', err);
        throw err;
      }
    };

    fetchFindMemberPost();
  }, [fid, router]);

  useEffect(() => {
    const updateTimer = () => {
      if (findMemberPostInfo.end_date) {
        const diff = calculateTimeDifference(findMemberPostInfo.end_date);
        setTimeDiff(diff);
      }
    };

    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [findMemberPostInfo.end_date]);

  return isFindMemberPostReady && isMarkdownPreviewReady ? (
    <div className='mt-6 mb-24 px-5 2lg:px-0 overflow-x-auto'>
      <div className='flex flex-col w-[60rem] mx-auto'>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-8'>
            <p className='text-2xl font-bold tracking-tight'>
              {findMemberPostInfo.title}
            </p>
            <div className='flex justify-between pb-3 border-b border-gray-300'>
              <div className='flex gap-2'>
                <span className='font-semibold'>
                  작성일:{' '}
                  <span className='font-light'>
                    {formatDate(findMemberPostInfo.created_at)}
                  </span>
                </span>
                <span className='relative bottom-[0.055rem] font-thin before:content-["|"]' />
                <span className='font-semibold'>
                  교과목명:{' '}
                  <span className='font-light'>
                    {findMemberPostInfo.lecture_name}
                  </span>
                </span>
                <span className='relative bottom-[0.055rem] font-thin before:content-["|"]' />
                <span className='font-semibold'>
                  교수명:{' '}
                  <span className='font-light'>
                    {findMemberPostInfo.prof_name}
                  </span>
                </span>
                <span className='relative bottom-[0.055rem] font-thin before:content-["|"]' />
                {timeDiff && (
                  <span className='font-semibold'>
                    모집 종료 기간:{' '}
                    {timeDiff.isPast ? (
                      <span className='font-light'>
                        {formatDateTime(findMemberPostInfo.end_date)}{' '}
                        <span className='text-red-500 font-bold'>(종료)</span>
                      </span>
                    ) : (
                      <span className='font-light'>
                        {formatDateTime(findMemberPostInfo.end_date)}{' '}
                        <span className='text-blue-500 font-semibold'>
                          {'('}
                          {timeDiff.days > 0 &&
                            `${timeDiff.days}일 ${timeDiff.hours}시간 `}
                          {timeDiff.days === 0 &&
                            timeDiff.hours > 0 &&
                            `${timeDiff.hours}시간 ${timeDiff.minutes}분 `}
                          {timeDiff.days === 0 &&
                            timeDiff.hours === 0 &&
                            timeDiff.minutes > 0 &&
                            `${timeDiff.minutes}분 ${timeDiff.seconds}초 `}
                          {timeDiff.days === 0 &&
                            timeDiff.hours === 0 &&
                            timeDiff.minutes === 0 &&
                            `${timeDiff.seconds}초 `}
                          남음)
                        </span>
                      </span>
                    )}
                  </span>
                )}
              </div>
              <div className='flex gap-3'>
                <span className='font-semibold'>
                  작성자:{' '}
                  <span className='font-light'>
                    {findMemberPostInfo.author}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className='gap-5 border-b mt-8 mb-4 pb-5'>
            <MarkdownPreview
              className='markdown-preview'
              source={`
${findMemberPostInfo.content}
              `}
            />
          </div>

          <div className='flex gap-3 justify-end'>
            <div className='flex flex-col mr-auto items-center gap-2'>
              <span className='self-start ml-2 text-black font-semibold'>
                작성자 이메일
              </span>
              <a
                href={`mailto:${'example@cbnu.ac.kr'}`}
                className='flex gap-[0.375rem] text-xs items-center underline text-blue-500 border border-gray-400 px-4 py-[0.25rem] rounded-[10rem] box-shadow'
              >
                {findMemberPostInfo.author_email}
              </a>
            </div>
            {sid === findMemberPostInfo.sid || role === 'ADMIN' ? (
              <>
                {sid === findMemberPostInfo.sid ? (
                  <button
                    onClick={handleEditFindMemberPost}
                    className='flex gap-[0.375rem] h-9 items-center text-white bg-[#eba338] px-2 py-[0.4rem] rounded-[0.2rem] font-light focus:bg-[#dc9429] hover:bg-[#dc9429] box-shadow'
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
                  onClick={handleDeleteFindMemberPost}
                  className='flex gap-[0.375rem] h-9 items-center text-white bg-red-500 px-2 py-[0.4rem] rounded-[0.2rem] font-light focus:bg-[#e14343] hover:bg-[#e14343] box-shadow'
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
              </>
            ) : null}
          </div>
          <div className='flex flex-col mt-8 mb-5 gap-2'>
            <span className='text-black ml-2 font-semibold'>모집 포지션</span>
            <div className='flex gap-2 text-xs'>
              {findMemberPostInfo.stack & 8 ? (
                <span className='w-fit px-3 py-[0.25rem] border border-gray-400 rounded-[10rem] box-shadow'>
                  Frontend
                </span>
              ) : null}
              {findMemberPostInfo.stack & 4 ? (
                <span className='w-fit px-3 py-[0.25rem] border border-gray-400 rounded-[10rem] box-shadow'>
                  Backend
                </span>
              ) : null}
              {findMemberPostInfo.stack & 2 ? (
                <span className='w-fit px-3 py-[0.25rem] border border-gray-400 rounded-[10rem] box-shadow'>
                  DevOps
                </span>
              ) : null}
              {findMemberPostInfo.stack & 1 ? (
                <span className='w-fit px-3 py-[0.25rem] border border-gray-400 rounded-[10rem] box-shadow'>
                  기타
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
