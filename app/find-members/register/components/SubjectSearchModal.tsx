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
  const department = useAppSelector(
    (state) => state.selectSubjectInModal.value.department
  );
  const grade = useAppSelector(
    (state) => state.selectSubjectInModal.value.grade
  );
  const subjectClass = useAppSelector(
    (state) => state.selectSubjectInModal.value.subjectClass
  );
  const section = useAppSelector(
    (state) => state.selectSubjectInModal.value.section
  );
  const subjectName = useAppSelector(
    (state) => state.selectSubjectInModal.value.subjectName
  );
  const profName = useAppSelector(
    (state) => state.selectSubjectInModal.value.profName
  );
  const isSubjectSelected = useAppSelector(
    (state) => state.selectSubjectInModal.value.isSubjectSelected
  );

  const [isSearchedSubjectListReady, setIsSearchedSubjectListReady] =
    useState(false);

  const [departmentState, setDepartmentState] = useState(department);
  const [gradeState, setGradeState] = useState(grade);
  const [subjectClassState, setSubjectClassState] = useState(subjectClass);
  const [sectionState, setSectionState] = useState(section);
  const [subjectNameState, setSubjectNameState] = useState(subjectName);
  const [profNameState, setProfNameState] = useState(profName);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setDepartmentState(department);
    setGradeState(grade);
    setSubjectClassState(subjectClass);
    setSectionState(section);
    setSubjectNameState(subjectName);
    setProfNameState(profName);
  }, [department, grade, subjectClass, section, subjectName, profName]);

  useEffect(() => {
    dispatch(initStoreSubjectInfo());
  }, [dispatch]);

  const handleSearchSubjectButton = () => {
    setIsSearchedSubjectListReady(true);
  };

  const handleSelectSubjectButton = () => {
    if (isSubjectSelected) {
      setOpenSubjectSearchModal(undefined);
      const selectedSubjectInfo = {
        subjectName: subjectNameState,
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
          <div className='flex flex-col gap-2 border rounded-sm p-3 group bg-slate-50'>
            <div className='flex gap-8'>
              <div className='flex items-center gap-3'>
                <div className='m-1 block'>
                  <Label htmlFor='department' value='학과(부)' />
                </div>
                <select
                  name='department'
                  value={departmentState}
                  onChange={(e) => {
                    setDepartmentState(e.target.value);
                  }}
                  className='border text-left px-1 py-0 h-[1.5rem] rounded-sm border-[#c7cbd2] text-sm'
                >
                  <option value='all'>전체</option>
                  <option value='소프트웨어학부'>소프트웨어학부</option>
                  <option value='소프트웨어학과'>소프트웨어학과</option>
                </select>
              </div>

              <div className='flex items-center gap-3'>
                <div className='m-1 block'>
                  <Label htmlFor='grade' value='학년' />
                </div>
                <select
                  name='grade'
                  value={gradeState}
                  onChange={(e) => {
                    setGradeState(e.target.value);
                  }}
                  className='border text-left px-1 py-0 h-[1.5rem] rounded-sm border-[#c7cbd2] text-sm'
                >
                  <option value='all'>전체</option>
                  <option value='1학년'>1학년</option>
                  <option value='2학년'>2학년</option>
                  <option value='3학년'>3학년</option>
                  <option value='4학년'>4학년</option>
                </select>
              </div>

              <div className='flex items-center gap-3'>
                <div className='m-1 block'>
                  <Label htmlFor='subjectClass' value='이수구분' />
                </div>
                <select
                  name='subjectClass'
                  value={subjectClassState}
                  onChange={(e) => {
                    setSubjectClassState(e.target.value);
                  }}
                  className='border text-left px-1 py-0 h-[1.5rem] rounded-sm border-[#c7cbd2] text-sm'
                >
                  <option value='all'>전체</option>
                  <option value='전공필수'>전공필수</option>
                  <option value='전공선택'>전공선택</option>
                  <option value='교양'>교양</option>
                  <option value='교직'>교직</option>
                  <option value='일선'>일선</option>
                </select>
              </div>

              <div className='flex items-center gap-3'>
                <div className='m-1 block'>
                  <Label htmlFor='section' value='분반' />
                </div>
                <select
                  name='section'
                  className='border text-left px-1 py-0 h-[1.5rem] rounded-sm border-[#c7cbd2] text-sm'
                  value={sectionState}
                  onChange={(e) => {
                    setSectionState(e.target.value);
                  }}
                >
                  <option value='all'>전체</option>
                  <option value='01'>01</option>
                  <option value='02'>02</option>
                </select>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <div className='m-1 block'>
                <Label htmlFor='subjectName' value='교과목명' />
              </div>
              <input
                name='subjectName'
                className='border text-left w-52 px-1 py-0 h-[1.5rem] rounded-sm border-[#c7cbd2] text-sm'
                value={subjectNameState}
              />
              <button
                onClick={handleSearchSubjectButton}
                className='bg-[#ebebeb] px-4 py-[0.1rem] rounded-sm font-light hover:bg-[#dbdbdb] box-shadow'
                style={{ border: '1px solid #d2d5db' }}
              >
                조회
              </button>
            </div>
          </div>

          <div className='border dark:bg-gray-800 relative rounded-sm h-[27.6rem] overflow-auto'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-center'>
                <tr>
                  <th scope='col' className='px-4 py-2'>
                    순번
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    학년
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    이수구분
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    과목명
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    분반
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    학점
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    담당교수
                  </th>
                  <th scope='col' className='px-4 py-2'>
                    수업시간
                  </th>
                </tr>
              </thead>
              <SearchedSubjectList
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
