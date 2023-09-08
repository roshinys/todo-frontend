import { alertActions } from "../alert/alert-slice";
import { todoActions } from "./todo-slice";

const url = `${process.env.REACT_APP_BACKEND_URL}/todo`;

export const addTodoToServer = (todo, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data?.message);
      } else {
        const { todo } = data;
        dispatch(todoActions.addTodo({ todo: todo }));
        dispatch(
          alertActions.setAlert({
            content: data.message,
          })
        );
      }
    } catch (err) {
      dispatch(
        alertActions.setAlert({
          content: err && err.message ? err.message : "Something went wrong ",
        })
      );
    }
  };
};

export const getTodoFromServer = (token, page = 1) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data?.message);
      } else {
        const { todos, hasPrev, hasNext } = data;
        dispatch(todoActions.getTodo({ todos, hasPrev, hasNext }));
      }
    } catch (err) {
      dispatch(
        alertActions.setAlert({
          content: err && err.message ? err.message : "Something went wrong ",
        })
      );
    }
  };
};

export const updateTodoServer = (
  updatedData,
  token,
  statusChange,
  setCheck
) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data?.message);
      } else {
        dispatch(
          todoActions.changeStatus({
            todoId: updatedData.todoId,
            completed: updatedData.completed,
            title: updatedData.title,
          })
        );
        if (statusChange) {
          setCheck((prevState) => !prevState);
        } else {
          dispatch(todoActions.removeEdit());
        }
        dispatch(
          alertActions.setAlert({
            content: data.message,
          })
        );
      }
    } catch (err) {
      dispatch(
        alertActions.setAlert({
          content: err && err.message ? err.message : "Something went wrong ",
        })
      );
    }
  };
};

export const deleteTodoServer = (todoId, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify({ todoId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data?.message);
      } else {
        dispatch(todoActions.delTodo({ todoId }));
        dispatch(
          alertActions.setAlert({
            content: data.message,
          })
        );
      }
    } catch (err) {
      dispatch(
        alertActions.setAlert({
          content: err && err.message ? err.message : "Something went wrong ",
        })
      );
    }
  };
};
