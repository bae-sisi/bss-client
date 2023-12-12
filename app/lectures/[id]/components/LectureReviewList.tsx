import React, { useEffect, useState } from 'react';
import LectureReviewListItem from './LectureReviewListItem';
import NoneLectureReviewPostInfoListItem from './NoneLectureReviewPostInfoListItem';
import { LectureReviewInfo } from '../page';

interface LectureReviewListProps {
  pid: string;
  lectureReviewInfoList: LectureReviewInfo[];
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
