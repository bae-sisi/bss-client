'use client';

import React, { useEffect, useState } from 'react';
import { AppDispatch, useAppSelector } from '../redux/store';
import Loading from '../loading';
// import PostList from './PostList';
import { useRouter } from 'next/navigation';
import { initSelectedPostIds } from '../redux/features/selectedPostForDeleteSlice';
import { useDispatch } from 'react-redux';
import ModifyPasswordModal from './components/modifyPasswordModal';
import ModifyUsernameModal from './components/modifyUsernameModal';
import ModifyEmailModal from './components/modifyEmailModal';

export default function Mypage() {
  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);
  const username = useAppSelector((state) => state.authReducer.value.username);
  const email = useAppSelector((state) => state.authReducer.value.email);
  const sid = useAppSelector((state) => state.authReducer.value.sid);
  // const selectedPostIds = useAppSelector(
  //   (state) => state.selectedPostForDeleteSlice.value.selectedPostIds
  // );

  const [openModifyPasswordModal, setOpenModifyPasswordModal] = useState<
    string | undefined
  >();
  const [openModifyUsernameModal, setOpenModifyUsernameModal] = useState<
    string | undefined
  >();
  const [openModifyEmailModal, setOpenModifyEmailModal] = useState<
    string | undefined
  >();

  const [isMypageReady, setIsMypageReady] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initSelectedPostIds());
    setIsMypageReady(true);
  }, [dispatch]);

  useEffect(() => {
    if (!isAuth) {
      location.href = '/login';
      return;
    }

    setIsMypageReady(true);
  }, [isAuth, router]);

  // const handleDeleteSelectedPost = () => {
  //   if (!selectedPostIds.length) {
  //     alert('삭제할 게시글을 선택해 주세요');
  //     return;
  //   }

  //   const confirmResult = confirm(
  //     `${selectedPostIds.length}개의 게시글을 삭제하시겠습니까?`
  //   );
  //   if (!confirmResult) return;
  //   dispatch(initSelectedPostIds());
  // };

  return isMypageReady ? (
    <div className='mt-2 px-5 2lg:px-0 overflow-x-auto'>
      <div className='flex flex-col w-[60rem] mx-auto'>
        <p className='text-2xl font-semibold'>회원정보</p>
        <div className='border-t-[3px] mt-4 border-black' />
        <div className='flex flex-col mt-4 tracking-tight text-xs'>
          <div className='flex items-center pb-3 border-b '>
            <span className='w-44 text-sm'>학번</span>
            <span className='w-80 font-bold'>{sid}</span>
          </div>
          <div className='flex items-center py-3 border-b'>
            <div className='w-44 text-sm'>비밀번호</div>
            <div className='w-80 font-bold'>********</div>
            <button
              onClick={() => setOpenModifyPasswordModal('default')}
              className='text-black border w-24 h-7 duration-200 hover:border-black'
            >
              비밀번호 변경
            </button>
            {openModifyPasswordModal ? (
              <ModifyPasswordModal
                openModifyPasswordModal={openModifyPasswordModal}
                setOpenModifyPasswordModal={setOpenModifyPasswordModal}
              />
            ) : null}
          </div>
          <div className='flex items-center py-3 border-b'>
            <div className='w-44 text-sm'>이름(실명)</div>
            <div className='w-80 font-bold'>{username}</div>
            <button
              onClick={() => setOpenModifyUsernameModal('default')}
              className='text-black border w-24 h-7 duration-200 hover:border-black'
            >
              이름 수정
            </button>
            {openModifyUsernameModal ? (
              <ModifyUsernameModal
                openModifyUsernameModal={openModifyUsernameModal}
                setOpenModifyUsernameModal={setOpenModifyUsernameModal}
              />
            ) : null}
          </div>
          <div className='flex items-center py-3 border-b'>
            <div className='w-44 text-sm'>이메일</div>
            <div className='w-80 font-bold'>{email}</div>
            <button
              onClick={() => setOpenModifyEmailModal('default')}
              className='text-black border w-24 h-7 duration-200 hover:border-black'
            >
              이메일 변경
            </button>
            {openModifyEmailModal ? (
              <ModifyEmailModal
                openModifyEmailModal={openModifyEmailModal}
                setOpenModifyEmailModal={setOpenModifyEmailModal}
              />
            ) : null}
          </div>
        </div>

        {/* <p className='text-2xl font-semibold mt-24'>작성글</p>
        <div className='mt-4 mb-4'>
          <div className='flex'>
            <div className='flex flex-col relative z-0 w-1/2 group'>
              <input
                type='text'
                name='floating_first_name'
                className='block pl-7 pt-3 pb-[0.175rem] pr-0 w-full font-normal text-gray-900 bg-transparent border-0 border-b border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                required
              />
              <div className='absolute pt-[0.9rem] left-[-0.9rem] flex items-center pl-3 pointer-events-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='21'
                  viewBox='0 -960 960 960'
                  width='21'
                  fill='#464646'
                  className='scale-x-[-1]'
                >
                  <path d='M785.269-141.629 530.501-396.501q-29.502 26.199-69.036 40.003-39.533 13.805-80.64 13.805-100.978 0-170.677-69.711-69.698-69.71-69.698-169.473 0-99.764 69.423-169.558 69.423-69.795 169.62-69.795 100.198 0 169.974 69.757 69.776 69.756 69.776 169.593 0 41.752-14.411 81.136-14.41 39.385-40.064 70.298L820.05-176.667l-34.781 35.038ZM380.256-390.577q79.907 0 135.505-55.536t55.598-135.91q0-80.375-55.598-135.849-55.598-55.475-135.767-55.475-80.511 0-136.086 55.537-55.575 55.536-55.575 135.91 0 80.375 55.619 135.849 55.618 55.474 136.304 55.474Z' />
                </svg>
              </div>
              <label
                htmlFor='floating_first_name'
                className='peer-focus:font-light absolute text-base font-light text-gray-500 dark:text-gray-400 duration-300 transform -translate-x-[-1.75rem] -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[1.25rem]'
              >
                검색
              </label>
              <p className='text-gray-500 text-xs tracking-widest font-light mt-1'>
                제목으로 검색
              </p>
            </div>
            <div className='relative ml-auto mt-auto bottom-[-0.75rem]'>
              <div className='flex justify-end mb-2'>
                <div className='flex'>
                  <button
                    onClick={handleDeleteSelectedPost}
                    className='text-xs bg-[#eff0f2] px-4 py-[0.43rem] rounded-[0.2rem] font-bold focus:bg-[#eff0f2] hover:bg-[#e5e6e8]'
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <section className='dark:bg-gray-900'>
          <div className='mx-auto w-full'>
            <div className='border dark:bg-gray-800 relative overflow-hidden rounded-sm'>
              <div className='overflow-x-auto'>
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-center'>
                    <tr>
                      <th scope='col' className='px-4 py-2'>
                        선택
                      </th>
                      <th scope='col' className='px-4 py-2'>
                        번호
                      </th>
                      <th scope='col' className='px-4 py-2'>
                        제목
                      </th>
                      <th scope='col' className='px-4 py-2'>
                        작성일
                      </th>
                    </tr>
                  </thead>
                  {sid === '222' ? <PostList /> : null}
                </table>
              </div>
            </div>
            <nav
              className='flex flex-col md:flex-row text-xs justify-between items-start md:items-center space-y-3 md:space-y-0 pl-1 mt-3'
              aria-label='Table navigation'
            >
              <span className='text-gray-500 dark:text-gray-400'>
                <span className='text-gray-500 dark:text-white'> 1 - 10</span>{' '}
                of
                <span className='text-gray-500 dark:text-white'> 1000</span>
              </span>
              <ul className='inline-flex items-stretch -space-x-px'>
                <li>
                  <a
                    href='#'
                    className='flex items-center justify-center h-full py-1.5 px-[0.3rem] ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    <span className='sr-only'>Previous</span>
                    <svg
                      className='w-5 h-5'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-400 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-400 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    aria-current='page'
                    className='flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-400 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    ...
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-400 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    100
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='flex items-center justify-center h-full py-1.5 px-[0.3rem] leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    <span className='sr-only'>Next</span>
                    <svg
                      className='w-5 h-5'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </section> */}
      </div>
    </div>
  ) : (
    <Loading />
  );
}
