import * as React from 'react';

export interface ReactComponentType {
  MuiDarkModeToggle: React.ComponentType<DarkModeToggleProps>;
}

export interface DarkModeToggleProps {
  onThemeChange?: (isDark: boolean) => void;
  isDark?: boolean;
}

export interface FilterParams {
  searchTerm?: string;
  month?: number;
  year?: number;
}