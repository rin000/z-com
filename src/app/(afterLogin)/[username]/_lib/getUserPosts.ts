import { Post } from '@/model/Post';
import { QueryFunction } from '@tanstack/query-core';

export const getUserPosts: QueryFunction<Post[], [_1: string, _2: string, string]> = async ({
  queryKey,
}) => {
  const [_1, _2, username] = queryKey;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}/posts/`, {
    next: {
      tags: ['posts', 'users', username],
    },
    cache: 'no-store',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};
