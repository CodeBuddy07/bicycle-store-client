import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Routes from "./router/Routes";
import { ToastContainer } from "react-toastify";
import { store } from "./Redux/store";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Routes} />
      <ToastContainer/>
    </Provider>
  </StrictMode>
);
