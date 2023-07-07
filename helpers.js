import axios from "axios";
export const fetchData = async (latitude, longitude) => {
  console.log(">>>>> fetchData", { latitude, longitude });
  const remote = "https://dark-red-catfish-tux.cyclic.app/nearby";
  const local = "http://localhost:3000/nearby";
  try {
    const response = await axios.get(remote, {
      params: {
        latitude,
        longitude,
      },
    });

    return response.data;
  } catch (e) {
    console.log({ e });
  }
};
