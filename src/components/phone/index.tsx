import React, { Ref, useCallback, useContext, useEffect, useRef, useState } from 'react';
import cs from 'classnames';
import Form from 'antd/es/form';
import { PhoneNumberUtil } from 'google-libphonenumber';
import ReactPhoneInput from 'react-phone-input-2';

import SizeContext from 'antd/es/config-provider/SizeContext';
import { usePrevious } from 'utils/hooks/use-previous';
import { useCombinedRefs } from 'utils/hooks/use-combined-refs';

import 'react-phone-input-2/lib/high-res.css';
import './styles.less';

import type { InputProps } from 'antd/es/input';
import type { FormItemProps } from 'antd/lib/form/FormItem';

interface IPhoneFormItem extends FormItemProps {
  label?: string;
  fieldName?: string;
  country?: string;
  inputProps?: IInputProps;
}

interface IInputProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string) => void;
  onBlur?: (event: any) => void;
  value?: string;
  country?: string;
}

export const PhoneInput = React.forwardRef(
  ({ onChange = () => void 0, onBlur, value, country, ...props }: IInputProps, ref: Ref<any>) => {
    const innerRef = useRef<typeof ReactPhoneInput>(null);
    const combinedRef = useCombinedRefs(ref, innerRef);
    const [innerValue, setInnerValue] = useState<string | undefined>(undefined);
    const prevValue = usePrevious<string | undefined>(innerValue, undefined);
    const size = useContext(SizeContext);
    const isLarge = size === 'large';

    useEffect(() => {
      if (prevValue === undefined && value) {
        setInnerValue(value);
      }
    }, [prevValue, value, onChange]);

    const onChangeRaw = useCallback(
      (text: string) => {
        const input = (innerRef.current as any).numberInputRef;
        const startIndex = input.selectionStart ?? 0;

        if (startIndex === 1 && (prevValue?.length || 0) > text.length) {
          setInnerValue('');
          input.blur();
          input.focus();
        }

        setInnerValue(text);

        // prevent form update when you try to delete non-numeric symbol
        if (text !== prevValue?.replace(/^\+/, '')) {
          onChange(Boolean(text) ? `+${text}` : '');
        }
      },
      [prevValue, onChange],
    );

    // if the value matches /^+\d$/, `react-phone-input-2` input don't trigger onChange,
    // when you delete the number using `Backspace` or `Delete` keys
    const onKeyDownRaw = useCallback(
      ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
        const { value: inputValue, selectionStart, selectionEnd } = (innerRef.current as any).numberInputRef;

        if (inputValue.length === 2) {
          if (selectionStart === selectionEnd) {
            if ((key === 'Backspace' && selectionStart === 2) || (key === 'Delete' && selectionStart === 1)) {
              setInnerValue('');
              onChange('');
            }
          } else if (selectionEnd === 2 && ['Backspace', 'Delete'].includes(key)) {
            setInnerValue('');
            onChange('');
          }
        }
      },
      [onChange],
    );

    return (
      <ReactPhoneInput
        enableSearch
        country={country}
        value={innerValue}
        containerClass="customStyle"
        searchPlaceholder="Type here..."
        searchNotFound="No entries to show"
        jumpCursorToEnd={false}
        // @ts-ignore
        ref={combinedRef}
        onBlur={onBlur}
        onChange={onChangeRaw}
        onKeyDown={onKeyDownRaw}
        inputClass={cs({
          'ant-input': true,
          'ant-input-disabled': props.disabled,
          'ant-input-lg': isLarge,
        })}
        {...props}
      />
    );
  },
);

const phoneUtil = PhoneNumberUtil.getInstance();
export const knownPhoneCodes = [
  93, 355, 213, 376, 244, 1268, 54, 374, 297, 61, 43, 994, 1242, 973, 880, 1246, 375, 32, 501, 229, 975, 591, 387, 267,
  55, 246, 673, 359, 226, 257, 855, 237, 1, 238, 599, 236, 235, 56, 86, 57, 269, 243, 242, 506, 225, 385, 53, 599, 357,
  420, 45, 253, 1767, 1, 593, 20, 503, 240, 291, 372, 251, 679, 358, 33, 594, 689, 241, 220, 995, 49, 233, 30, 1473,
  590, 1671, 502, 224, 245, 592, 509, 504, 852, 36, 354, 91, 62, 98, 964, 353, 972, 39, 1876, 81, 962, 7, 254, 686, 383,
  965, 996, 856, 371, 961, 266, 231, 218, 423, 370, 352, 853, 389, 261, 265, 60, 960, 223, 356, 692, 596, 222, 230, 52,
  691, 373, 377, 976, 382, 212, 258, 95, 264, 674, 977, 31, 687, 64, 505, 227, 234, 850, 47, 968, 92, 680, 970, 507,
  675, 595, 51, 63, 48, 351, 1, 974, 262, 40, 7, 250, 1869, 1758, 1784, 685, 378, 239, 966, 221, 381, 248, 232, 65, 421,
  386, 677, 252, 27, 82, 211, 34, 94, 249, 597, 268, 46, 41, 963, 886, 992, 255, 66, 670, 228, 676, 1868, 216, 90, 993,
  688, 256, 380, 971, 44, 1, 598, 998, 678, 39, 58, 84, 967, 260, 263,
];

const phoneValidator = (rule: any, value: string) => {
  try {
    if (value && value !== '+' && !knownPhoneCodes.includes(parseInt(value, 10))) {
      phoneUtil.isValidNumberForRegion(phoneUtil.parse(value));
    }

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PhoneFormItem = ({
  label = 'Phone',
  fieldName = 'phone',
  country = '',
  inputProps,
  ...props
}: IPhoneFormItem) => (
  <Form.Item
    label={label}
    name={fieldName}
    validateTrigger={['onChange', 'onBlur']}
    rules={[{ validator: phoneValidator }]}
    {...props}
  >
    <PhoneInput country={country} {...inputProps} />
  </Form.Item>
);
