import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import resultsService from "./resultsService";
const initialState = {
  results: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
export const getAllResults = createAsyncThunk(
  "results/getAllResults",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await resultsService.getAllResults(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    reset: (state) => {
      state.results = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.results = action.payload;
      })
      .addCase(getAllResults.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default resultsSlice.reducer;
export const { reset } = resultsSlice.actions;
