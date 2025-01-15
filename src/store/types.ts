import { Status } from "../globals/types";

export interface IUser {
    username: string | null;
    email: string | null;
    password: string | null;
  }
  export interface IAuthState {
    user: IUser;
    status: Status;
  }