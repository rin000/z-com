import BackButton from '@/app/(afterLogin)/_component/BackButton';
import style from './singlePost.module.css';
import CommentForm from './_component/CommentForm';
import SinglePost from './_component/SinglePost';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getComments } from './_lib/getComments';
import Comments from './_component/Comments';
import { User } from '@/model/User';
import { Post } from '@/model/Post';
import { getUserServer } from '../../_lib/getUserServer';
import { getSinglePostServer } from './_lib/getSinglePostServer';

export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({ queryKey: ['users', params.username] });
  const post: Post = await getSinglePostServer({ queryKey: ['posts', params.id] });

  return {
    title: `Z에서 ${user.nickname} 님: ${post.content}`,
    description: post.content,
    openGraph: {
      title: `Z에서 ${user.nickname} 님: ${post.content}`,
      description: post.content,
      images:
        post.Images?.length > 0
          ? post.Images?.map((v) => ({
              url: `https://z.com${v.link}`,
              width: 600,
              height: 400,
            }))
          : [
              {
                url: `https://z.com${user.image}`,
                width: 400,
                height: 400,
              },
            ],
    },
  };
}

type Props = {
  params: {
    id: string;
    username: string;
  };
};

// 유저 개인 게시글
export default async function Page({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['posts', id], queryFn: getSinglePostServer });
  await queryClient.prefetchQuery({ queryKey: ['posts', id, 'comments'], queryFn: getComments });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        <SinglePost id={id} />
        <CommentForm id={id} />
        <div>
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
