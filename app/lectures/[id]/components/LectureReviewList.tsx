'use client';

import React, { useEffect, useState } from 'react';
import LectureReviewListItem from './LectureReviewListItem';
import NoneLectureReviewPostInfoListItem from './NoneLectureReviewPostInfoListItem';

interface LectureReviewListProps {
  id: string;
}

export default function LectureReviewList(props: LectureReviewListProps) {
  const [isEventListReady, setIsEventListReady] = useState(false);

  useEffect(() => {
    setIsEventListReady(true);
  }, []);

  return isEventListReady ? (
    <div>
      <LectureReviewListItem id={props.id} />
      <LectureReviewListItem id={props.id} />
    </div>
  ) : (
    <NoneLectureReviewPostInfoListItem />
  );
}
