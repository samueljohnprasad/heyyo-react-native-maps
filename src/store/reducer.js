import { createSlice } from "@reduxjs/toolkit";
import { postTheMessage } from "./thunk";
export const initialState = {
  isLoading: false,
  isError: false,
  userCurrentLocation: {
    latitude: 0,
    longitude: 0,
  },
  userDetails: {
    userName: "",
    id: 0,
  },
};

export const slice = createSlice({
  name: "map",
  initialState,
  reducers: {
    updateUserCurrentLocationAction: (state, action) => {
      state.userCurrentLocation.latitude = action.payload.latitude;
      state.userCurrentLocation.longitude = action.payload.longitude;
    },
    updateUserNameAndId: (state, action) => {
      state.userDetails.userName = action.payload.userName;
      state.userDetails.id = action.payload.userId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postTheMessage.fulfilled, (state, { payload }) => {
      state.isLoading = false;
    });

    builder.addCase(postTheMessage.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(postTheMessage.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

const { actions, reducer } = slice;
export const { updateUserCurrentLocationAction, updateUserNameAndId } = actions;
export default reducer;
