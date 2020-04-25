import React from 'react';
import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom';
import Categories from '../components/catalogue/categories.component';
import Products from '../components/catalogue/products.component';
import Product from 'pages/product';

export default function( props ) {

  let { path, url } = useRouteMatch();

  return(
    <div>
      <Switch>
        <Route path={`${path}/search`} render={ props => <Products {...props}/> }/>
        <Route exact path={path} render={ props => <Categories {...props}/> }/>
        <Route exact path={`${path}/:cat_id`} render={ props => <Categories {...props}/> }/>
        <Route path={`${path}/:cat_id/:subcat_id`} render={ props => <Products {...props}/> }/>
      </Switch>
      <Route path={`${path}/:cat_id/:subcat_id/:product_id`} render={ props => <Product {...props}/> }/>
    </div>
  );
}
