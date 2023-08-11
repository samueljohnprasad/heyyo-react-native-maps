import axios from "axios";
import Toast from "react-native-toast-message";

export const baseUrlRemote = "https://dark-red-catfish-tux.cyclic.app";
export const baseUrlLocal = "http://localhost:3000";

export const getBaseUrl = () => baseUrlRemote;
export const url = `${getBaseUrl()}/nearby`;
export const fetchData = async (latitude, longitude) => {
  try {
    const response = await axios.get(url, {
      params: {
        latitude,
        longitude,
      },
    });

    return response.data;
  } catch (e) {
    Toast.show({
      type: "error",
      text1: "error in fetching nearby posts",
    });
  }
};
