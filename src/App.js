import React, { Component, Fragment } from 'react';
import { withRouter, Route } from 'react-router-dom';
import Menu from './components/common/menu.component.js';

import './App.scss';

import Header from './components/common/header.component.js';
import HomePage from './pages/home.js';
import Catalogue from './pages/catalogue.js';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <Menu history={ this.props.history }/>
        <Route exact path="/" render={ () => <HomePage/> }/>
        <Route path="/catalogue">
          <Catalogue />
        </Route>
      </Fragment>
    );
  }
}

export default withRouter(App);
