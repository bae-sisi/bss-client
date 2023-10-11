'use client';

import React, { useEffect, useState } from 'react';
import Event from './FindMember';
import NoneFindMemeberPostInfo from './NoneFindMemeberPostInfo';

export default function EventList() {
  const [isEventListReady, setIsEventListReady] = useState(false);

  useEffect(() => {
    setIsEventListReady(true);
  }, []);

  return isEventListReady ? (
    <tbody>
      <Event />
      <Event />
      <Event />
      <Event />
      <Event />
      <Event />
      <Event />
      <Event />
      <Event />
      <Event />
    </tbody>
  ) : null;
  // <NoneFindMemeberPostInfo />
}
