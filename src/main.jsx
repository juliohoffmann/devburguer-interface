import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import  {GlobalStyle}  from './styles/globalStyles.js';
import AppProvider from './hooks/index.jsx';
import { Elements } from '@stripe/react-stripe-js';
import  stripePromise  from './config/stripeConfig.js';
import { ThemeProvider } from 'styled-components';
import { standardTheme } from './styles/themes/standard.js';
import { Router } from './routes/index.jsx';




ReactDOM.createRoot(document.getElementById('root')).render(
 
 <StrictMode>
  <ThemeProvider theme={standardTheme}>
    <AppProvider>
      <Elements stripe={stripePromise}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      </Elements>
      <GlobalStyle />
      <ToastContainer autoClose={2000} theme='colored' />
    </AppProvider>
  </ThemeProvider>
  </StrictMode>
);

