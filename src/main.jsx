import { createRoot } from "react-dom/client";
import "./index.css";

import AppRoutes from "./routes/AppRoutes.jsx";
import { TrackerProvider } from "./context/TrackerContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <TrackerProvider>
    <AppRoutes />
    <ToastContainer position="top-right" autoClose={2200} hideProgressBar />
  </TrackerProvider>
);
