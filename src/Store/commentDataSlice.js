import { createSlice } from "@reduxjs/toolkit";

export const commentDataSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    addNewCommentList: (state, action) => {
      const { commentList } = action.payload;
      let tempPostList = { ...state };
      tempPostList = commentList;
      return tempPostList;
    },
  },
  extraReducers: {},
});
