import React, { Component, Fragment } from 'react';
import { withRouter, Route } from 'react-router-dom';

import './App.scss';

import Header from 'components/common/header.component.js';
import Menu from './components/common/menu.component.js';

import HomePage from 'pages/home.js';
import CategoryPage from 'pages/category.js';
import ProductPage from 'pages/product.js';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <Menu history={ this.props.history }/>
        <Route exact path="/" render={ () => <HomePage/> }/>
        <Route path="/category=:cat_id" render={ props => <CategoryPage {...props}/> }/>
        <Route path="/product=:product_id" component={ props => <ProductPage {...props}/> }/>
      </Fragment>
    );
  }
}

export default withRouter(App);
