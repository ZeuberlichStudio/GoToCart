import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

export default class CatalogItem extends Component {
  render() {

    const {
      title,
      excerpt,
      price,
      thumb
    } = this.props;

    return(
      <div className="catalog-item">
        <img src={ thumb } />
        <h2 className="montserrat-56">{ title }</h2>
        <p className="proxima-18">{ ReactHtmlParser(excerpt) }</p>
        <div className="price-and-link proxima-18">
          <span>{ price }₽</span>
          <a href="/">Подробнее</a>
        </div>
      </div>
    )
  }
}
