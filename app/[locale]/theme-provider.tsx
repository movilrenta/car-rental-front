'use client';

import { ThemeProvider } from 'next-themes';

export default function Theme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system" // O un tema específico como 'light' o 'dark'
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
