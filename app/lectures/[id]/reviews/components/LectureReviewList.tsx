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

// 최신 학기로 정렬
function convertSemesterToNumber(semester: string): number {
  const year = parseInt(semester.substring(0, 2));
  const sem = semester.split(' ')[1];

  let semValue = 0;
  if (sem === '겨울') semValue = 40;
  else if (sem === '2학기') semValue = 30;
  else if (sem === '여름') semValue = 20;
  else if (sem === '1학기') semValue = 10;

  return year * 100 + semValue;
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
      {reviewInfoList
        .sort((a, b) => {
          return (
            convertSemesterToNumber(b.enrollSems) -
            convertSemesterToNumber(a.enrollSems)
          );
        })
        .map((item, index) => (
          <LectureReviewListItem key={index} reviewItem={item} />
        ))}
    </div>
  ) : (
    <NoneLectureReviewPostInfoListItem />
  );
}
