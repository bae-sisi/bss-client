'use client';

import React, { useEffect, useState } from 'react';
import FindMemeberListItem from './FindMemberListItem';
import NoneFindMemeberPostInfoListItem from './NoneFindMemeberPostInfoListItem';
import Loading from '@/app/loading';

type FindMemberPostListProps = {
  searchQuery: string;
};

export default function FindMemberList({
  searchQuery,
}: FindMemberPostListProps) {
  const [findMemberPostsInfo, setFindMemberPostsInfo] = useState([]);
  const [isFindMemberPostListReady, setIsFindMemberPostListReady] =
    useState(false);

  useEffect(() => {
    const fetchFindMemberPost = async () => {
      try {
        const res = await fetch(`/api/get/all/fidmem?index=${searchQuery}`, {
          method: 'GET',
        });
        const data = await res.json();
        setFindMemberPostsInfo(data);
        setIsFindMemberPostListReady(true);
      } catch (err) {
        console.error('Fetch error:', err);
        throw err;
      }
    };

    // 한글 자음과 모음이 합쳐진 형태인지 확인하는 정규 표현식
    const koreanRegex = /^[가-힣]+$/;

    // 한글이 포함되어 있고, 자음과 모음이 합쳐진 형태이거나, 한글이 아닌 경우에만 fetch 실행
    if (koreanRegex.test(searchQuery) || !/[ㄱ-ㅎㅏ-ㅣ]/.test(searchQuery)) {
      fetchFindMemberPost();
    }
  }, [searchQuery]);

  return isFindMemberPostListReady ? (
    <tbody>
      {findMemberPostsInfo.length !== 0 ? (
        findMemberPostsInfo.map((findMemberPost, index) => (
          <FindMemeberListItem key={index} findMemberPost={findMemberPost} />
        ))
      ) : (
        <NoneFindMemeberPostInfoListItem />
      )}
    </tbody>
  ) : (
    <Loading />
  );
}
