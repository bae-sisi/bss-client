'use client';

import React, { useEffect, useState } from 'react';
import PostListItem from './PostListItem';
import NonePostInfoListItem from './NonePostInfoListItem';

export default function PostList() {
  const [isEventListReady, setIsEventListReady] = useState(false);

  useEffect(() => {
    setIsEventListReady(true);
  }, []);

  return isEventListReady ? (
    <tbody>
      {[...Array(10)].map((_, index) => (
        <PostListItem key={index} index={index} />
      ))}
    </tbody>
  ) : (
    <NonePostInfoListItem />
  );
}
