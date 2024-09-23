import { socket } from '../network/socket';
import { updateNewPosts } from './post.reducer';

// export const subscribeToEvent = (event, callback) => {
//   socket.on(event, callback);
// };

export const subscribeToUpdateEvents = () => (dispatch) => {
  socket.on('realTimeNewPostUpdates', (data) => {
    dispatch(updateNewPosts({ post: data.post }));
  });
};

export const subscribeToEventUpdate = () => () => {
  socket.on('realTimeNewEventUpdate', (data) => {
    console.log('sdfssdfdssd', data);
  });
};
