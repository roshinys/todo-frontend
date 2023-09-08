import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import styles from "./Todo.module.css";
import Logout from "../Auth/Logout";

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
