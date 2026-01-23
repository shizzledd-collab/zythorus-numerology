import { useEffect } from 'react';

export const useLocalStorageSync = (key, value) => {
  useEffect(() => {
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, value]);
};
