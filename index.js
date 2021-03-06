import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import App from './src/App.js';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);
