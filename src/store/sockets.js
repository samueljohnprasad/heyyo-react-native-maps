import { socket } from "../network/socket";
import { updateNewPosts } from "./post.reducer";

export const realTimeNewPostUpdates = () => (dispatch) => {
    socket.on("realTimeNewPostUpdates", (data) => {
        dispatch(updateNewPosts(data));
    });
};

export const postNewPost =
    ({ callBackFunction, ...newPost }) =>
    (dispatch) => {
        const callbackFun = (data) => {
            if (data.status == 200) {
                callBackFunction();
                dispatch(updateNewPosts({ post: data.newPost }));
            }
        };
        socket.emit("postNewPost", newPost, callbackFun);
    };
