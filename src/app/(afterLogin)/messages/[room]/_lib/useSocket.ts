import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// 소켓 공유
let socket: Socket | null;

export default function useSocket(): [Socket | null, () => void] {
  const { data: session } = useSession();

  const disconnect = useCallback(() => {
    socket?.disconnect();
    socket = null;
  }, []);

  useEffect(() => {
    if (!socket) {
      const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
        transports: ['websocket'], // 브라우저에서 소켓만 사용
      });
      socket.on('connect_error', (err) => {
        console.error(err);
        console.log(`connect_error due to ${err.message}`);
      });
    }
  }, [session]);

  useEffect(() => {
    if (socket?.connected && session?.user?.email) {
      socket.emit('login', { id: session?.user?.email });
    }
  });

  return [socket, disconnect];
}
