'use client';

import React from 'react';
import ScrollToTop from 'react-scroll-up';

export default function ScrollToBottomTop() {
  return (
    <div>
      <ScrollToTop
        showUnder={160}
        style={{
          marginRight: '5rem',
          marginBottom: '7rem',
          padding: '0.4rem',
          backgroundColor: 'gray',
          borderRadius: '10rem',
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='35'
          viewBox='0 -960 960 960'
          width='35'
          fill='white'
        >
          <path d='M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z' />
        </svg>
      </ScrollToTop>
    </div>
  );
}
