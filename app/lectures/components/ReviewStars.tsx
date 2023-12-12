import React from 'react';
import uuid from 'react-uuid';

export default function ReviewStars({ totalRate }: { totalRate: number }) {
  const totalStars = 5;
  const stars = [];
  const uniqueId = uuid();

  for (let i = 0; i < totalStars; i++) {
    const fillPercentage = Math.max(0, Math.min(100, (totalRate - i) * 100));
    stars.push(
      <svg
        key={i}
        xmlns='http://www.w3.org/2000/svg'
        height='27'
        viewBox='0 -960 960 960'
        width='27'
        className='ml-[-0.25rem]'
      >
        <defs>
          <linearGradient id={`star-gradient-${uniqueId}-${i}`}>
            <stop offset={`${fillPercentage}%`} stopColor='orange' />
            <stop offset={`${fillPercentage}%`} stopColor='lightgrey' />
          </linearGradient>
        </defs>
        <path
          d='m480-214-159 96q-15 9-31 8t-28-10q-12-9-18-23.5t-2-31.5l42-182-141-122q-14-11-17-26.5t2-29.5q5-14 17-24t29-12l185-16 72-171q7-17 20.5-24.5T480-790q15 0 28.5 7.5T529-758l72 171 185 16q17 2 29 12t17 24q5 14 2 29.5T817-479L676-357l42 182q4 17-2 31.5T698-120q-12 9-28 10t-31-8l-159-96Z'
          fill={`url(#star-gradient-${uniqueId}-${i})`}
        />
      </svg>
    );
  }

  return <div className='flex justify-center items-center'>{stars}</div>;
}
