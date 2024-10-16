import Image from 'next/image';
import * as styles from '@/app/(beforeLogin)/_component/main.css';
import zLogo from '../../../../public/zlogo.png';
import Link from 'next/link';
import React from 'react';

export default function Main() {
  return (
    <>
      <div className={styles.left}>
        <Image className={styles.leftImg} src={zLogo} alt="logo" />
      </div>
      <div className={styles.right}>
        <h1>지금 일어나고 있는 일</h1>
        <Link href="/i/flow/signup" className={styles.signup}>
          계정 만들기
        </Link>
        <h3>이미 트위터에 가입하셨나요?</h3>
        <Link href="/login" className={styles.login}>
          로그인
        </Link>
      </div>
    </>
  );
}
