import React from 'react';
import './index.css';
import App from './components/App/App';
import { createRoot } from 'react-dom/client';


import './index.css';

const rootReactElement = (
  <App />
);

const root = createRoot(document.getElementById('root'));
root.render(rootReactElement);


