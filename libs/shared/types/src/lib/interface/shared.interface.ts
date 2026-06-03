import * as React from 'react';
import { DarkModeToggleProps } from '../interface/types';

export interface ReactComponentType {
  default: React.ComponentType<DarkModeToggleProps>;
}

export interface FilterParams {
  searchTerm?: string;
  month?: number;
  year?: number;
}