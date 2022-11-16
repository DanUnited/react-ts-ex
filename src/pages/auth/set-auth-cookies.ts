import moment from 'moment';
import { setCookie } from 'utils/cookie';

import type { ILoginResponse } from 'modules/api-requests/auth/types';

export function setAuthCookies(loginData: ILoginResponse) {
  const { TokenType, AccessToken, RefreshToken, ExpiresIn, IdToken } = loginData;
  const expires = moment().utc().add(30, 'days').toDate();

  setCookie('IdToken', IdToken, { expires });
  setCookie('TokenType', TokenType, { expires });
  setCookie('AccessToken', AccessToken, { expires });
  setCookie('ExpiresIn', moment().utc().add(ExpiresIn, 'seconds').toISOString(), { expires });

  if (RefreshToken) {
    setCookie('RefreshToken', RefreshToken, { expires });
  }
}
