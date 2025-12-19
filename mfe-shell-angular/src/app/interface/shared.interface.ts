import * as React from 'react';

interface DarkModeToggleProps {
    initialThemme?: 'light' | 'dark';
}

export interface ReactComponentType {
    default: React.ComponentType<DarkModeToggleProps>;
}