import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import BubblesPage from './components/BubblePage';
import Login from './components/Login';
import './styles.scss';

function App() {
  return (
    <Router>
      <div className='App'>
        <PrivateRoute path='/bubbles' component={BubblesPage} />
        <Route exact path='/' component={Login} />
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//test
