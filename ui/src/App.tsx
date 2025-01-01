import { ThemeProvider } from "@gravity-ui/uikit";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react/jsx-runtime";
import { router } from "./router";

function App() {
  return (
    <Fragment>
      <ThemeProvider theme="light">
        <RouterProvider router={router} />
        <ToastContainer />
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
