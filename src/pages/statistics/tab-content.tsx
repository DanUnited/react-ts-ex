import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import notification from 'antd/es/notification';
import { embedDashboard } from 'amazon-quicksight-embedding-sdk';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import { Loading } from 'components/loading';
import { FullScreenIcon } from './full-screen-icon';
import { queryOptions } from 'modules/api-requests/constants';
import { getCourseReportByIdRequest } from 'modules/api-requests/reports';
import { FullScreenButton, FullScreenContainer, ReportsContainer } from './elements';

interface ITabContent {
  courseId: string;
  reportId: string;
}

const options = {
  url: null,
  container: '#embeddingContainer',
  scrolling: 'no',
  height: 'AutoFit',
  iframeResizeOnSheetChange: true, // use this option in combination with height: AutoFit, to allow iframe height to resize dynamically, based on sheet height, on changing sheets.
  width: '100%',
  locale: 'en-US',
  footerPaddingEnabled: false,
  region: 'us-east-1',
};

export const TabContent = ({ reportId, courseId }: ITabContent) => {
  const handle = useFullScreenHandle();
  const currentRef = useRef<HTMLDivElement | null>(null);
  const [isDashboardLoaded, setIsDashboardLoaded] = useState(true);
  const [quicksightContainers, setQuicksightContainers] = useState<string[]>([]);
  const [embedError, setEmbedError] = useState<string | null>(null);

  const { data: report, isFetching: reportLoading } = useQuery({
    queryKey: ['getCourseReport', courseId, reportId],
    queryFn: () => getCourseReportByIdRequest(courseId, reportId),
    onError: message => notification.error({ message: String(message) }),
    ...queryOptions,
  });

  useEffect(() => {
    if (reportId) {
      setQuicksightContainers(['c' + reportId.replace(/-/g, '')]);
    }
  }, [reportId]);

  useEffect(() => {
    if (reportId && report?.url && currentRef.current) {
      try {
        setIsDashboardLoaded(false);
        embedDashboard({
          ...options,
          parameters: report.parameters,
          container: `#c${reportId.replace(/-/g, '')}`,
          url: report.url,
          loadCallback: () => {
            setIsDashboardLoaded(true);
          }
        });
      } catch (e) {
        setEmbedError(`Error: ${(e as Error).message}`);
      }
    }
  }, [reportId, report, currentRef]);

  return (
    <ReportsContainer>
      {reportLoading || !isDashboardLoaded ? <Loading /> : null}
      <FullScreenButton
        onClick={handle.enter}
        icon={<FullScreenIcon />}
      >
        Full Screen
      </FullScreenButton>

      <FullScreen handle={handle}>
        <FullScreenContainer>
          <FullScreenButton
            onClick={handle.exit}
            icon={<FullScreenIcon />}
            className="exit-full-screen"
          >
            Exit Full Screen
          </FullScreenButton>

          {quicksightContainers.map(item => (
            <div
              id={item}
              key={item}
              ref={currentRef}
              className="quicksight-container"
              style={{
                opacity: Number(isDashboardLoaded),
              }}
            />
          ))}

          {embedError}
        </FullScreenContainer>
      </FullScreen>
    </ReportsContainer>
  );
};
