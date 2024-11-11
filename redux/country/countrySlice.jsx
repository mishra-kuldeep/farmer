import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "@/services/AuthServices";
import { setToken } from "@/helper/common";

const initialState = {

  isLoading: false,
 country:{},
  error: "",
  success: "",
  message: "",
};


// Async thunk for fetching user info
export const fetchCountry = createAsyncThunk(
  "/fetchCountry",
  async ( data,{ rejectWithValue }) => {
    try {
      return data;
    } catch (error) {
      return rejectWithValue("country get error");
    }
  }
);

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers:{
    clearCountry: (state) => {
      return {}; // or reset to initial state
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling fetchCountry actions
      .addCase(fetchCountry.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        state.success = "";
      })
      .addCase(fetchCountry.fulfilled, (state, action) => {
        state.isLoading = false;
       state.country=action.payload
      })
      .addCase(fetchCountry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "country get error";
      })
  },
});

export const { clearCountry } = countrySlice.actions;
export default countrySlice.reducer;
