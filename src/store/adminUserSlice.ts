import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types";
import { AppDispatch } from "./store";
import { APIWithToken } from "../http";
export interface IUser {
  id: string;
  username: string;
  email: string;
  role:string;
}
interface IInitialState {
  users: IUser[];
  status: Status;
}

const initialState: IInitialState = {
  users: [],
  status: Status.LOADING,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state: IInitialState, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    },
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    deleteUser(state: IInitialState, action: PayloadAction<string>) {
      const index = state.users.findIndex((user) => user.id === action.payload);
      if (index !== -1) {
        state.users.splice(index, 1);
      }
    },
  },
});

export const { setUser, setStatus } = userSlice.actions;
export default userSlice.reducer;

export function fetchUsers() {
  return async function fetchUsersThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWithToken.get("/auth/users");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUser(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteUser(id: string) {
  return async function deleteUserThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWithToken.delete("/auth/users/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(deleteUser(id));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
