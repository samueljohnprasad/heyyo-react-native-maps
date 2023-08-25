import io from "socket.io-client";
import { getBaseUrl } from "../../helpers";
import Toast from "react-native-toast-message";

export const socket = io(getBaseUrl(), {
    reconnectionAttempts: 3,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
});
socket.on("connect_error", (error) => {
    Toast.show({
        type: "error",
        text1: "Socket connection error",
    });
});
