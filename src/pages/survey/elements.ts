import styled from 'styled-components';

export const PageBody = styled.div`
  margin-top: 16px;

  .subject-name-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      align-self: end;
      margin-bottom: 8px;
    }
  }

  .ant-space.ant-space-vertical {
    padding: 12px 0;
    width: 100%;

    &:nth-child(even) {
      gap: 8px;
      background: #eaecef;
      width: calc(100% + 48px);
      margin: 0 -24px 0 -24px;
      padding: 12px 24px;
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  button {
    svg {
      margin-right: 10px;
    }
  }
`;

export const ChartContainer = styled.div`
  .highcharts-credits {
    cursor: auto !important;
  }

  .actions-bar {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  @media print {
    .actions-bar,
    .highcharts-exporting-group {
      display: none;
    }
  }
`;

export const PrintContainer = styled.div``;
