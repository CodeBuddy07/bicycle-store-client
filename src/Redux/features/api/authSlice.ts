/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

interface AuthState {
  token: string | null;
  user: {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: string;
    image: {
      publicId: string;
      url: string;
    }
  } | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("accessToken") || null,
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("accessToken", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      cartSlice.actions.clearCart(); // Clear cart
      localStorage.removeItem("accessToken"); // Clear token
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice;
