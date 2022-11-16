import React from 'react';

export const useCombinedRefs = <T extends React.ReactNode>(...refs: React.Ref<T>[]) => {
  const targetRef = React.useRef(null)

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        (ref as any).current = targetRef.current
      }
    })
  }, [refs])

  return targetRef
};
