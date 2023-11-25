'use client';

import Loading from '@/app/loading';
import { useAppSelector } from '@/app/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReviewStars from '../components/ReviewStars';
import Link from 'next/link';
import LectureReviewList from './components/LectureReviewList';

interface DefaultProps {
  params: {
    id: string;
  };
}

export default function LectureInfoDetail(props: DefaultProps) {
  const [isFindMemberPostReady, setIsFindMemberPostReady] = useState(false);

  const uid = useAppSelector((state) => state.authReducer.value.uid);

  const router = useRouter();

  const handleDeleteFindMemberPost = () => {
    let userResponse = confirm('게시글을 삭제하시겠습니까?');
    if (!userResponse) return;
    alert('게시글을 삭제하였습니다.');
    router.push('/find-members');
  };

  useEffect(() => {
    setIsFindMemberPostReady(true);
  }, []);

  return isFindMemberPostReady ? (
    <div className='mt-6 mb-24 px-5 2lg:px-0 overflow-x-auto'>
      <div className='flex justify-between w-[60rem] mx-auto'>
        <div className='w-1/2 rounded-xl transition duration-300 lecture-info-box-shadow mt-7 p-5 mb-10'>
          <div className='flex items-center gap-3'>
            <img
              src='/images/icons/magnifier.png'
              alt='logo'
              style={{ width: '47.5px' }}
            />
            <span className='text-xl font-semibold'>교과목 정보</span>
          </div>
          <div>
            <div className='flex items-center p-1 mt-5'>
              <span className='font-bold mr-7'>과목명</span>
              <Link
                href='/'
                className='flex items-center text-[#666] rounded-lg font-medium transition pl-3 py-[0.375rem] bg-[#eee] pr-1 hover:bg-[#dedede]'
              >
                데이터베이스시스템
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='24'
                  viewBox='0 -960 960 960'
                  width='24'
                  fill='#666'
                >
                  <path d='M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z' />
                </svg>
              </Link>
            </div>
            <Link href='/' className='flex items-center p-1 mt-2'>
              <span className='font-bold mr-7'>교수명</span>
              <span className='flex items-center text-[#666] rounded-lg font-medium transition pl-3 py-[0.375rem] bg-[#eee] pr-1 hover:bg-[#dedede]'>
                나스리디노프 아지즈
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='24'
                  viewBox='0 -960 960 960'
                  width='24'
                  fill='#666'
                >
                  <path d='M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z' />
                </svg>
              </span>
            </Link>
          </div>
          <hr className='mt-5' />
          <div className='flex items-center p-1 justify-between mr-14 mt-7'>
            <div className='flex flex-col gap-1'>
              <span className='font-bold'>과제</span>
              <span className='text-[#666]'>보통</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='font-bold'>조모임</span>
              <span className='text-[#666]'>많음</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='font-bold'>성적</span>
              <span className='text-[#666]'>너그러움</span>
            </div>
          </div>
          <div className='flex items-center p-1 mt-6'>
            <span className='font-bold mr-10'>출결</span>
            <span className='mr-1 text-[#666]'>직접호명</span>
          </div>
          <div className='flex items-center p-1 mt-5'>
            <span className='font-bold mr-10'>시험</span>
            <span className='mr-1 text-[#666]'>한 번</span>
          </div>
        </div>

        <div className='ml-9 w-1/2 rounded-xl transition duration-300 lecture-info-box-shadow mt-7 px-5 py-2 mb-10'>
          <div className='flex items-center p-1'>
            <div className='flex items-center p-1 gap-1 mt-3'>
              <span className='text-2xl font-bold mr-2'>3.0</span>
              <div className='scale-125 ml-4 mb-[0.175rem]'>
                <ReviewStars />
              </div>
              <span className='text-sm ml-3 text-[#666]'>(3개)</span>
            </div>
          </div>
          <hr className='mt-3' />
          <div className='h-[13.5rem] items-center justify-between'>
            <LectureReviewList id={props.params.id} />
          </div>
          <Link
            href={`${props.params.id}/reviews`}
            className='flex items-center box-shadow justify-center transition mt-6 text-[#666] rounded-lg font-medium px-4 py-[0.6rem] bg-[#eee] hover:bg-[#dedede]'
          >
            강의평 더 보기
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
