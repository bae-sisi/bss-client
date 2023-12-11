'use client';

import React, { useEffect, useState } from 'react';
import EventListItem from './EventIListItem';
import NoneEventPostInfoListItem from './NoneEventPostInfoListItem';
import Loading from '@/app/loading';

type EventPostListProps = {
  searchQuery: string;
};

export default function EventList({ searchQuery }: EventPostListProps) {
  const [eventPostsInfo, setEventPostsInfo] = useState([]);
  const [isEventPostListReady, setIsEventPostListReady] = useState(false);

  useEffect(() => {
    const fetchEventPost = async () => {
      try {
        const res = await fetch(`/api/get/all/event?index=${searchQuery}`, {
          method: 'GET',
        });
        const data = await res.json();
        setEventPostsInfo(data);
        setIsEventPostListReady(true);
      } catch (err) {
        console.error('Fetch error:', err);
        throw err;
      }
    };

    // 한글 자음과 모음이 합쳐진 형태인지 확인하는 정규 표현식
    const koreanRegex = /^[가-힣]+$/;

    // 한글이 포함되어 있고, 자음과 모음이 합쳐진 형태이거나, 한글이 아닌 경우에만 fetch 실행
    if (koreanRegex.test(searchQuery) || !/[ㄱ-ㅎㅏ-ㅣ]/.test(searchQuery)) {
      fetchEventPost();
    }
  }, [searchQuery]);

  return isEventPostListReady ? (
    <tbody>
      {eventPostsInfo.length !== 0 ? (
        eventPostsInfo.map((eventPost, index) => (
          <EventListItem key={index} eventPost={eventPost} />
        ))
      ) : (
        <NoneEventPostInfoListItem />
      )}
    </tbody>
  ) : (
    <Loading />
  );
}
