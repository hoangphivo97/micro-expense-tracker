import React from 'react';
import styles from './DarkModeToggle.module.scss';

export default function DarkModeToggle({ onToggle }: { onToggle?: (isDark: boolean) => void }) {
  const [isDark, setIsDark] = React.useState(false);

  const handleToggle = () => {
    const newState = !isDark;
    setIsDark(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <button className={isDark ? styles.dark : styles.light} onClick={handleToggle}>
      {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}