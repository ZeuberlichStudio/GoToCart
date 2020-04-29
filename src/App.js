import React, { Component, Fragment } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

import './App.scss';

import Header from 'components/common/header.component.js';
import Menu from './components/common/menu.component.js';

import HomePage from 'pages/home.js';
import SearchPage from 'pages/search.js';
import CategoryPage from 'pages/category.js';
import ProductPage from 'pages/product.js';
import ProductModal from 'pages/product_modal.js';


class App extends Component {
  render() {

    let background = this.props.location.state && this.props.location.state.background;

    return (
      <Fragment>
        <Header/>
        <Menu history={ this.props.history }/>

        <Switch location={ background || this.props.location }>
          <Route exact path="/" render={ () => <HomePage/> }/>
          <Route path="/search" component={ props => <SearchPage {...props}/> }/>
          <Route path="/category=:cat_id" render={ props => <CategoryPage {...props}/> }/>
          <Route path="/product=:product_id" component={ props => <ProductPage {...props}/> }/>
        </Switch>

        {
          background &&
          <Route path="/product=:product_id" component={ props => <ProductModal {...props}/> }/>
        }
      </Fragment>
    );
  }
}

export default withRouter(App);
