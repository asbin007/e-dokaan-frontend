import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "./types";
const userInfo: User = {
  name: "asbin",
  age: "23",
};
const userSlice=createSlice({
  name: "user",
  initialState: {
    user: userInfo,
  },
  reducers: {
    setName(state: User, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setAge(state: User, action: PayloadAction<string>) {
      state.age = action.payload
    },
  },
});

// action
// const setName = userSlice.action.setName;
// const setAge = userSlice.action.setAge;
export const {setName,setAge}=userSlice.actions

export default userSlice.reducer;