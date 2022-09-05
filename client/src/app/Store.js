import { configureStore } from "@reduxjs/toolkit";

import diaryReducer from "./reducer/diarySlice";
import UserReducer from "./reducer/userSlice";

//slice -> store

export default configureStore({
  reducer: {
    diary: diaryReducer,
    user: UserReducer,
  },
});
