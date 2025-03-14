import { writable } from 'svelte/store';

export type Theme = 'light' | 'oled';

const THEME_KEY = 'keyboard-practice-theme';

function createThemeStore() {
  const storedTheme = typeof window !== 'undefined' ? localStorage.getItem(THEME_KEY) as Theme || 'light' : 'light';
  const { subscribe, set } = writable<Theme>(storedTheme);

  return {
    subscribe,
    setTheme: (theme: Theme) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_KEY, theme);
      }
      set(theme);
    },
    toggle: () => {
      if (typeof window !== 'undefined') {
        const current = localStorage.getItem(THEME_KEY) as Theme || 'light';
        const newTheme = current === 'light' ? 'oled' : 'light';
        localStorage.setItem(THEME_KEY, newTheme);
        set(newTheme);
      }
    }
  };
}

export const theme = createThemeStore(); 