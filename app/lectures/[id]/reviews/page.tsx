'use client';

import Loading from '@/app/loading';
import { useEffect, useState } from 'react';
import ReviewStars from '../../components/ReviewStars';
import LectureReviewList from './components/LectureReviewList';
import RegisterLectureReviewModal from './components/RegisterLectureReviewModal';
import { useRouter } from 'next/navigation';

interface DefaultProps {
  params: {
    id: string;
  };
}

export default function Reviews(props: DefaultProps) {
  const [progressInfo, setProgressInfo] = useState({
    pid: 0,
    grade: 0,
    year: 0,
    profName: '',
    lectureName: '',
    rate: 0,
  });
  const [reviewInfoList, setReviewInfoList] = useState([]);
  const [isReviewInfoListReady, setIsReviewInfoListReady] = useState(false);

  const [openRegisterLectureReviewModal, setOpenRegisterLectureReviewModal] =
    useState<string | undefined>();

  const pid = props.params.id;

  const router = useRouter();

  const fetchReviewInfos = async () => {
    try {
      const progressRes = await fetch(
        `/api/get/one/progress?progress_id=${pid}`,
        {
          method: 'GET',
        }
      );
      const progressData = await progressRes.json();

      const commentRes = await fetch(`/api/get/all/cmt?progress_id=${pid}`, {
        method: 'GET',
      });

      setProgressInfo({
        pid: progressData.progressID,
        grade: progressData.grade,
        year: progressData.year,
        profName: progressData.profName,
        lectureName: progressData.lectureName,
        rate: progressData.rate,
      });

      const commentData = await commentRes.json();

      setReviewInfoList(commentData);

      setIsReviewInfoListReady(true);
    } catch (err) {
      console.error('Fetch error:', err);
      alert('존재하지 않는 게시물입니다');
      router.push('/lectures');
    }
  };

  useEffect(() => {
    fetchReviewInfos();
  }, []);

  return isReviewInfoListReady ? (
    <div className='mt-6 mb-12 px-5 2lg:px-0 overflow-x-auto'>
      <div className='flex justify-between w-[50rem] mx-auto'>
        <div className='ml-9 w-full rounded-xl transition duration-300 lecture-info-box-shadow mt-7 px-5 py-2 mb-10'>
          <div className='flex items-center gap-3 mt-4'>
            <img
              src='/images/icons/talk.png'
              alt='logo'
              style={{ width: '57.5px' }}
            />
            <span className='text-2xl font-semibold mt-1'>강의평</span>
          </div>
          <div className='flex items-center p-1'>
            <div className='flex justify-between items-center w-full '>
              <div className='flex items-center p-1 gap-1 mt-3'>
                <span className='text-2xl font-bold mr-2'>
                  {progressInfo.rate.toFixed(1)}
                </span>
                <div className='scale-125 ml-4 mb-[0.175rem]'>
                  <ReviewStars totalRate={progressInfo.rate} />
                </div>
                <span className='text-sm ml-3 text-[#666]'>
                  ({reviewInfoList.length}개)
                </span>
              </div>
              <div className='flex gap-2 mt-1'>
                <span className='flex items-center text-[#666] rounded-lg font-medium transition px-3 py-[0.375rem] bg-[#eee] hover:bg-[#dedede]'>
                  {progressInfo.lectureName}
                </span>
                <span className='flex items-center text-[#666] rounded-lg font-medium transition px-3 py-[0.375rem] bg-[#eee] hover:bg-[#dedede]'>
                  {progressInfo.profName}
                </span>
              </div>
            </div>
          </div>
          <hr className='mt-3' />
          <div className='h-[25rem] mt-4 overflow-y-scroll items-center justify-between'>
            <LectureReviewList reviewInfoList={reviewInfoList} />
          </div>
          <button
            onClick={() => setOpenRegisterLectureReviewModal('default')}
            className='w-full flex gap-2 items-center box-shadow justify-center transition mt-6 mb-3 text-white rounded-lg font-medium px-4 py-[0.6rem] bg-[#3870e0] hover:bg-[#3464c2]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24'
              viewBox='0 -960 960 960'
              width='24'
              fill='white'
            >
              <path d='M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm600-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z' />
            </svg>
            평가하기
          </button>

          {openRegisterLectureReviewModal ? (
            <RegisterLectureReviewModal
              pid={pid}
              openRegisterLectureReviewModal={openRegisterLectureReviewModal}
              setOpenRegisterLectureReviewModal={
                setOpenRegisterLectureReviewModal
              }
              onReviewSubmitted={fetchReviewInfos}
            />
          ) : null}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
