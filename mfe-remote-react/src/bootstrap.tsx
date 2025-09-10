// src/bootstrap.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import DarkModeToggle from "./components/DarkModeToggle"; // hoặc đường dẫn bạn đang dùng

const el = document.getElementById("root");
if (el) {
  ReactDOM.createRoot(el).render(<DarkModeToggle />);
}
