import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./AddTodo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../store/alert/alert-slice";
import {
  addTodoToServer,
  updateTodoServer,
} from "../../store/todo/todo-action";

function AddTodo() {
  const { isEdit, editTodo } = useSelector((state) => state.todos);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (isEdit) {
      setTitle(editTodo.title);
    }
  }, [isEdit, editTodo.title]);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && title.length === 0) {
      dispatch(alertActions.setAlert({ content: "Title Cannot be empty" }));
      return;
    }
    if (!isEdit) {
      const todo = { title };
      dispatch(addTodoToServer(todo, token));
    } else {
      const updatedData = {
        todoId: editTodo._id,
        completed: editTodo.completed,
        title: title,
      };
      dispatch(updateTodoServer(updatedData, token, false));
    }
  };

  return (
    <div className={styles.addTodo}>
      <h2>Add Todo</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={titleChangeHandler}
          />
          <Form.Text className="text-muted">Title Cannot be empty</Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          {isEdit ? "Edit Todo" : "Add Todo"}
        </Button>
      </Form>
    </div>
  );
}

export default AddTodo;
