import { configureStore, createSlice } from "@reduxjs/toolkit";

const mainHeight = createSlice({
  name: "mainHeight",
  initialState: 7000,
  reducers: {
    setMainHeight: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMainHeight } = mainHeight.actions;

export default configureStore({
  reducer: {
    mainHeight: mainHeight.reducer,
  },
});
