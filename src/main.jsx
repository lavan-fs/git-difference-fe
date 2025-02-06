import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Swagger from "./Swagger.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <BrowserRouter>
    <Routes>
      <Route path="/repositories/:owner/:repo/commit/:commit" element={<App />} />
      <Route path="/swagger" element={<Swagger />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
);
