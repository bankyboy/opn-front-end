import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Noto Sans Thai', // The imported font
      'sans-serif', // Fallback fonts
      'Roboto',
    ].join(','),
    fontWeightThin: 100,
    fontWeightExtraLight: 200,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    fontWeightExtraBold: 800,
    fontWeightBlack: 900,
  },
  breakpoints: {
    values: {
      xs: 376,
      sm: 640, // Customize this value
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

export default theme;
