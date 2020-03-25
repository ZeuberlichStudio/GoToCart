import React, { Component } from 'react';
import CatalogItem from '../components/catalog/catalog-item.component';

export default class CatalogPage extends Component{

  componentDidMount() {

    let url =
    `http://localhost:8888/wp-json/product-fetcher/v1/search/${ this.props.location.search }`;

    fetch( url, {
      method: 'get',
      mode: 'cors',
    })
    .then( response => response.json() )
    .then( response => this.setState({ items: response }) )
    .catch( err => console.log(err) );
  }

  state = {
    items: [],
  }

  render() {

    const {
      items
    } = this.state;

    return(
      <main id="catalog">
        <section>
        <div id="catalog-items-container">
          <CatalogControls/>
          { items.map( (item, i) =>
            <CatalogItem
              thumb={ item.images[0].src }
              title={ item.name }
              excerpt={ item.short_description }
              price={ item.price }
            /> ) }
        </div>
        </section>
      </main>
    )
  }
}

class CatalogControls extends Component{
  render() {
    return(
      <div id="catalog-controls">
        <div>
          <span>Сначала</span>
          <div>
            <button>Популярные</button>
            <button>Новые</button>
            <button>Дорогие</button>
            <button>Дешёвые</button>
            <button>Со скидкой</button>
          </div>
        </div>
      </div>
    )
  }
}
