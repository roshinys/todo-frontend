import React from "react";
import styles from "./Todo.module.css";
import Logout from "../Auth/Logout/Logout";
import AddTodo from "./AddTodo/AddTodo";
import TodoList from "./TodoList/TodoList";

function Todo() {
  return (
    <div className={styles.todoDiv}>
      <AddTodo />
      <TodoList />
      <Logout />
    </div>
  );
}

export default Todo;
