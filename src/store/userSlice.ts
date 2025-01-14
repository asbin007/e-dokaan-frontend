import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "./types";
const userInfo: User = {
  name: "asbin",
  age: "23",
};
createSlice({
  name: "user",
  initialState: {
    user: userInfo,
  },
  reducers: {
    setName(state: User, action: PayloadAction<User>) {
      state.name = "lorem";
    },
    setAge(state: User, action: PayloadAction<User>) {
      state.age = "25";
    },
  },
});

// action
// const setName = userSlice.action.setName;
// const setAge = userSlice.action.setAge;
export const {setName,setAge}=userSlice.actions

export default userSlice.reducer;