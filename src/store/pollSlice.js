import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../network/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAuthHeaders = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  } catch (error) {
    return { headers: {} };
  }
};

export const createPoll = createAsyncThunk(
  'poll/createPoll',
  async (pollData, { rejectWithValue }) => {
    try {
      const authConfig = await getAuthHeaders();
      const response = await axios.post(
        `${API_URL}/api/polls`,
        pollData,
        authConfig,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create poll',
      );
    }
  },
);

export const fetchNearbyPolls = createAsyncThunk(
  'poll/fetchNearbyPolls',
  async ({ latitude, longitude, radius = 5000 }, { rejectWithValue }) => {
    try {
      const authConfig = await getAuthHeaders();
      const response = await axios.get(`${API_URL}/api/polls/nearby`, {
        params: { lat: latitude, lng: longitude, radius },
        ...authConfig,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch polls',
      );
    }
  },
);

export const votePoll = createAsyncThunk(
  'poll/votePoll',
  async ({ pollId, optionIndex }, { rejectWithValue }) => {
    try {
      const authConfig = await getAuthHeaders();
      const response = await axios.post(
        `${API_URL}/api/polls/vote`,
        { pollId, optionIndex },
        authConfig,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to vote on poll',
      );
    }
  },
);

export const fetchPollById = createAsyncThunk(
  'poll/fetchPollById',
  async (pollId, { rejectWithValue }) => {
    try {
      const authConfig = await getAuthHeaders();
      const response = await axios.get(
        `${API_URL}/api/polls/${pollId}`,
        authConfig,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch poll',
      );
    }
  },
);

const pollSlice = createSlice({
  name: 'poll',
  initialState: {
    polls: [],
    currentPoll: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPoll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPoll.fulfilled, (state, action) => {
        state.loading = false;
        state.polls.push(action.payload);
      })
      .addCase(createPoll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchNearbyPolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNearbyPolls.fulfilled, (state, action) => {
        state.loading = false;
        state.polls = action.payload;
      })
      .addCase(fetchNearbyPolls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(votePoll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(votePoll.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPoll = action.payload;
      })
      .addCase(votePoll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPollById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPollById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPoll = action.payload;
      })
      .addCase(fetchPollById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pollSlice.reducer;
