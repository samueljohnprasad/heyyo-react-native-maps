import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBaseUrl } from '../../helpers';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export const postTheMessage = createAsyncThunk(
    'posts/postTheMessage',
    async ({ callBackFunction, ...postDetails }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${getBaseUrl()}/post`,
                postDetails
            );

            if (response.status === 201) {
                callBackFunction();
                return response.data;
            }
            return rejectWithValue('error');
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Something went wrong!',
            });
            return rejectWithValue(e);
        }
    }
);

export const getNearByMePost = createAsyncThunk(
    'posts/getNearByMePost',
    async ({ latitude, longitude }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${getBaseUrl()}/nearby`, {
                params: {
                    latitude: latitude,
                    longitude: longitude,
                },
            });
            return response.data;
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'error in fetching nearby posts',
            });
            return rejectWithValue(e);
        }
    }
);
