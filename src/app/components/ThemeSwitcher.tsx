"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Asegura que el componente se monte correctamente en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-4">
      <button
        className={`px-4 py-2 rounded ${
          theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
        }`}
        onClick={() => setTheme('light')}
      >
        Light
      </button>
      <button
        className={`px-4 py-2 rounded ${
          theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
        }`}
        onClick={() => setTheme('dark')}
      >
        Dark
      </button>
      <button
        className={`px-4 py-2 rounded ${
          theme === 'system' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
        }`}
        onClick={() => setTheme('system')}
      >
        System
      </button>
    </div>
  );
}
