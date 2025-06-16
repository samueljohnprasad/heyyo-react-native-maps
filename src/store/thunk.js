import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { getBaseUrl } from '../../helpers';

export const postTheMessage = createAsyncThunk(
  'posts/postTheMessage',
  async ({ callBackFunction, ...postDetails }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/post`, postDetails);

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
  },
);

export const getNearByMePost = createAsyncThunk(
  'posts/getNearByMePost',
  async ({ latitude, longitude, distance }, { rejectWithValue }) => {
    try {

      const response = await axios.get(`${getBaseUrl()}/locations/nearby`, {
        params: {
          latitude,
          longitude,
          distance: parseInt(distance, 10),
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
  },
);
