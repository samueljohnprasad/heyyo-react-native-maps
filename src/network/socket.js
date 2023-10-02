import io from 'socket.io-client';
import Toast from 'react-native-toast-message';
import { getBaseUrlSocket } from '../../helpers';

export const socket = io(getBaseUrlSocket(), {
  reconnectionAttempts: 3,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  transports: ['websocket'],
  forceNew: true,
  jsonp: false,
  path: '/myapp/socket.io',
});
socket.on('connect_error', () => {
  Toast.show({
    type: 'error',
    text1: 'Socket connection error',
  });
});
export const x = 10;
