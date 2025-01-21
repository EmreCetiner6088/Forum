import React from 'react';
import ReactDOM from 'react-dom/client';  // react-dom/client'dan import et
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// App.js içinde BrowserRouter kullanmaya gerek yok, index.js'te tek bir kere kullanıyoruz
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
