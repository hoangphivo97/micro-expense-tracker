import React, { useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  return (
    <button
      onClick={() => setDark(!dark)}
      style={{
        padding: "8px 16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        background: dark ? "#0f172a" : "#fff",
        color: dark ? "#f8fafc" : "#111",
        cursor: "pointer",
      }}
    >
      {dark ? "Dark" : "Light"} Mode
    </button>
  );
};

