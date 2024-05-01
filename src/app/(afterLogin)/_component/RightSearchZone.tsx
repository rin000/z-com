'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import style from './rightSearchZone.module.css';
import SearchForm from './SearchForm';

export default function RightSearchZone() {
  const pathname = usePathname();
  // useSearchParams()는 수정 불가
  const searchParams = useSearchParams();
  const router = useRouter();

  const onChangeFollow = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('pf', 'on');
    // toString()은 전체를 가져온다.
    router.replace(`/search?${newSearchParams.toString()}`);
  };

  const onChangeAll = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('pf');
    // toString()은 전체를 가져온다.
    router.replace(`/search?${newSearchParams.toString()}`);
  };

  if (pathname === '/explore') {
    return null;
  }

  if (pathname === '/search') {
    return (
      <div>
        <h5 className={style.filterTitle}>검색 필터</h5>
        <div className={style.filterSection}>
          <div>
            <label>사용자</label>
            <div className={style.radio}>
              <div>모든 사용자</div>
              <input type="radio" name="pf" defaultChecked onChange={onChangeAll} />
            </div>
            <div className={style.radio}>
              <div>내가 팔로우하는 사람들</div>
              <input type="radio" name="pf" value="on" onChange={onChangeFollow} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 60, width: 'inherit' }}>
      <SearchForm />
    </div>
  );
}
