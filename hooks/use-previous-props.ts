import { useEffect, useRef } from "react";

/**
 * Custom hook to get the previous value of a prop or state.
 * @param value - current value
 * @returns the previous value or undefined on first render
 */
export default function usePreviousProps<K>(value: K): K | undefined {
  const ref = useRef<K | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
