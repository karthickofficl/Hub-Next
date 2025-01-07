// import {configureStore} from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
// export const store = configureStore({
// reducer: {
// auth: authReducer,
// }
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// NEW

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import authReducer from "./slices/authSlice"; // Your auth reducer

// Persist configuration
const persistConfig = {
  key: "root", // Key for storage
  storage, // Default to localStorage
};

// Apply persist reducer to auth slice
const persistedReducer = persistReducer(persistConfig, authReducer);

// Create store with persisted reducer
export const store = configureStore({
  reducer: {
    auth: persistedReducer, // Persisted auth slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Create persistor for Redux Persist
export const persistor = persistStore(store);

// Types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
