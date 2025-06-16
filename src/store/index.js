import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import thunk from 'redux-thunk';
import postsSlice from './post.reducer';
import locationStoryReducer from './locationStorySlice';
import pollReducer from './pollSlice';

const rootReducer = combineReducers({
  map: reducer,
  postsSlice,
  locationStory: locationStoryReducer,
  poll: pollReducer,
});

export const reduxStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware({
    //     serializableCheck: false,
    //   }),
    middleware: [thunk],
  });
  return store;
};

export const store = reduxStore();
