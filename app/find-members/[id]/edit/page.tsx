'use client';

import Loading from '@/app/loading';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Label } from 'flowbite-react';
import SubjectSearch from '../../register/components/SubjectSearch';
import { AppDispatch, useAppSelector } from '@/app/redux/store';
import { UserInfo, fetchCurrentUser } from '@/app/utils/fetchCurrentUser';
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

export default function EditFindMemeber(props: DefaultProps) {
  const sid = useAppSelector((state) => state.authReducer.value.sid);

  const lectureName = useAppSelector(
    (state) => state.selectSubject.value.lectureName
  );
  const profName = useAppSelector(
    (state) => state.selectSubject.value.profName
  );

  const fid = props.params.id;

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
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isTitleValidFail, setIsTitleValidFail] = useState(false);
  const [isSubjectInfoValidFail, setIsSubjectInfoValidFail] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  // 각 포지션에 대한 비트 마스크 정의
  const positionBitMask: { [key: string]: number } = {
    Frontend: 8, // 1000 in binary
    Backend: 4, // 0100 in binary
    DevOps: 2, // 0010 in binary
    기타: 1, // 0001 in binary
  };

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
        const res = await fetch(`/api/get/one/fidmem?fid=${fid}`, {
          method: 'GET',
        });
        const data = await res.json();

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

        // 변경 필요함 data.sid.toString() -> data.sid
        if (userInfo.sid !== data.sid.toString()) {
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
  }, [dispatch, fid, router, sid]);

  useEffect(() => {
    setFindMemberPostInfo((prevInfo) => ({
      ...prevInfo,
      prof_name: profName,
      lecture_name: lectureName,
    }));
  }, [profName, lectureName]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindMemberPostInfo({ ...findMemberPostInfo, title: e.target.value });
    setIsTitleValidFail(false);
  };

  const handleEditorChange = useCallback(
    (value?: string) => {
      setFindMemberPostInfo({ ...findMemberPostInfo, content: value || '' });
    },
    [findMemberPostInfo]
  );

  const handleFindMemberEndDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFindMemberPostInfo({ ...findMemberPostInfo, end_date: e.target.value });
  };

  const handleReqPositionClick = (value: string) => {
    setFindMemberPostInfo((prevInfo) => {
      const newStack =
        prevInfo.stack & positionBitMask[value]
          ? prevInfo.stack & ~positionBitMask[value]
          : prevInfo.stack | positionBitMask[value];

      return {
        ...prevInfo,
        stack: newStack,
      };
    });
  };

  const handleCancelFindMemberEdit = () => {
    const confirmResponse = confirm('수정을 취소하시겠습니까');
    if (!confirmResponse) return;

    router.push('/find-members');
  };

  const handleEditFindMemberPost = async () => {
    if (!findMemberPostInfo.title) {
      alert('제목을 입력해 주세요');
      window.scrollTo(0, 0);
      titleRef.current?.focus();
      setIsTitleValidFail(true);
      return;
    }

    if (!findMemberPostInfo.content) {
      alert('본문을 입력해 주세요');
      window.scrollTo(0, 0);
      return;
    }

    if (!findMemberPostInfo.stack) {
      alert('모집할 개발 포지션을 선택해 주세요');
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }

    if (!findMemberPostInfo.end_date) {
      alert('모집 종료 기간을 설정해 주세요');
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }

    try {
      const res = await fetch(`/api/auth/update/fidmem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fid,
          title: findMemberPostInfo.title,
          content: findMemberPostInfo.content,
          end_date: findMemberPostInfo.end_date,
          prof_name: findMemberPostInfo.prof_name,
          lecture_name: findMemberPostInfo.lecture_name,
          stack: findMemberPostInfo.stack,
        }),
      });

      switch (res.status) {
        case 201:
          // 수정된 게시물로 이동
          router.push(`/find-members/${fid}`);
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
              value={findMemberPostInfo.title}
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
                    htmlFor='lectureName'
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
                  {findMemberPostInfo.lecture_name}
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
                  {findMemberPostInfo.prof_name}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full mx-auto overflow-auto'>
          <MDEditor
            autoFocus
            value={findMemberPostInfo.content}
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
            {['Frontend', 'Backend', 'DevOps', '기타'].map((value) => (
              <button
                key={value}
                className={`${
                  findMemberPostInfo.stack & positionBitMask[value]
                    ? 'border-2 border-[#3870e0] text-[#3870e0] font-semibold shadow-md'
                    : 'border border-[#9ba3af]'
                } px-4 h-8 rounded-md w-[6rem]`}
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
              // value={findMemberPostInfo.end_date.toISOString().slice(0, 16)}
              value={findMemberPostInfo.end_date}
              className='text-sm appearance-none border rounded shadow py-[0.375rem] px-2 text-gray-500'
              onChange={handleFindMemberEndDateChange}
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
