import React, { useEffect } from 'react';
import './App.scss';
import { NotificationContainer } from 'react-notifications';
import { Provider } from 'react-redux';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import configs from './configs';
import Routes from './routes/index';
import store from './store';
import 'react-notifications/lib/notifications.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: configs.primaryColor,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: configs.secundaryColor,
      main: configs.secundaryColor,
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#000000',
    },
    // error: will use the default color
  },
  typography: {
    fontFamily: 'BlinkMacSystemFont,-apple-system,segoe ui,Roboto,Oxygen,Ubuntu,Cantarell,fira sans,droid sans,helvetica neue,Helvetica,Arial,sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export default function App() {
  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute('content', configs.primaryColor);
  }, []);

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <div className="app-wrapper">
          <Routes />
          <NotificationContainer />
        </div>
      </MuiThemeProvider>
    </Provider>
  );
}
