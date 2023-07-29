import axios from "axios";

export const baseUrlRemote = "https://dark-red-catfish-tux.cyclic.app";
export const baseUrlLocal = "http://localhost:3000";

export const getBaseUrl = () => baseUrlLocal;
export const url = `${getBaseUrl()}/nearby`;
export const fetchData = async (latitude, longitude) => {
  console.log(">>>>> fetchData", { latitude, longitude });

  try {
    const response = await axios.get(url, {
      params: {
        latitude,
        longitude,
      },
    });
    console.log("response", { response: response.data });
    return response.data;
  } catch (e) {
    console.log({ e });
  }
};
