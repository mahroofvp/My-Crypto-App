import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-alice-carousel/lib/alice-carousel.css';
import { CryptoContextProvider } from './contextApi/CryptoContext';

ReactDOM.render(
  <CryptoContextProvider>
    <App />
  </CryptoContextProvider>,
  document.getElementById('root')
);


