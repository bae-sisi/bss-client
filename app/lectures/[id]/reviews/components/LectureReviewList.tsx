'use client';

import React, { useEffect, useState } from 'react';
import LectureReviewListItem from './LectureReviewListItem';
import NoneLectureReviewPostInfoListItem from './NoneLectureReviewPostInfoListItem';

export interface ReviewInfoList {
  cid: number;
  content: string;
  rate: number;
  enrollSems: string;
  recmndCnt: number;
  sid: string;
  pid: number;
}

interface LectureReviewListProps {
  reviewInfoList: ReviewInfoList[];
}

export default function LectureReviewList({
  reviewInfoList,
}: LectureReviewListProps) {
  const [isEventListReady, setIsEventListReady] = useState(false);

  useEffect(() => {
    if (reviewInfoList.length > 0) {
      setIsEventListReady(true);
    }
  }, [reviewInfoList]);

  return isEventListReady ? (
    <div>
      {reviewInfoList.map((item, index) => (
        <LectureReviewListItem key={index} reviewItem={item} />
      ))}
    </div>
  ) : (
    <NoneLectureReviewPostInfoListItem />
  );
}
