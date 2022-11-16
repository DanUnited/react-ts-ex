import Upload from 'antd/es/upload';
import styled, { css } from 'styled-components';
import { Plus } from 'components/icons/system/plus';

import type { DraggerProps } from 'antd/es/upload';

export const CropControlsContainer = styled.div`
  height: 105%;
  width: 105%;
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  font-size: 26px;
  cursor: default;
  transition: opacity 266ms ease-out;
  opacity: 0;
  padding-left: inherit;
  padding-right: inherit;
  left: 0;
  right: 0;
  top: -2px;
  bottom: 0;
  margin: 0;
  border-radius: 4px;
  &:hover {
    opacity: 1;
  }

  svg {
    cursor: pointer;
    margin: 0 5px;
  }
`;

interface IDraggerProps extends DraggerProps {
  $height: number;
  $width: number;
}

export const DraggerContainer = styled.div`
  position: relative;
  width: 128px;
  height: 128px;
  overflow: hidden;
  ${(props: IDraggerProps) => css`
    height: ${props.$height}px;
    width: ${props.$width}px;
    padding-bottom: ${100 * props.$height / props.$width}%;
  `}
`;

export const StyledDragger = styled(Upload.Dragger)`
  &.ant-upload.ant-upload-drag {
    position: absolute;
    top: 0;
    left: 0;
    height: 100% !important;
    width: 100%;
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 10px;
  }
`;

export const PlusIcon = styled(Plus)`
  font-size: 30px;
  opacity: .75;
  margin-bottom: 1px;
  fill: ${({ theme }) => theme.colors.text};
`;
