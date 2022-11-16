interface ICookieProps {
  expires?: string | Date;
  'max-age'?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  samesite?: string;
}

export const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)',
  ));

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name: string, value: any, props: ICookieProps = {}) => {
  const options: any = {
    path: '/',
    ...props,
  };

  const exp = options.expires;
  if (exp && exp instanceof Date) {
    options.expires = exp.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  Object.keys(options).forEach((optionKey) => {
    updatedCookie += '; ' + optionKey;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  });

  document.cookie = updatedCookie;
};

export const deleteCookie = (name: string) => {
  setCookie(name, null, { 'max-age': -1 });
};
