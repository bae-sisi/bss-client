'use client';

import React, { useEffect, useState } from 'react';
import LectureListItem from './LectureListItem';
import NoneLecturePostInfoListItem from './NoneLecturePostInfoListItem';

export default function LectureList() {
  const [isEventListReady, setIsEventListReady] = useState(false);

  useEffect(() => {
    setIsEventListReady(true);
  }, []);

  return isEventListReady ? (
    <tbody>
      <LectureListItem />
      <LectureListItem />
      <LectureListItem />
      <LectureListItem />
      <LectureListItem />
      <LectureListItem />
      <LectureListItem />
      <LectureListItem />
      <LectureListItem />
      <LectureListItem />
    </tbody>
  ) : (
    <NoneLecturePostInfoListItem />
  );
}
