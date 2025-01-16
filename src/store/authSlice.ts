import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState, IUser } from "./types";
import { Status } from "../globals/types";
import APT from "../http/index";
import { AppDispatch } from "./store";

const initialState: IAuthState = {
  user: {
    username: null,
    email: null,
    password: null,
  },
  status: Status.LOADING,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: IAuthState, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setStatus(state: IAuthState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setUser, setStatus } = authSlice.actions;
export default authSlice.reducer;

export function registerUser(data: IUser) {
  return async function registerUserThunk(dispatch: AppDispatch) {
    try {
      const res = await APT.post(
        "/auth/register",
        data
      );
      console.log(res);
      if (res.status === 200) {
        dispatch(setUser(res.data));
        dispatch(setStatus(Status.SUCCESS));
      } else dispatch(setStatus(Status.ERROR));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
  
export function loginUser(data: IUser) {
  return async function loginUserThunk(dispatch: AppDispatch) {
    try {
      // const res = await axios.post(
      //   "http://localhost:3000/api/auth/login",
      //   data
      // );
      const res = await APT.post(
        "/auth/login",
        data
      );
      console.log(res);
      if (res.status === 200) {
        dispatch(setUser(data));
        dispatch(setStatus(Status.SUCCESS));
      } else dispatch(setStatus(Status.ERROR));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

function forgotPassword(data: { email: string }) {
  return async function forgotPasswordThunk(dispatch: AppDispatch) {
    try {
      // const res = await axios.post(
      //   "http://localhost:3000/api/auth/forgot-password",
      //   data
      // );
      const res = await APT.post(
        "/auth/forgot-password",
        data
      );
      console.log(res);
      if (res.status === 201) {
        dispatch(setUser(res.data));
        dispatch(setStatus(Status.SUCCESS));

      } else dispatch(setStatus(Status.ERROR));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
