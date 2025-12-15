import React, { useState } from "react";
import styles from './DarkModeToggle.module.css';

console.log('Styles object:', styles); // 👈 THÊM DÒNG NÀY

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  // Cách kết hợp class:
  const buttonClasses = `${styles.darkModeButton} ${dark ? styles.dark : styles.light}`
  
  return (
    <button
      onClick={() => setDark(!dark)}
      className={buttonClasses} // ✅ Đã áp dụng cả ba class
    >
      {dark ? "Dark" : "Light"} Mode
    </button>
  );
};