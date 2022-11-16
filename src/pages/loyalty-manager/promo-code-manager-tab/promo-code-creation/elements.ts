import Input from 'antd/es/input';
import styled from 'styled-components';

import { Header3 } from 'components/layout/headers';
import { PageLayout } from 'components/layout/page-layout';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const PromoCodeLayout = styled(PageLayout)`
  max-width: 900px;
  
  svg {
    margin: -2px 0;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    max-width: 688px;
  }
`;

export const PromoHeader = styled(Header3)`
  margin-bottom: 24px;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    margin-bottom: 8px;
  }
`;

export const PromoCodeInput = styled(Input)`
  text-transform: uppercase;

  ::placeholder {
    text-transform: initial;
  }
`;
