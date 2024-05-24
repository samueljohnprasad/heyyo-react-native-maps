/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import Toast from 'react-native-toast-message';
import { socket } from '../network/socket';
import { updateNewPosts } from './post.reducer';

// export const realTimeNewPostUpdates = () => (dispatch) => {
//   socket.on('realTimeNewPostUpdates', (data) => {
//     console.log('realTimeNewPostUpdates', data);
//     dispatch(updateNewPosts(data));
//   });
// };
export const x = 10;
export const postNewPost =
  ({ callBackFunction, ...newPost }) =>
  (dispatch) => {
    const callbackFun = (data) => {
      if (data.status === 200) {
        callBackFunction();
        dispatch(updateNewPosts({ post: data.newPost }));
      } else {
        Toast.show({
          type: 'error',
          text1: 'error in fetching new post',
        });
      }
    };

    socket.emit('postNewPost', newPost, callbackFun);
  };
