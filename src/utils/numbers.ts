type ValueType = string | number;

export const formatNumber = (num: number, precision = 2) => (Math.round(num * 100) / 100).toFixed(precision);

export const InputNumberFormatter = (sign = '$') =>
  (value: ValueType | undefined, info: { userTyping: boolean; input: string; }) => {
    return value
      ? info.userTyping
        ? value.toString()
        : `${sign} ${formatNumber(Number(value))}`
      : '';
  };

export const InputNumberParser = (sign = '$') =>
  (value?: string) => {
    return value
      ? value.replace(sign, '')
      : '';
  };
