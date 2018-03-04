import React from 'react';
import ReactDOM from 'react-dom';
import './styles/flexboxgrid.min.css';
import './styles/index.css';
import App from './App';
import { ThemeProvider } from 'react-jss';
import { Provider } from 'react-redux';
import { configureStore } from './store';

const theme = {
  palette: {
    primary: '#ff5722',
    primaryDark: '#c41c00',
    primaryLight: '#ff8a50',
    secondary: '#37474f',
    textColor: '#37474f',
    textSecondary: '#fff',
    shadowColor: '#999',
    shadowColorLight: '#aaa',
    white: '#fff'
  }
}
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>, 
    document.getElementById('root')
);
