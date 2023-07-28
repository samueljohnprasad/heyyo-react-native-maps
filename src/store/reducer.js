import { createSlice } from "@reduxjs/toolkit";

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
      //console.log("reducer updateUserCurrentLocationAction", action.payload);
      state.userCurrentLocation.latitude = action.payload.latitude;
      state.userCurrentLocation.longitude = action.payload.longitude;
    },
    updateUserNameAndId: (state, action) => {
      console.log("updateUserNameAndId >>", { action });
      state.userDetails.userName = action.payload.userName;
      state.userDetails.id = action.payload.userId;
    },
  },
});

const { actions, reducer } = slice;
export const { updateUserCurrentLocationAction, updateUserNameAndId } = actions;
export default reducer;
