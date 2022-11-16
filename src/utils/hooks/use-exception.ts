import { useEffect, useState } from 'react';
import { ExceptionUtils } from 'utils/exception';

import type { IApiError } from 'modules/api-requests/types';

type Props = {
  error: IApiError | null;
};

type ReturnProps = {
  message?: string;
  fullMessage?: string;
};

export const useException = (props: Props): ReturnProps => {
  const { error } = props;
  const { message } = error ?? {};

  const [fullMessage, setFullMessage] = useState<string>();

  // update error description
  useEffect(() => {
    setFullMessage(ExceptionUtils.getFullMessage(error));
  }, [error]);

  return {
    message,
    fullMessage,
  };
};

