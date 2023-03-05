import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import { ThemeProvider } from '@mui/material';

import Navigation from './components/Navigation';
import Routing from './routes/Routing';
import reportWebVitals from './reportWebVitals';


import { globalStyling, theme } from './style/Styling'

ReactDOM.render(
  <React.StrictMode>

    <ThemeProvider theme={theme}>
      {globalStyling}
      <Navigation>
        <Routing />
      </Navigation>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
