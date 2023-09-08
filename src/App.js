import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import AlertNofication from "./Components/UI/AlertNotification";
import { useSelector } from "react-redux";
import Todo from "./Components/Todo/Todo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/todo" />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/todo",
    element: (
      <RequireAuth redirectTo="/auth">
        <Todo />
      </RequireAuth>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <AlertNofication />
    </>
  );
}

function RequireAuth(props) {
  const token = useSelector((state) => state.auth.token);
  return token !== undefined && token !== null ? (
    props.children
  ) : (
    <Navigate to={props.redirectTo} />
  );
}

export default App;
