import React, { useCallback, useState } from 'react';

type UseCollectionType = (initialValue?: string[]) =>
  [string[], (value: string) => void, React.Dispatch<React.SetStateAction<string[]>>];

export const useCollection: UseCollectionType = (initialValue = []) => {
  const [activeKeys, setActiveKeys] = useState<string[]>(initialValue);

  const onActiveKeyToggle = useCallback((keyName: string) => {
    const exists = activeKeys.includes(keyName);

    setActiveKeys([
      ...activeKeys,
      keyName
    ].filter(item => exists ? item !== keyName : true));
  }, [activeKeys]);

  return [activeKeys, onActiveKeyToggle, setActiveKeys]
};
