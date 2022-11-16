import React from 'react';
// system libraries
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';

// components and local libraries
import { Routing } from './routing';
import { store } from 'modules/store';
import { history } from './models/router';
import { mainTheme } from './modules/theme';
import reportWebVitals from './reportWebVitals';
import { AxiosInterceptors } from 'components/axios-interceptors';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import 'antd/dist/antd.compact.less';
import 'modules/theme/theme.less';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryDelay: 5000,
    },
  },
});

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={mainTheme}>
            <Routing />
            <AxiosInterceptors />
          </ThemeProvider>
        </ConnectedRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
