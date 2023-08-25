import { socket } from "../network/socket";
import { updateNewPosts } from "./post.reducer";
import Toast from "react-native-toast-message";

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
            } else {
                Toast.show({
                    type: "error",
                    text1: "error in fetching new post",
                });
            }
        };

        socket.emit("postNewPost", newPost, callbackFun);
    };
