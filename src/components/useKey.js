import { useEffect } from "react";

export function useKey(code, onAction) {
  useEffect(() => {
    function handleKeydown(e) {
      if (e.code === "Escape") onAction();
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [onAction]);
}
