import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from "@chakra-ui/react";
import './index.css';
import {UserProvider} from './utils/userContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
  <UserProvider>
  <ChakraProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </ChakraProvider>
  </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
