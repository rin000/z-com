'use client';

import { faker } from '@faker-js/faker';
import style from '../message.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';
import { Room as Rooms } from '@/model/Room';
import { useSession } from 'next-auth/react';

dayjs.locale('ko');
dayjs.extend(relativeTime);

type Props = {
  room: Rooms;
};

export default function Room({ room }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const onClick = () => {
    router.push(`/messages/${room.room}`);
  };

  const user = room.Receiver.id === session?.user?.email ? room.Sender : room.Receiver;

  return (
    <div className={style.room} onClickCapture={onClick}>
      <div className={style.roomUserImage}>
        <img src={user.image} alt="" />
      </div>
      <div className={style.roomChatInfo}>
        <div className={style.roomUserInfo}>
          <b>{user.nickname}</b>
          &nbsp;
          <span>@{user.id}</span>
          &nbsp;
          <span className={style.postDate}>{dayjs(room.createdAt).fromNow(true)}</span>
        </div>
        <div className={style.roomLastChat}>{room.content}</div>
      </div>
    </div>
  );
}
