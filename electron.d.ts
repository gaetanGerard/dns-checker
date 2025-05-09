export {};

declare global {
  interface Window {
    electronAPI: {
      onThemeChanged: (callback: (isDarkMode: boolean) => void) => void;
      toggleTheme: (isDarkMode: boolean) => void;
    };
  }
}