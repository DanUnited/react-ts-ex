import React from 'react'
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

import { store } from 'modules/store';
import { history } from 'models/router';
import { mainTheme } from 'modules/theme';

import type { FC, ReactElement } from 'react';
import type { RenderOptions } from '@testing-library/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryDelay: 5000,
    },
  },
});

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={mainTheme}>
          <Router history={history}>
            <Route path="/">
              {children}
            </Route>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react'
export { customRender as render }
