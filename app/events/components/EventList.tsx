'use client';

import React, { useEffect, useState } from 'react';
import Event from './Event';
import NoneEventPostInfo from './NoneEventPostInfo';

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
  // <NoneEventPostInfo />
}
