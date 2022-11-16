import styled from 'styled-components';
import Button from 'antd/es/button';

export const ReportsContainer = styled.div`
  position: relative;

  iframe {
    height: 100%;
    min-height: calc(100vh - 220px);
  }

  .fullscreen {
    background: white;

    .exit-full-screen {
      display: none;
    }
  }

  .fullscreen-enabled .exit-full-screen {
    display: inline-flex;
  }
`;

export const FullScreenContainer = styled.div`
  background: white;
  height: 100%;
  
  .quicksight-container {
    height: 100%;
  }
`;

export const FullScreenButton = styled(Button)`
  &.ant-btn {
    position: absolute;
    right: 4px;
    top: 8px;
    gap: 4px;
  }
`;
