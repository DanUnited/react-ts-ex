import { Modal } from 'antd';

import type { ReactNode } from 'react';
import type { ModalFuncProps } from 'antd/lib/modal/Modal';

const { confirm } = Modal;

interface IGetConfirmationAction extends ModalFuncProps {
  action: () => void;
  title: ReactNode | string;
  okText?: string;
  cancelText?: string;
}

export const resolveOnError = (action: (() => void) | (() => Promise<any> | undefined)) => () =>
  Promise.resolve()
    .then(() => action())
    .catch(() => Promise.resolve());

export const getConfirmAction = ({ action, title, okText = 'Yes', cancelText = 'No', ...props }: IGetConfirmationAction) => {
  confirm({
    title,
    okText,
    cancelText,
    onOk: resolveOnError(action),
    width: 476,
    ...props,
  });
};
