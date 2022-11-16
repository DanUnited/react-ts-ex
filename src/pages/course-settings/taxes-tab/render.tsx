import React, { useCallback, useEffect, useState } from 'react';
import Input from 'antd/es/input';

import { Pencil } from 'components/icons';
import { getConfirmAction } from 'components/modal/confirm';
import { Icon, TitleContainer, CircleIcon, InputLabel, Title, Container } from './elements';

import type { ButtonProps } from 'antd/es/button';

const okButtonProps = { size: 'large' } as ButtonProps;
const cancelButtonProps = { size: 'large' } as ButtonProps;

interface IRenderEditableTitle {
  value?: string;
  modalTitle: string;
  flexAlign?: 'start' | 'end' | 'center',
  onChange?: (value?: string) => void;
}

export const RenderEditableTitle: React.FC<IRenderEditableTitle> = ({ value, modalTitle, flexAlign = 'start', onChange }) => {
  const [title, setTitle] = useState<string | undefined>(value);
  const [confirmedSave, setConfirmedSave] = useState(false);

  useEffect(() => {
    if (confirmedSave && onChange) {
      onChange(title);
      setConfirmedSave(false);
    }
  }, [title, onChange, confirmedSave]);

  useEffect(() => {
    if (value && title !== value) {
      setTitle(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const callConfirmPopup = useCallback((): void => {
    getConfirmAction({
      icon: (
        <CircleIcon>
          <Pencil height={16} width={16} fill="#38A5FF" />
        </CircleIcon>
      ),
      closable: true,
      title: <Title>{modalTitle}</Title>,
      action: () => setConfirmedSave(true),
      okText: 'Rename',
      cancelText: 'Cancel',
      okButtonProps,
      cancelButtonProps,
      onCancel: () => setTitle(value),
      content: (
        <Container>
          <InputLabel>Enter new name</InputLabel>
          <Input
            size="large"
            defaultValue={title}
            placeholder="Enter new name"
            onChange={e => setTitle(e.target.value)}
          />
        </Container>
      )
    })
  }, [title, modalTitle, value]);

  return (
    <TitleContainer $flexAlign={flexAlign}>
      <span className="title" title={value}>{value}</span>
      <Icon onClick={callConfirmPopup}>
        <Pencil width={12} height={12} />
      </Icon>
    </TitleContainer>
  );
};
