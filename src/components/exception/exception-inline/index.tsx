import React from 'react';
import Typography from 'antd/es/typography';
import Result from 'antd/es/result';
import { useException } from 'utils/hooks/use-exception';
import { ExceptionInlineContainer } from './elements';
import type { IApiError } from 'modules/api-requests/types';

const { Paragraph, Text } = Typography;

type Props = {
  error: IApiError | null;
};

const ExceptionInline = (props: Props): JSX.Element | null => {
  const { error } = props;

  const { message, fullMessage } = useException({ error });

  if (!error) {
    return null;
  }

  return (
    <ExceptionInlineContainer>
      <Result status="error" title="Sorry something went wrong" subTitle="Try your request again">
        <Paragraph>
          <Text strong={true}>{message}</Text>
        </Paragraph>
        {fullMessage && (
          <Paragraph code={true} copyable={true} ellipsis={{ rows: 2, expandable: true, symbol: 'Expand' }}>
            {fullMessage}
          </Paragraph>
        )}
      </Result>
    </ExceptionInlineContainer>
  );
};

export default ExceptionInline;
