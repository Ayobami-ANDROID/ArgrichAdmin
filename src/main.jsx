import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
import store from './App/store.js';
import { injectStore } from './App/storeInjector.js';

injectStore(store);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>

    </BrowserRouter>

  </StrictMode>,
)
