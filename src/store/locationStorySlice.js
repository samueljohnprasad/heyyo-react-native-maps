import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../network/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper to get auth token
const getAuthHeaders = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  } catch (error) {
    console.error('Error getting auth token:', error);
    return { headers: {} };
  }
};

// Async Thunks
export const fetchNearbyStories = createAsyncThunk(
  'locationStory/fetchNearbyStories',
  async ({ latitude, longitude, radius = 10000 }, { rejectWithValue }) => {
    try {
      const authConfig = await getAuthHeaders();
      const response = await axios.get(`${API_URL}/api/location-stories/nearby`, {
        params: { lat: latitude, lng: longitude, radius },
        ...authConfig,
      });

      console.log('response.data',response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch nearby stories'
      );
    }
  }
);

export const fetchStoryById = createAsyncThunk(
  'locationStory/fetchStoryById',
  async (storyId, { rejectWithValue }) => {
    try {
      const authConfig = await getAuthHeaders();
      const response = await axios.get(
        `${API_URL}/api/location-stories/${storyId}`,
        authConfig
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch story details'
      );
    }
  }
);

export const createLocationStory = createAsyncThunk(
  'locationStory/createLocationStory',
  async (storyData, { rejectWithValue }) => {
    try {
      const authConfig = await getAuthHeaders();
      const response = await axios.post(
        `${API_URL}/api/location-stories`,
        storyData,
        authConfig
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create location story'
      );
    }
  }
);

export const addContribution = createAsyncThunk(
  'locationStory/addContribution',
  async ({ storyId, content, media = [] }, { rejectWithValue }) => {
    try {
      const authConfig = await getAuthHeaders();
      const response = await axios.post(
        `${API_URL}/api/location-stories/${storyId}/contribute`,
        { content, media },
        authConfig
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add contribution'
      );
    }
  }
);

export const fetchUserStories = createAsyncThunk(
  'locationStory/fetchUserStories',
  async (_, { rejectWithValue }) => {
    try {
      const authConfig = await getAuthHeaders();
      const response = await axios.get(`${API_URL}/api/location-stories/user`, authConfig);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user stories'
      );
    }
  }
);

// Slice
const locationStorySlice = createSlice({
  name: 'locationStory',
  initialState: {
    nearbyStories: [],
    currentStory: null,
    userStories: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentStory: (state) => {
      state.currentStory = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Nearby Stories
    builder
      .addCase(fetchNearbyStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNearbyStories.fulfilled, (state, action) => {
        state.loading = false;
        state.nearbyStories = action.payload;
      })
      .addCase(fetchNearbyStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Story By ID
    builder
      .addCase(fetchStoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStory = action.payload;
      })
      .addCase(fetchStoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create Location Story
    builder
      .addCase(createLocationStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLocationStory.fulfilled, (state, action) => {
        state.loading = false;
        state.nearbyStories = [...state.nearbyStories, action.payload];
        if (state.userStories) {
          state.userStories = [...state.userStories, action.payload];
        }
      })
      .addCase(createLocationStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add Contribution
    builder
      .addCase(addContribution.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContribution.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStory = action.payload;
        
        // Update the story in nearbyStories if it exists there
        const index = state.nearbyStories.findIndex(
          (story) => story._id === action.payload._id
        );
        if (index !== -1) {
          state.nearbyStories[index] = action.payload;
        }
        
        // Update in userStories if it exists there
        if (state.userStories) {
          const userIndex = state.userStories.findIndex(
            (story) => story._id === action.payload._id
          );
          if (userIndex !== -1) {
            state.userStories[userIndex] = action.payload;
          }
        }
      })
      .addCase(addContribution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch User Stories
    builder
      .addCase(fetchUserStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserStories.fulfilled, (state, action) => {
        state.loading = false;
        state.userStories = action.payload;
      })
      .addCase(fetchUserStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentStory } = locationStorySlice.actions;
export default locationStorySlice.reducer;
