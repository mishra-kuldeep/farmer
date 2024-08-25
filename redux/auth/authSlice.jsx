import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "@/services/AuthServices";
import { setToken } from "@/helper/common";

const initialState = {
  name: "",
  profile: null,
  isLoggedIn: false,
  isLoading: false,
  isAdmin: false,
  error: "",
  success: "",
  message: "",
};

// Async thunk for registration
export const registration = createAsyncThunk(
  "user/registration",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthService.registration(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk for fetching user info
export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await AuthService.getUserInfo();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    clearUser: (state) => {
      return {}; // or reset to initial state
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling login actions
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.success = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.profile = action.payload.user;
        state.message = action.payload.msg;
        state.isLoggedIn = true;
        setToken(action?.payload?.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.profile = null;
        state.error = action?.payload?.error || "Login failed";
        state.success = action?.payload?.success;
      })

      // Handling fetchUserInfo actions
      .addCase(fetchUserInfo.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        state.success = "";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.profile = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.profile = null;
        state.success = false;
      })

      // Handling registration actions
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.success = "";
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        // state.profile = action.payload.user;
        state.message = action.payload.message;
        state.isLoggedIn = true;
      })
      .addCase(registration.rejected, (state, action) => {
        state.isLoading = false;
        state.profile = null;
        state.error = action.payload.error || "Registration failed";
        state.success = action.payload.success;
      });
  },
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
