import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

import { store } from 'modules/store';
import { history } from 'models/router';
import { mainTheme } from 'modules/theme';

import type { ReactElement } from 'react';
import type { RenderOptions } from '@testing-library/react';

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: StrictMode, ...options });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryDelay: 5000,
    },
  },
});

export default function mountTest(Component: React.ComponentType) {
  describe(`mount and unmount`, () => {
    it(`component could be updated and unmounted without errors`, () => {
      const { unmount, rerender } = customRender(
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={mainTheme}>
              <Router history={history}>
                <Route path="/">
                  <Component />
                </Route>
              </Router>
            </ThemeProvider>
          </QueryClientProvider>
        </Provider>
      );

      expect(() => {
        rerender(
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={mainTheme}>
                <Router history={history}>
                  <Route path="/">
                    <Component />
                  </Route>
                </Router>
              </ThemeProvider>
            </QueryClientProvider>
          </Provider>
        );
        unmount();
      }).not.toThrow();
    });
  });
}
