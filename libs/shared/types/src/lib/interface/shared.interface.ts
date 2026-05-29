import * as React from 'react';
import { DarkModeToggleProps } from '@micro-expense-tracker/shared/types';
export interface ReactComponentType {
  default: React.ComponentType<DarkModeToggleProps>;
}

export interface FilterParams {
  searchTerm?: string;
  month?: number;
  year?: number;
}