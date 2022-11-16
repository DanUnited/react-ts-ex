import React from 'react';
import { AddonRightPanel, PanelContainer, PanelHeader } from './elements';

import type { HTMLProps } from 'react';

interface IPanel extends Omit<HTMLProps<HTMLDivElement>, 'children' | 'ref' | 'as'>{
  title: string;
  children: React.ReactNode;
  addonRight?: React.ReactNode;
}

export const Panel = ({ title, children, addonRight, ...props }: IPanel) => {
  return (
    <PanelContainer {...props}>
      <PanelHeader>{title}</PanelHeader>
      {addonRight && <AddonRightPanel>{addonRight}</AddonRightPanel>}

      <div>
        {children}
      </div>
    </PanelContainer>
  )
};
