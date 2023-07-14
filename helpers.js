import axios from "axios";

export const remote = "https://dark-red-catfish-tux.cyclic.app/nearby";
export const local = "http://localhost:3000/nearby";
export const fetchData = async (latitude, longitude) => {
  console.log(">>>>> fetchData", { latitude, longitude });

  try {
    const response = await axios.get(remote, {
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
