'use client';

import React, { useEffect, useState } from 'react';
import Event from './Event';
import FindMember from './FindMember';

export default function FindMemberList() {
  const [findMemberList, setFindMemberList] = useState([]);

  useEffect(() => {
    const fetchFindMemberList = async () => {
      try {
        const res = await fetch(`/api/get/limit/fidmem`, {
          method: 'GET',
        });
        const data = await res.json();

        setFindMemberList(data);
      } catch (err) {
        console.error('Fetch error:', err);
        throw err;
      }
    };

    fetchFindMemberList();
  }, []);

  console.log(findMemberList);

  return (
    <div>
      {findMemberList.length !== 0 ? (
        findMemberList.map((findMemberInfo, index) => (
          <FindMember key={index} findMemberInfo={findMemberInfo} />
        ))
      ) : (
        <div>조회된 모집 정보가 없습니다</div>
      )}
    </div>
  );
}
