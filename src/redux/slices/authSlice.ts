import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  existingUser: any;
}

const initialState: AuthState = {
  token: null,
  existingUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ token: string; existingUser: any }>
    ) => {
      state.token = action.payload.token;
      state.existingUser = action.payload.existingUser;
      console.log("state", state.token);
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
    state.token = null;
    state.existingUser = null;
    localStorage.removeItem("token");
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
