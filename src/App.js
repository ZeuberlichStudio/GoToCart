import React, { Component, Fragment } from 'react';
import { withRouter, Route } from 'react-router-dom';
import Menu from './components/common/menu.component.js';

import './App.scss';

import Header from './components/common/header.component.js';
import HomePage from './pages/home.js';
import CatalogPage from './pages/catalog.js';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <Menu active="true"/>
        <Route exact path="/" render={ () => <HomePage/> }/>
        <Route strict path="/catalog" render={ () => <CatalogPage location={ this.props.location } /> }/>
      </Fragment>
    );
  }
}

export default withRouter(App);
