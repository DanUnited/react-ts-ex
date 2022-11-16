import { useCallback, useEffect, useRef, MutableRefObject } from 'react';

function useCommittedRef<TValue>(
  value: TValue,
): MutableRefObject<TValue> {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}

export function useEventCallback<TCallback extends (...args: any[]) => any>(
  fn?: TCallback | null,
): TCallback {
  const ref = useCommittedRef(fn);

  return useCallback((...args: any[]) => (
    ref.current && ref.current(...args)
  ), [ref]) as any;
}

export default useEventCallback;
