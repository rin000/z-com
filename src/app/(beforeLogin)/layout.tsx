import { ReactNode } from 'react';
import * as styles from '@/app/(beforeLogin)/_component/main.css';

type Props = { children: ReactNode; modal: ReactNode };

export default function Layout({ children, modal }: Props) {
  return (
    <div className={styles.container}>
      {children}
      {modal}
    </div>
  );
}

/* 주소가 z.com일 때는 children -> page.tsx, 
                         modal -> @modal/default.tsx가 된다. */
/* 주소가 localhost:3000/i/flow/login때는 children -> i/flow/login/page.tsx,
                                            modal -> @modal/i/flow/login/page.tsx */
