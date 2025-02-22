import { AppDispatch } from "./store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types";
import { API, APIWithToken } from "../http";

// Define the interface for a category
interface ICategory {
  id: string;
  categoryName: string;
}

// Define the initial state interface for categories
interface ICategoryInitialState {
  items: ICategory[];
  status: Status;
}

// Initialize the state with empty items and loading status
const initialState: ICategoryInitialState = {
  items: [],
  status: Status.LOADING,
};

// Create a slice of state named 'category'
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // Action to set all category items at once
    setItems(state, action: PayloadAction<ICategory[]>) {
      state.items = action.payload;
    },

    // Action to update the status of fetching categories (e.g., LOADING, SUCCESS, ERROR)
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload as Status;
    },

    // Action to delete a category item by its ID
    deleteCategoryItem(state, action: PayloadAction<string>) {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

// Export actions from this slice so they can be used in other parts of your app.
export const { setItems, setStatus, deleteCategoryItem } =
  categorySlice.actions;

export default categorySlice.reducer;

export function addCategoryItem(categoryName: string) {
  return async function addCategoryItemThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWithToken.post("/category", { categoryName });
      if (response.status == 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
export function fetchingCategory() {
  return async function fetchingCategoryThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get("/category");
      if (response.status == 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function setDeleteCategoryItem(id: string) {
  return async function deleteCategoryItemThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWithToken.delete("/category/" + id);
      if (response.status == 200) {
        dispatch(deleteCategoryItem(id));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function updateCategoryItem(id: string, categoryName: string) {
  return async function updateCategoryItemThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWithToken.patch(`/category/${id}`, {
        categoryName,
      });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
