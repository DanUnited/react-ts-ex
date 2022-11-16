import Tabs from 'antd/es/tabs';
import styled from 'styled-components';

import { InlinePlate } from 'components/layout/plate';

interface IPagePlate {
  $width: string;
}

export const PagePlate = styled(InlinePlate)<IPagePlate>`
  padding: 24px 32px 32px 32px;
  max-width: ${({ $width }) => $width}; 
`;

export const UITabs = styled(Tabs)`
  overflow: visible;
`;
