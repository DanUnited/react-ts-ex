import type { AxiosError } from 'axios';

import type { IApiError } from 'modules/api-requests/types';

const NEW_LINE = '\r\n\n';

const getFullMessage = (error: IApiError | null): string | undefined => {
  if (!error) {
    return undefined;
  }

  let fullMessage = error.stack;

  const apiError = error as AxiosError;
  if (apiError.isAxiosError && apiError.response && apiError.response.data.error) {
    const { config, response } = apiError;

    let query = '';
    const params = config.params;
    if (params) {
      const queryParams: string[] = [];
      for (const key in params) {
        queryParams.push(`${key}=${params[key]}`);
      }
      query = queryParams.join('&');
    }

    const requestDetails =
      'Client request: ' + config.method?.toUpperCase() + ' ' + config.url + (query ? '?' + query : '');

    const responseDetails = `Server response: Error ${response.status} ${response.statusText}: ${response.data.error}`;

    fullMessage = [requestDetails, responseDetails].join(NEW_LINE);
  }

  return fullMessage;
};

const log = (error: IApiError): void => {
  const fullMessage = getFullMessage(error);
  if (fullMessage) {
    console.error(fullMessage);
  }
};

export const ExceptionUtils = {
  getFullMessage,
  log,
};
