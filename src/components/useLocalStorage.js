import { useEffect, useState } from "react";

export function useLocalStorage(key) {
  const [value, setValue] = useState(() => {
    const movies = localStorage.getItem(key);
    if (movies) {
      return JSON.parse(movies);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
