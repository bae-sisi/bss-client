'use client';

import React, { useEffect, useState } from 'react';
import LectureListItem from './LectureListItem';
import NoneLecturePostInfoListItem from './NoneLecturePostInfoListItem';
import Loading from '@/app/loading';

type LecturePostListProps = {
  searchQuery: string;
};

export default function LectureList({ searchQuery }: LecturePostListProps) {
  const [lecturePostsInfo, setLecturePostsInfo] = useState([]);
  const [isLecuturePostListReady, setIsLecuturePostListReady] = useState(false);

  useEffect(() => {
    const fetchLecturePost = async () => {
      try {
        const res = await fetch(
          `/api/get/all/progress?grade=${0}&index=${searchQuery}`,
          {
            method: 'GET',
          }
        );
        const data = await res.json();
        setLecturePostsInfo(data.reverse());
        setIsLecuturePostListReady(true);
      } catch (err) {
        console.error('Fetch error:', err);
        throw err;
      }
    };

    // 한글 자음과 모음이 합쳐진 형태인지 확인하는 정규 표현식
    const koreanRegex = /^[가-힣]+$/;

    // 한글이 포함되어 있고, 자음과 모음이 합쳐진 형태이거나, 한글이 아닌 경우에만 fetch 실행
    if (koreanRegex.test(searchQuery) || !/[ㄱ-ㅎㅏ-ㅣ]/.test(searchQuery)) {
      fetchLecturePost();
    }
  }, [searchQuery]);

  return isLecuturePostListReady ? (
    <tbody>
      {lecturePostsInfo.length !== 0 ? (
        lecturePostsInfo.map((lecturePost, index) => (
          <LectureListItem key={index} lecturePost={lecturePost} />
        ))
      ) : (
        <NoneLecturePostInfoListItem />
      )}
    </tbody>
  ) : (
    <Loading />
  );
}
