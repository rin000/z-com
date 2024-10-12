'use client';

import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import * as styles from '@/app/(beforeLogin)/_component/login.css';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

// 폴더 앞에 _(언더바)를 붙이면 프라이빗 폴더가 된다. 프라이빗 폴더는 폴더 정리용.
// 괄호()는 그룹폴더

// 패러랠 라우트 = @modal, 한개의 화면에 두개의 페이지를 동시에 보여준다.
// 패러랠 라우트는 layout.tsx의 {modal}이 실행된다.

// (.)i = 인터셉트 라우팅
// 새로고침할 때 i가 실행된다
// 링크 클릭할 때 (beforeLogin)의 i가 (.)i로 대체된다(인터셉트 라우팅)

export default function Page() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await signIn('credentials', {
        username: id,
        password,
        redirect: false,
      });
      if (!response?.ok) {
        setMessage('아이디와 비밀번호가 일치하지 않습니다.');
      } else {
        router.replace('/home');
      }
    } catch (err) {
      console.error(err);
      setMessage('아이디와 비밀번호가 일치하지 않습니다.');
    }
  };

  const onClickClose = () => {
    router.back();
  };

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClickClose}>
            <svg
              width={24}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
            >
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
          <div>로그인 하세요</div>
        </div>
        <form onSubmit={onSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.inputDiv}>
              <label className={styles.inputLabel} htmlFor="id">
                아이디
              </label>
              <input
                id="id"
                className={styles.input}
                value={id}
                onChange={onChangeId}
                type="text"
                placeholder=""
              />
            </div>
            <div className={styles.inputDiv}>
              <label className={styles.inputLabel} htmlFor="password">
                비밀번호
              </label>
              <input
                id="password"
                className={styles.input}
                value={password}
                onChange={onChangePassword}
                type="password"
                placeholder=""
              />
            </div>
          </div>
          <div className={styles.message}>{message}</div>
          <div className={styles.modalFooter}>
            <button className={styles.actionButton} disabled={!id && !password}>
              로그인하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
