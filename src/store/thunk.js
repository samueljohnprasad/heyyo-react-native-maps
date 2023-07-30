import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBaseUrl } from "../../helpers";
import axios from "axios";
import Toast from "react-native-toast-message";

export const postTheMessage = createAsyncThunk(
  "posts/postTheMessage",
  async ({ callBackFunction, ...postDetails }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/post`, postDetails);

      if (response.status === 201) {
        callBackFunction();
        return response.data;
      }
      return rejectWithValue("error");
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Something went wrong!",
      });
      return rejectWithValue(e);
    }
  }
);
