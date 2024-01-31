import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import testsService from "./testsService";

const questionsInitialState = {
  text: "",
  options: ["", "", "", ""],
  correctAnswer: "",
};

const initialState = {
  testName: "",
  questions: [questionsInitialState],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const submitCreateTest = createAsyncThunk(
  "createTest/submitCreateTest",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await testsService.createTest(data, token);
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

const createTestSlice = createSlice({
  name: "createTest",
  initialState,
  reducers: {
    reset: (state) => initialState,
    onAddQuestion: (state) => {
      state.questions.push(questionsInitialState);
    },
    onChange: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    onQuestionsChange: (state, action) => {
      const { name, value, index } = action.payload;
      state.questions[index][name] = value;
    },
    onOptionsChange: (state, action) => {
      const { value, questionIndex, optionIndex } = action.payload;
      state.questions[questionIndex].options[optionIndex] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitCreateTest.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(submitCreateTest.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.testName = "";
      state.questions = [questionsInitialState];
    });
    builder.addCase(submitCreateTest.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export default createTestSlice.reducer;
export const {
  onAddQuestion,
  onChange,
  onOptionsChange,
  onQuestionsChange,
  reset,
} = createTestSlice.actions;
