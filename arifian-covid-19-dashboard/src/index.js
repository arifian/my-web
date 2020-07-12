import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from "react-redux";
import { store } from "./store";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <CssBaseline/>
      <App/>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
