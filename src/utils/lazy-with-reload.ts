import { lazy } from '@loadable/component';

import type { ComponentType } from 'react';
export type ComponentPromise<T = any> = Promise<{ default: ComponentType<T> }>;

export const lazyWithRetry = <T>(componentImport:  () => ComponentPromise<T>) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.localStorage.getItem(
        'page-has-been-force-refreshed'
      ) || 'false'
    );

    try {
      const component = await componentImport();

      window.localStorage.setItem(
        'page-has-been-force-refreshed',
        'false'
      );

      return component as any;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        window.localStorage.setItem(
          'page-has-been-force-refreshed',
          'true'
        );

        return window.location.reload();
      }

      throw error;
    }
  });
