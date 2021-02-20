import { createSlice } from "@reduxjs/toolkit";

export const themeSwitchSlice = createSlice({
  name: "theme",
  initialState: {},
  reducers: {
    updateTheme: (state, action) => {
      const { theme } = action.payload;
      return theme;
    },
  },
  extraReducers: {},
});
