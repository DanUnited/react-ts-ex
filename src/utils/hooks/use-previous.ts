import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T, defaultValue: T): T {
  const ref: any = useRef<T>(defaultValue);
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
