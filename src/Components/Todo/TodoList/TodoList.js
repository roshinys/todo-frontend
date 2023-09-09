import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodoFromServer } from "../../../store/todo/todo-action";
import styles from "./TodoList.module.css";
import { Stack } from "@mui/material";
import TodoPagination from "../../UI/TodoPagination/TodoPagination";
import { todoActions } from "../../../store/todo/todo-slice";
import SingleTodo from "../SingleTodo/SingleTodo";

function TodoList() {
  const token = useSelector((state) => state.auth.token);
  const { todos, hasPrev, page, hasNext } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodoFromServer(token, page));
  }, [dispatch, token, page]);

  const handlePrevPageChange = () => {
    dispatch(todoActions.changePage({ newpage: page - 1 }));
  };

  const handleNextPageChange = () => {
    dispatch(todoActions.changePage({ newpage: page + 1 }));
  };

  return (
    <div className={styles.todoListDiv}>
      <h2>List Of Todos</h2>
      {todos && todos.length === 0 && <p>No todos to show</p>}
      {todos && todos.length > 0 && (
        <>
          <Stack spacing={2}>
            {todos.map((todo) => {
              return <SingleTodo key={todo._id} todo={todo} />;
            })}
          </Stack>
          <TodoPagination
            onPrevChange={handlePrevPageChange}
            onNextChange={handleNextPageChange}
            hasNext={hasNext}
            hasPrev={hasPrev}
            page={page}
          />
        </>
      )}
    </div>
  );
}

export default TodoList;
