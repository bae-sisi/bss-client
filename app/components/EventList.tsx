'use client';

import React, { useEffect, useState } from 'react';
import Event from './Event';

export default function EventList() {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    const fetchEventList = async () => {
      try {
        const res = await fetch(`/api/get/limit/event`, {
          method: 'GET',
        });
        const data = await res.json();

        setEventList(data);
      } catch (err) {
        console.error('Fetch error:', err);
        throw err;
      }
    };

    fetchEventList();
  }, []);

  console.log(eventList);

  return (
    <div>
      {eventList.length !== 0 ? (
        eventList.map((eventInfo, index) => (
          <Event key={index} eventInfo={eventInfo} />
        ))
      ) : (
        <div>조회된 행사 정보가 없습니다</div>
      )}
    </div>
  );
}
