import React, { useEffect, useState } from 'react';
import LectureReviewListItem from './LectureReviewListItem';
import NoneLectureReviewPostInfoListItem from './NoneLectureReviewPostInfoListItem';

export interface ReviewInfo {
  cid: number;
  content: string;
  enrollSems: string;
  progress_id: number;
  rate: number;
  recmndCnt: number;
  user_id: string;
}

interface LectureReviewListProps {
  pid: string;
  lectureReviewInfoList: ReviewInfo[];
}

export default function LectureReviewList({
  pid,
  lectureReviewInfoList,
}: LectureReviewListProps) {
  return (
    <div className='mt-4'>
      {lectureReviewInfoList.length > 0 ? (
        lectureReviewInfoList
          .slice(0, 2)
          .map((item, index) => (
            <LectureReviewListItem key={index} id={pid} item={item} />
          ))
      ) : (
        <NoneLectureReviewPostInfoListItem />
      )}
    </div>
  );
}
