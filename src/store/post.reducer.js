/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getNearByMePost } from './thunk';
import { addCoordinateToClusters } from './helpers';

export const initialState = {
  isLoading: false,
  isError: false,
  postNearByme: [[]],
  selectedCluster: -1,
};

export const postsSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    updateNewPosts: (state, action) => {
      const updatedClusters = addCoordinateToClusters(
        action.payload.post,
        state.postNearByme,
      );

      state.postNearByme = [...updatedClusters];
    },
    updateSelectedCluster: (state, action) => {
      state.selectedCluster = action.payload.selectedCluster;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNearByMePost.fulfilled, (state, { payload }) => {
      state.postNearByme = payload;
    });
  },
});

const { actions, reducer } = postsSlice;
export const { updateNewPosts, updateSelectedCluster } = actions;
export default reducer;
