import React, { useCallback } from 'react';
import cs from 'classnames';

import { SquareButton } from './elements';
import { FullSpace } from 'components/layout/full-space';

interface IAlphaFilter {
  activeLetter?: string;
  onChange?: (letter: string) => void;
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export const AlphaFilter = ({ activeLetter, onChange }: IAlphaFilter) => {
  const onLetterChange = useCallback((letter: string) => () => {
    onChange && onChange(letter === activeLetter ? '' : letter);
  }, [onChange, activeLetter]);

  return (
    <div>
      <FullSpace size={4} wrap>
        <SquareButton
          onClick={onLetterChange('all')}
          className={cs({ active: 'all' === activeLetter?.toLowerCase() })}
        >
          all
        </SquareButton>
        {Array
          .from(alphabet)
          .map(letter => (
            <SquareButton
              onClick={onLetterChange(letter)}
              className={cs({ active: letter === activeLetter?.toLowerCase() })}
              key={letter}
            >
              {letter}
            </SquareButton>
          ))}
      </FullSpace>
    </div>
  );
};
