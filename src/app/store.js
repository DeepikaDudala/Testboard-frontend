import { configureStore, createSlice } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import testsReducer from "../features/tests/testsSlice";
import testReducer from "../features/tests/testSlice";
import resultsReducer from "../features/results/resultsSlice";
import resultReducer from "../features/results/resultSlice";
import createTestReducer from "../features/tests/createTestSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tests: testsReducer,
    test: testReducer,
    results: resultsReducer,
    result: resultReducer,
    createTest: createTestReducer,
  },
});
