export async function getTrends() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hashtags/trends`, {
    next: {
      tags: ['trends'],
    },
    cache: 'no-store',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
