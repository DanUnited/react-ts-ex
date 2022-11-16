import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { Plate } from 'components/layout/plate';
import { Header2 } from 'components/layout/headers';
import { Breadcrumbs } from 'components/breadcrumbs';
import { FlexBoxLeft } from 'components/layout/flex-block';
import { BackArrow } from 'components/icons/system/back-arrow';
import { ActionsBlock, ArrowContainer, HeaderActionsBlock, HeaderBlock, PlateFullHeight, TitleActionsContainer } from './elements';

import type { ReactNode } from 'react';
import type { IMenuItemCollection } from 'components/layout/left-menu/constants';

interface IPageLayout {
  title: string;
  children: ReactNode;
  header?: ReactNode;
  actions?: ReactNode;
  fullHeight?: boolean;
  returnSrc?: string;
  bodiless?: boolean;
  extraPadding?: string;
  titleAction?: ReactNode;
  breadcrumbExtra?: IMenuItemCollection[];
}

export const PageLayout = ({
  children,
  title,
  actions,
  header,
  fullHeight,
  bodiless,
  returnSrc,
  extraPadding = '',
  titleAction,
  breadcrumbExtra,
  ...props
}: IPageLayout) => {
  const ContentComponent = useMemo(() =>
    fullHeight
      ? <PlateFullHeight extraPadding={extraPadding}>{children}</PlateFullHeight>
      : <Plate>{children}</Plate>,
  [fullHeight, extraPadding, children]);

  return (
    <div {...props}>
      <Helmet title={title} />
      <HeaderBlock>
        <FlexBoxLeft>
          {returnSrc && (
            <Link to={returnSrc}>
              <ArrowContainer>
                <BackArrow />
              </ArrowContainer>
            </Link>
          )}
          <span>
            <Header2>{title}</Header2>
            <Breadcrumbs extraItems={breadcrumbExtra} />
          </span>

          <TitleActionsContainer>
            {titleAction}
          </TitleActionsContainer>
        </FlexBoxLeft>

        <ActionsBlock>
          {actions}
        </ActionsBlock>
      </HeaderBlock>

      {header && (
        <HeaderActionsBlock>
          {header}
        </HeaderActionsBlock>
      )}

      {bodiless
        ? children
        : ContentComponent
      }
    </div>
  )
};
