import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import AppointmentsContextProvider from "./contexts/AppointmentsContextProvider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppointmentsContextProvider>
          <Toaster position="top-center" reverseOrder={true} />
          <App />
        </AppointmentsContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
