import React, { useEffect, useState } from 'react';
import SearchedSubjectListItem from './SearchedSubjectListItem';
import NoneSearchedSubjectInfoListItem from './NoneSearchedSubjectInfoListItem';
import EmptyListItem from './EmptyListItem';
import { storeSubjectInfo } from '@/app/redux/features/selectSubjectInModalSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';

type SearchedSubjectListProps = {
  isSearchedSubjectListReady: boolean;
  setIsSearchedSubjectListReady: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchedSubjectList({
  isSearchedSubjectListReady,
  setIsSearchedSubjectListReady,
}: SearchedSubjectListProps) {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleRowClick = (index: number) => {
    setSelectedRowIndex(index);
    const subjectInfo = {
      department: '소프트웨어학과',
      grade: '3학년',
      subjectClass: '전공필수',
      section: '01',
      subjectName: '데이터베이스시스템',
      profName: '아지즈',
    };
    dispatch(storeSubjectInfo(subjectInfo));
  };

  useEffect(() => {
    setIsSearchedSubjectListReady(false);
  }, [setIsSearchedSubjectListReady]);

  return (
    <tbody>
      {isSearchedSubjectListReady ? (
        <>
          {[...Array(13)].map((_, index) => (
            <SearchedSubjectListItem
              key={index}
              isSubjectSelected={selectedRowIndex === index}
              onClick={() => handleRowClick(index)}
            />
          ))}
        </>
      ) : (
        <>
          <NoneSearchedSubjectInfoListItem />
          <EmptyListItem />
          <EmptyListItem />
          <EmptyListItem />
          <EmptyListItem />
          <EmptyListItem />
          <EmptyListItem />
          <EmptyListItem />
        </>
      )}
    </tbody>
  );
}
