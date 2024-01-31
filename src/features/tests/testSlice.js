import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import testsService from "./testsService";

const initialState = {
  test: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
export const getTest = createAsyncThunk(
  "test/getTest",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await testsService.getTest(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const createResult = createAsyncThunk(
  "test/createResult",
  async ({ id, answers }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await testsService.createResult(id, answers, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteTest = createAsyncThunk(
  "test/deleteTest",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await testsService.deleteTest(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    remove: (state) => {
      state.test = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.test = action.payload;
      })
      .addCase(getTest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTest.fulfilled, (state) => initialState)
      .addCase(deleteTest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default testSlice.reducer;
export const { reset, remove } = testSlice.actions;
