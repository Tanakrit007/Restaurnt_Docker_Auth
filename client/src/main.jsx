import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import NavBar from "./components/NavBar.jsx";
import router from "./routes/Router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NavBar />
    <RouterProvider router={router} />
  </StrictMode>
);
