import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isLoading: false,
  isError: false,
  userCurrentLocation: {
    latitude: 0,
    longitude: 0,
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
  },
});

const { actions, reducer } = slice;
export const { updateUserCurrentLocationAction } = actions;
export default reducer;
