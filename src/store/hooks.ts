import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch,RootState } from "./store";

// useAppDispatch=useDispatch + type
// yo chai type dina lina ko lagi ho ts ma 

export const useAppDispatch= useDispatch.withTypes<AppDispatch>()
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;