// [username]은 후 순위
// 유저 페이지
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import style from './profile.module.css';
import UserPosts from './_component/UserPosts';
import UserInfo from './_component/UserInfo';
import { getUserServer } from './_lib/getUserServer';
import { getUserPosts } from './_lib/getUserPosts';
import { auth } from '@/auth';
import { User } from '@/model/User';

export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({ queryKey: ['users', params.username] });

  return {
    title: `${user.nickname} (${user.id}) / Z`,
    description: `${user.nickname} (${user.id}) 프로필`,
  };
}

type Props = {
  params: { username: string };
};

export default async function Profile({ params }: Props) {
  const { username } = params;
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['users', username], queryFn: getUserServer });
  await queryClient.prefetchQuery({ queryKey: ['posts', 'users', username], queryFn: getUserPosts });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} session={session} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
