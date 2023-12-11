import React, { useEffect, useState } from 'react';
import SearchedSubjectListItem from './SearchedSubjectListItem';
import NoneSearchedSubjectInfoListItem from './NoneSearchedSubjectInfoListItem';
import EmptyListItem from './EmptyListItem';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { storeSubjectInfo } from '@/app/redux/features/selectSubjectInModalSlice';

export interface SearchedSubjectList {
  progressID: number;
  grade: number;
  year: number;
  profName: string;
  lectureName: string;
  rate: number;
}

type SearchedSubjectListProps = {
  isSearchedSubjectListReady: boolean;
  setIsSearchedSubjectListReady: React.Dispatch<React.SetStateAction<boolean>>;
  searchedSubjectList: SearchedSubjectList[];
};

export default function SearchedSubjectList({
  isSearchedSubjectListReady,
  setIsSearchedSubjectListReady,
  searchedSubjectList,
}: SearchedSubjectListProps) {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleRowClick = (index: number) => {
    setSelectedRowIndex(index);
    const selectedSubject = searchedSubjectList[index];
    const subjectInfo = {
      lectureName: selectedSubject.lectureName,
      profName: selectedSubject.profName,
    };
    dispatch(storeSubjectInfo(subjectInfo));
  };

  useEffect(() => {
    setIsSearchedSubjectListReady(false);
  }, [setIsSearchedSubjectListReady]);

  return (
    <tbody>
      {isSearchedSubjectListReady ? (
        searchedSubjectList.length !== 0 &&
        searchedSubjectList.map((searchedSubject, index) => (
          <SearchedSubjectListItem
            key={index}
            index={index + 1}
            searchedSubject={searchedSubject}
            isSubjectSelected={selectedRowIndex === index}
            onClick={() => handleRowClick(index)}
          />
        ))
      ) : (
        <NoneSearchedSubjectInfoListItem />
      )}
    </tbody>
  );
}
