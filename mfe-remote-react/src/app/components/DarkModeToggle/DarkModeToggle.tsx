import { useState } from "react";
import styles from './DarkModeToggle.module.scss';
import { DarkModeToggleProps } from '@shared/types';

export default function DarkModeToggle({ onThemeChange }: DarkModeToggleProps) {
  const [dark, setDark] = useState(false);

  // Cách kết hợp class:
  const buttonClasses = `${styles.darkModeButton} ${dark ? styles.dark : styles.light}`
  const toggleHandler = () => {
    const newState = !dark;
    setDark(newState);
    if (onThemeChange) {
      onThemeChange(newState)
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