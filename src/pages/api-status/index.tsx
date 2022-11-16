import React from 'react';

import { StatusApiIframe } from './elements';
import { Breadcrumbs } from 'components/breadcrumbs';
import { Header2 } from 'components/layout/headers';
import { PageHeaderContainer } from 'components/layout/headers/header-container';

const apiStatusUrl = process.env.REACT_APP_STATUS_API_URL;

export const ApiStatus = () => (
  <>
    <PageHeaderContainer>
      <Header2>API Status</Header2>
      <Breadcrumbs />
    </PageHeaderContainer>

    {apiStatusUrl
      ? <StatusApiIframe
        title="api status"
        src={apiStatusUrl}
        allowFullScreen
      />
      : null
    }
  </>
);

export default ApiStatus;
