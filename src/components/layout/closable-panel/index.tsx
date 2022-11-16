import React from 'react';
import { Close } from 'components/icons/system/close';
import { ClosablePanelContainer, CloseIconContainer } from './elements';

interface IClosablePanel {
  children: React.ReactNode;
  onClose?: () => void;
}

export const ClosablePanel = ({ children, onClose }: IClosablePanel) => (
  <ClosablePanelContainer>
    <div>
      {children}
    </div>
    <CloseIconContainer onClick={onClose}>
      <Close />
    </CloseIconContainer>
  </ClosablePanelContainer>
);
