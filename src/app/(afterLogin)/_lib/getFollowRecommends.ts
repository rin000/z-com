export async function getFollowRecommends() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/followRecommends`, {
    next: {
      tags: ['users', 'followRecommends'],
    },
    cache: 'no-store',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('failed to fetch data');
  }

  return res.json();
}
