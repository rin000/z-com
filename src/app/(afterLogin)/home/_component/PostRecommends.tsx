'use client';

import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getPostRecommends } from '../_lib/getPostRecommends';
import { Post as IPost } from '@/model/Post';
import Post from '@/app/(afterLogin)/_component/Post';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import style from '../home.module.css';

export default function PostRecommends() {
  // fetchNextPage: 스크롤 내려가면 불러오기, hasNextPage: 데이터 다 불러왔을경우 false로 바뀐다
  // isFetched: 데이터를 가져오는 순간, isPending: 데이터 가져오기 전
  const { data, fetchNextPage, hasNextPage, isFetching, isPending, isLoading, isError } =
    useSuspenseInfiniteQuery<
      IPost[],
      Object,
      InfiniteData<IPost[]>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ['posts', 'recommends'],
      queryFn: getPostRecommends,
      initialPageParam: 0, // 페이지 5개씩 가져온다 (2차원 배열로 5개씩)
      getNextPageParam: (lastPage) => lastPage.at(-1)?.postId, // 마지막 페이지 5개 불러온것 중 마지막 페이지
      staleTime: 1000 * 60,
      gcTime: 300 * 1000,
    });
  const { ref, inView } = useInView({
    threshold: 0, // 보이면 호출
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg className={style.loader} height="100%" viewBox="0 0 32 32" width={40}>
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{ stroke: 'rgb(29, 155, 240)', opacity: 0.2 }}
          ></circle>
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{ stroke: 'rgb(29, 155, 240)', strokeDasharray: 80, strokeDashoffset: 60 }}
          ></circle>
        </svg>
      </div>
    );
  }

  if (isError) {
    return '에러 처리';
  }

  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
          <div ref={ref} style={{ height: 50 }} />
        </Fragment>
      ))}
    </>
  );
}
