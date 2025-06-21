"use client";

import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    console.log('Current theme:', theme);
    toggleTheme();
    console.log('Toggling theme...');
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg bg-charcoal-900 dark:bg-charcoal-100 hover:bg-charcoal-800 dark:hover:bg-charcoal-200 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 text-charcoal-300 dark:text-charcoal-700" />
      ) : (
        <SunIcon className="h-5 w-5 text-charcoal-300 dark:text-charcoal-700" />
      )}
    </button>
  );
} 