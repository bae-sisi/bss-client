'use client';

import { Label, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import SearchedSubjectList from './SearchedSubjectList';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/app/redux/store';
import { initStoreSubjectInfo } from '@/app/redux/features/selectSubjectInModalSlice';
import { storeSubjectInfo } from '@/app/redux/features/selectSubjectSlice';

interface SubjectSearchModalProps {
  openSubjectSearchModal: string | undefined;
  setOpenSubjectSearchModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export default function SubjectSearchModal({
  openSubjectSearchModal,
  setOpenSubjectSearchModal,
}: SubjectSearchModalProps) {
  const lectureName = useAppSelector(
    (state) => state.selectSubjectInModal.value.lectureName
  );
  const profName = useAppSelector(
    (state) => state.selectSubjectInModal.value.profName
  );
  const isSubjectSelected = useAppSelector(
    (state) => state.selectSubjectInModal.value.isSubjectSelected
  );

  const [searchedSubjectList, setSearchedSubjectList] = useState([]);
  const [isSearchedSubjectListReady, setIsSearchedSubjectListReady] =
    useState(false);

  const [gradeState, setGradeState] = useState<number>(0);
  const [lectureNameState, setLectureNameState] = useState(lectureName);
  const [profNameState, setProfNameState] = useState(profName);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setLectureNameState(lectureName);
    setProfNameState(profName);
  }, [lectureName, profName]);

  useEffect(() => {
    dispatch(initStoreSubjectInfo());
  }, [dispatch]);

  const handleSearchSubject = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `/api/get/all/progress?grade=${gradeState}&index=${lectureNameState}`,
        {
          method: 'GET',
        }
      );

      const data = await res.json();

      switch (res.status) {
        case 200:
          setSearchedSubjectList(data);
          setIsSearchedSubjectListReady(true);
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

  const handleSelectSubjectButton = () => {
    if (isSubjectSelected) {
      setOpenSubjectSearchModal(undefined);
      const selectedSubjectInfo = {
        lectureName: lectureNameState,
        profName: profNameState,
      };
      dispatch(storeSubjectInfo(selectedSubjectInfo));
      return;
    }

    alert('교과목을 선택해 주세요');
  };

  return (
    <Modal
      show={openSubjectSearchModal === 'default'}
      onClose={() => setOpenSubjectSearchModal(undefined)}
      className='fade-in-fast'
      size='4xl'
    >
      <Modal.Header onClick={() => dispatch(initStoreSubjectInfo())}>
        개설강좌 조회
      </Modal.Header>
      <Modal.Body className='p-3 pb-0'>
        <div className='space-y-2'>
          <form
            className='flex gap-5 border rounded-sm p-3 group bg-slate-50'
            onSubmit={handleSearchSubject}
          >
            <div className='flex gap-8'>
              <div className='flex items-center gap-3'>
                <div className='m-1 block'>
                  <Label htmlFor='grade' value='학년' />
                </div>
                <select
                  name='grade'
                  onChange={(e) => {
                    setGradeState(parseInt(e.target.value));
                  }}
                  className='border text-left px-1 py-0 h-[1.5rem] rounded-sm border-[#c7cbd2] text-sm'
                >
                  <option value='0'>전체</option>
                  <option value='1'>1학년</option>
                  <option value='2'>2학년</option>
                  <option value='3'>3학년</option>
                  <option value='4'>4학년</option>
                </select>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <div className='m-1 block'>
                <Label htmlFor='lectureName' value='교과목명, 교수명' />
              </div>
              <input
                name='lectureName'
                className='border text-left w-52 px-1 py-0 h-[1.5rem] rounded-sm border-[#c7cbd2] text-sm'
                value={lectureNameState}
                onChange={(e) => setLectureNameState(e.target.value)}
              />
              <button
                onClick={handleSearchSubject}
                className='bg-[#ebebeb] px-4 py-[0.1rem] rounded-sm font-light hover:bg-[#dbdbdb] box-shadow'
                style={{ border: '1px solid #d2d5db' }}
              >
                조회
              </button>
            </div>
          </form>

          <div className='border dark:bg-gray-800 relative rounded-sm h-[27.6rem] overflow-auto'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-center'>
                <tr>
                  <th scope='col' className='px-4 py-2'>
                    번호
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    학년
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    과목명
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    담당교수
                  </th>
                </tr>
              </thead>
              <SearchedSubjectList
                searchedSubjectList={searchedSubjectList}
                isSearchedSubjectListReady={isSearchedSubjectListReady}
                setIsSearchedSubjectListReady={setIsSearchedSubjectListReady}
              />
            </table>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer
        onClick={() => dispatch(initStoreSubjectInfo())}
        className='mx-auto border-none'
      >
        <button
          onClick={handleSelectSubjectButton}
          className='text-white bg-[#3870e0] px-4 py-[0.4rem] rounded-[0.2rem] font-light focus:bg-[#3464c2] hover:bg-[#3464c2] box-shadow'
        >
          선택
        </button>
        <button
          onClick={() => setOpenSubjectSearchModal(undefined)}
          className='bg-[#dddee0] px-4 py-[0.4rem] rounded-[0.2rem] font-light focus:bg-[#d0d1d3] hover:bg-[#d0d1d3] box-shadow'
        >
          닫기
        </button>
      </Modal.Footer>
    </Modal>
  );
}
