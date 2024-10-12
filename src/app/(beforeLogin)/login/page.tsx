import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import RedirectToLogin from '@/app/(beforeLogin)/login/_component/RedirectToLogin';
import Main from '../_component/main';
import React from 'react';

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    redirect('/home');

    return null;
  }

  return (
    <>
      <RedirectToLogin />
      <Main />
    </>
  );
}

// router.push -> 뒤로가기할때 이전 페이지로 간다.
// router.replace -> 뒤로가기할때 이전 페이지를 없애고 대체한다.
