import { socket } from "../network/socket";
import { updateNewPosts } from "./post.reducer";

export const subscribeToEvent = (event, callback) => {
    socket.on(event, callback);
  };

export const subscribeToUpdateEvents = () => (dispatch) => {
    subscribeToEvent("realTimeNewPostUpdates", (data) => {
        dispatch(updateNewPosts(data));
    });
};

