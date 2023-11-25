'use client';

import React, { useEffect, useState } from 'react';
import LectureReviewListItem from './LectureReviewListItem';
import NoneLectureReviewPostInfoListItem from './NoneLectureReviewPostInfoListItem';
import { useAppSelector } from '@/app/redux/store';

export default function LectureReviewList() {
  const [isEventListReady, setIsEventListReady] = useState(false);
  const [isAuthor, setIsAuthor] = useState(true);

  useEffect(() => {
    setIsEventListReady(true);
  }, []);

  return isEventListReady ? (
    <div>
      <LectureReviewListItem />
      <LectureReviewListItem />
      <LectureReviewListItem />
      <LectureReviewListItem />
      <LectureReviewListItem />
      <LectureReviewListItem />
      <LectureReviewListItem />
      <LectureReviewListItem />
      <LectureReviewListItem />
      <LectureReviewListItem />
    </div>
  ) : (
    <NoneLectureReviewPostInfoListItem />
  );
}
