import { createSlice } from "@reduxjs/toolkit";

// export const createSurvey = createAsyncThunk(
//   "users/createSurvey",
//   async (_, thunkAPI) => {
//     const surveyId = String(thunkAPI.getState().surveys.length + 1);
//     return surveyId;
//   }
// );
export const userDataSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addNewUserList: (state, action) => {
      const { userList } = action.payload;
      let tempPostList = { ...state };
      tempPostList = userList;
      return tempPostList;
    },
  },
  extraReducers: {},
});
