import React from 'react';
import { store } from './redux/rematch';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import { SnackbarProvider } from 'notistack';
import './styles/styles.scss';
import { ThemeProvider } from '@material-ui/core'
import theme from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
          <Router>
            <Routes />
          </Router>
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
