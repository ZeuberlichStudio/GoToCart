import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';

import Header from './components/header.component.js';
import Home from './pages/home.js';

function App() {
  return (
    <Router>
      <Header/>
      <Home/>
    </Router>
  );
}

export default App;
