import { createSlice } from '@reduxjs/toolkit';
import {User} from '../utils/objects';

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
      setUsers: (state, action) => {
        return action.payload;
      },
    },
  });

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {},
  reducers: {
    setCurrentUser: (state, action) => {
      return action.payload;
    },
  },
});

const currentFeaturesSlice = createSlice({
  name: 'currentFeatures',
  initialState: [],
  reducers: {
    setCurrentFeatures: (state, action) => {
      return action.payload;
    },
    updateFeatureVote: (state, action) => {
      const featureIndex = state.findIndex(
        (feature) => feature.id === action.payload.id
      );
      if (featureIndex !== -1) {
        state[featureIndex].votes = action.payload.votes;
      }
    },
  },
});

export const { setUsers } = usersSlice.actions;
export const { setCurrentUser } = currentUserSlice.actions;
export const { setCurrentFeatures, updateFeatureVote } = currentFeaturesSlice.actions;

export const usersReducer = usersSlice.reducer;
export const currentUserReducer = currentUserSlice.reducer;
export const currentFeaturesReducer = currentFeaturesSlice.reducer;
