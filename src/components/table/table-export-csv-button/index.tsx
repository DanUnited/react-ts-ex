import React from 'react';
import { CSVLink } from 'react-csv';
import { Data } from 'react-csv/components/CommonPropTypes';
import { ExportCsvPrimaryButton } from './elements';

type Props = {
  tableName: string;
  headers: { key: string; label: string }[];
  data: Data;
};

const TableExportCsvButton = (props: Props): JSX.Element => {
  const { tableName, headers, data } = props;

  return (
    <ExportCsvPrimaryButton>
      <CSVLink headers={headers} filename={`${tableName}.csv`} data={data}>
        Export
      </CSVLink>
    </ExportCsvPrimaryButton>
  );
};

export default TableExportCsvButton;
