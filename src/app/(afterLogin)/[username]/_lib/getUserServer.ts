import { cookies } from 'next/headers';

export const getUserServer = async ({ queryKey }: { queryKey: [string, string] }) => {
  const [_1, username] = queryKey;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`, {
    next: {
      tags: ['users', username],
    },
    cache: 'no-store',
    credentials: 'include',
    headers: { Cookie: cookies().toString() },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};
