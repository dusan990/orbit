import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'material-symbols';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthContextProvider>
    {/* strict mode rendering components 2x
    allegedly will not render in prod
    <React.StrictMode>
    </React.StrictMode> */}
    <App />
  </AuthContextProvider>
);

reportWebVitals();