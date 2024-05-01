import Home from '@/app/(afterLogin)/home/page';

// []: 슬러그
// params = [] 안의 값들이 params로 들어감
/*  params.username = elonmusk
params.id = 1
params.photoId = 1 */

type Props = {
  params: {
    username: string;
    id: string;
    photoId: string;
  };
};

export default function Page({ params }: Props) {
  return <Home />;
}
