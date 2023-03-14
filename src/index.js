// -------------react libraries----------------------------------------------------------------
import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, HashRouter } from 'react-router-dom';

// --------------styling---------------------------------------------------------------
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import 'tippy.js/dist/tippy.css'; 


//------------------components-------------------------------------------------------------
// import  App from './components/App'
import { AppWithProvider } from './components/context/AppWithProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <AppWithProvider/>
  </HashRouter>
);

