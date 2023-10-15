'use client';

import React, { useEffect, useState } from 'react';
import FindMemeberListItem from './FindMemberListItem';
import NoneFindMemeberPostInfoListItem from './NoneFindMemeberPostInfoListItem';

export default function EventList() {
  const [isEventListReady, setIsEventListReady] = useState(false);

  useEffect(() => {
    setIsEventListReady(true);
  }, []);

  return isEventListReady ? (
    <tbody>
      <FindMemeberListItem />
      <FindMemeberListItem />
      <FindMemeberListItem />
      <FindMemeberListItem />
      <FindMemeberListItem />
      <FindMemeberListItem />
      <FindMemeberListItem />
      <FindMemeberListItem />
      <FindMemeberListItem />
      <FindMemeberListItem />
    </tbody>
  ) : (
    <NoneFindMemeberPostInfoListItem />
  );
}
