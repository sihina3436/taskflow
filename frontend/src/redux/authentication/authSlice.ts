import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
}

const getUserFromStorage = (): AuthState => {
  const stored = localStorage.getItem("user");
  return { user: stored ? JSON.parse(stored) : null };
};

const initialState: AuthState = getUserFromStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // ⭐ important
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
