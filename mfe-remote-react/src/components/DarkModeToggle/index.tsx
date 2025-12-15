import React, { useState } from "react";
import styles from './DarkModeToggle.module.css';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  // Cách kết hợp class:
  const buttonClasses = `${styles.darkModeButton} ${dark ? styles.dark : styles.light}`
  
  return (
    // If Dark is true, appear Light
    <button
      onClick={() => setDark(!dark)}
      className={buttonClasses}
    >
      {dark ? "Light" : "Dark"} Mode
    </button>
  );
};