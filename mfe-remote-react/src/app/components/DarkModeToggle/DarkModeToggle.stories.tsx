import type { Meta, StoryObj } from '@storybook/react';
import DarkModeToggle from './DarkModeToggle';

const meta: Meta<typeof DarkModeToggle> = {
  component: DarkModeToggle,
  title: 'Components/DarkModeToggle',
};

export default meta;
type Story = StoryObj<typeof DarkModeToggle>;

export const Default: Story = {
  args: {
    onToggle: (isDark: boolean) => console.log('Nút đã bấm! Dark mode:', isDark),
  },
};