import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import styles from "./SingleTodo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateTodoServer } from "../../store/todo/todo-action";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteTodoServer } from "../../store/todo/todo-action";
import { todoActions } from "../../store/todo/todo-slice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "flex-start",
  color: theme.palette.text.primary,
}));

function SingleTodo({ todo }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [check, setCheck] = useState(todo.completed ? true : false);

  const changeStatusHandler = () => {
    const updatedData = {
      todoId: todo._id,
      completed: !todo.completed,
      title: todo.title,
    };
    dispatch(updateTodoServer(updatedData, token, true, setCheck));
  };

  const deleteTodoHandler = () => {
    const todoId = todo._id;
    dispatch(deleteTodoServer(todoId, token));
  };

  const editTodoHandler = () => {
    dispatch(todoActions.setEdit({ todo }));
  };

  return (
    <Item>
      <div className={styles.todoItem}>
        <input type="checkbox" checked={check} onChange={changeStatusHandler} />
        <span className={styles.title}>{todo.title}</span>
        <span className={styles.status}>
          status:{todo.completed === false ? "Active" : "Completed"}
        </span>
        <IconButton onClick={editTodoHandler}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={deleteTodoHandler}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Item>
  );
}

export default SingleTodo;
