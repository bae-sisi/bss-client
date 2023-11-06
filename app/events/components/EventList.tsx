'use client';

import React, { useEffect, useState } from 'react';
import EventListItem from './EventIListItem';
import NoneEventPostInfoListItem from './NoneEventPostInfoListItem';

export default function EventList() {
  const [isEventListReady, setIsEventListReady] = useState(false);

  useEffect(() => {
    setIsEventListReady(true);
  }, []);

  return isEventListReady ? (
    <tbody>
      <EventListItem />
      <EventListItem />
      <EventListItem />
      <EventListItem />
      <EventListItem />
      <EventListItem />
      <EventListItem />
      <EventListItem />
      <EventListItem />
      <EventListItem />
    </tbody>
  ) : (
    <NoneEventPostInfoListItem />
  );
}
