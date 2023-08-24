import { createSlice } from "@reduxjs/toolkit";
import { getNearByMePost } from "./thunk";
import { addCoordinateToClusters } from "./helpers";
export const initialState = {
    isLoading: false,
    isError: false,
    postNearByme: [
        [
            {
                userName: "",
                createAt: "",
                maxDistance: 0,
                userId: "",
                location: {
                    coordinates: [0, 0],
                },
            },
        ],
    ],
    userDetails: {
        userName: "",
        id: 0,
    },
};

export const postsSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        updateNewPosts: (state, action) => {
            const updatedClusters = addCoordinateToClusters(
                action.payload.post,
                state.postNearByme
            );
            state.postNearByme = [...updatedClusters];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getNearByMePost.fulfilled, (state, { payload }) => {
            state.postNearByme = payload;
        });
    },
});

const { actions, reducer } = postsSlice;
export const { updateNewPosts } = actions;
export default reducer;
