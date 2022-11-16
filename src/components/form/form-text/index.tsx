import Text from 'antd/es/typography/Text';

interface IFormText {
  value?: string;
  onTransformValue?: (value?: string) => string | undefined;
}

export const FormText = ({ value, onTransformValue = val => val }: IFormText) => (
  <Text title={value}>{onTransformValue(value)}</Text>
)
