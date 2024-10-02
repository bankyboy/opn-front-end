import React from 'react';
import './styles/global.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { ThemeProvider } from '@mui/material';
import theme from './styles/mui/theme';
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
);
