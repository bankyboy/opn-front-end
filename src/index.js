import React from 'react';
import './styles/global.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { ThemeProvider } from '@mui/material';
import theme from './styles/mui/theme';
import store from './app/store';
import Aos from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

const root = ReactDOM.createRoot(document.getElementById('root'));

Aos.init({
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 1000, // values from 0 to 3000, with step 50ms
  easing: 'ease-in-out', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: true, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defin
});

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
);
