'use client';

import React, { useEffect, useState } from 'react';
import ProfInfo from './components/ProfInfo';
import Loading from '../loading';
import NoneProfInfo from './components/NoneProfInfo';

export default function ProfInfos() {
  const [profInfos, setProfInfos] = useState([]);
  const [isProfInfoListReady, setIsProfInfoListReady] = useState(false);

  useEffect(() => {
    const fetchProfInfos = async () => {
      try {
        const res = await fetch(`/api/get/all/profInfo`, {
          method: 'GET',
        });
        const data = await res.json();
        setProfInfos(data);
        setIsProfInfoListReady(true);
      } catch (err) {
        console.error('Fetch error:', err);
        throw err;
      }
    };

    fetchProfInfos();
  }, []);

  return isProfInfoListReady ? (
    <div className='mt-2 px-5 2lg:px-0 overflow-x-auto'>
      <div className='flex flex-col w-[60rem] mx-auto'>
        <p className='flex items-center gap-3'>
          <img
            src='/images/icons/person_flag.png'
            alt='logo'
            style={{ width: '47.5px' }}
          />
          <span className='text-2xl font-semibold'>교수 정보</span>
        </p>
        <div className='mt-10 mb-10 grid grid-cols-2 gap-7'>
          {false ? (
            profInfos.map((profInfo, index) => (
              <ProfInfo key={index} profInfo={profInfo} />
            ))
          ) : (
            <NoneProfInfo />
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
