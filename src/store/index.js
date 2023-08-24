import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import thunk from 'redux-thunk';
import postsSlice from './post.reducer';

const rootReducer = combineReducers({
    map: reducer,
    postsSlice,
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
