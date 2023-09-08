import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    hasPrev: true,
    hasNext: true,
    page: 1,
    quantity: 3,
    editTodo: "",
    isEdit: false,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload.todo);
    },
    getTodo(state, action) {
      state.todos = action.payload.todos;
      state.hasNext = action.payload.hasNext;
      state.hasPrev = action.payload.hasPrev;
    },
    changeStatus(state, action) {
      const todoIndex = state.todos.findIndex(
        (todo) => todo._id === action.payload.todoId
      );
      state.todos[todoIndex].completed = action.payload.completed;
      state.todos[todoIndex].title = action.payload.title;
    },
    delTodo(state, action) {
      state.todos = state.todos.filter(
        (todo) => todo._id !== action.payload.todoId
      );
    },
    setEdit(state, action) {
      state.editTodo = action.payload.todo;
      state.isEdit = true;
    },
    removeEdit(state, action) {
      state.editTodo = "";
      state.isEdit = false;
    },
    changePage(state, action) {
      state.page = action.payload.newpage;
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice;
