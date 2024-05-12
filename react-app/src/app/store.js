import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { usersReducer, currentUserReducer, currentFeaturesReducer } from '../features/featuresSlice';

const initialState = {
  users: [],
  currentUser: {},
  currentFeatures: [],
}

const rootReducer = combineReducers({
  users: usersReducer,
  currentFeatures: currentFeaturesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
