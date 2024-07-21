import io from 'socket.io-client';
import Toast from 'react-native-toast-message';
import { getBaseUrlSocket } from '../helpers';

export const socket = io(getBaseUrlSocket(), {
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  transports: ['websocket'],
  forceNew: true,
  jsonp: false,
  path: '/myapp/socket.io',
  query: { token: 'token>>>' },
  autoConnect: false,
});

socket.on('connect_error', () => {
  Toast.show({
    type: 'error',
    text1: 'Socket connection error',
  });
});

socket.on('connect', () => {
  console.log('Connected to server');
});

export const x = 10;
