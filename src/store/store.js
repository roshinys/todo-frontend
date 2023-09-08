import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth-slice";
import alertSlice from "./alert/alert-slice";
import todoSlice from "./todo/todo-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    alert: alertSlice.reducer,
    todos: todoSlice.reducer,
  },
});

export default store;
