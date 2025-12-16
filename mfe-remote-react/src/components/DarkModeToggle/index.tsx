import React, { useState } from "react";
import styles from './DarkModeToggle.module.css';

interface DarkModeToggleProps {
  onStateChange?: (isDark: boolean) => void;
}

export default function DarkModeToggle({ onStateChange }: DarkModeToggleProps) {
  const [dark, setDark] = useState(false);

  // Cách kết hợp class:
  const buttonClasses = `${styles.darkModeButton} ${dark ? styles.dark : styles.light}`
  const toggleHandler = () => {
    const newState = !dark;
    setDark(newState);
    if (onStateChange) {
      onStateChange(newState)
    }
  }

  return (
    // If Dark is true, appear Light text
    <button
      onClick={toggleHandler}
      className={buttonClasses}
    >
      {dark ? "Light" : "Dark"} Mode
    </button>
  );
};