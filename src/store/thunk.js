import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBaseUrl } from "../../helpers";
import axios from "axios";

export const postTheMessage = createAsyncThunk(
  "posts/postTheMessage",
  async ({ callBackFunction, ...postDetails }, { rejectWithValue }) => {
    console.log("postTheMessage");
    try {
      const response = await axios.post(`${getBaseUrl()}/post`, postDetails);

      console.log("response>>>>", { response: response.data });

      if (response.status === 201) {
        callBackFunction();
        return response.data;
      }
      return rejectWithValue("error");
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
