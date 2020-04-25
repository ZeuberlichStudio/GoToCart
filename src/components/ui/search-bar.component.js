import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SearchBar extends Component{

  componentDidUpdate( prevProps, prevState ) {
    if( prevState.search !== this.state.search && this.state.search === '' ){
      this.controller.abort();
      this.controller = new AbortController();
      this.setState({ results: null });
    }
    else if( prevState.search !== this.state.search ){
      this.controller.abort();
      this.controller = new AbortController();
      this.loadResults(this.state.search);
    }
  }

  state = {
    search: null,
    results: null,
  }

  controller = new AbortController();

  loadResults = (search) => {

    let url = `http://localhost/wp-json/product-fetcher/v1/search?s=${search}`;

    fetch( url, {
      method: 'GET',
      mode: 'cors',
      signal: this.controller.signal
    }).
    then( res => res.json() ).
    then( res => this.setState({ results: res }) ).
    catch( err => console.log( err ) );
  }

  render() {

    const {
      results,
    } = this.state;
    return(
      <div className="search-container">
        <div className={("search-bar ") + this.props.className}>
          <form>
            <input onChange={ e => this.setState({ search: e.currentTarget.value }) } type="text" name="search" placeholder={ this.props.placeholder } className="proxima-18 m-proxima-12"/>
            <button></button>
          </form>
        </div>
        <div id="live-search-results" className={ results ? 'active' : null }>
          <div id="results-container" className="results-container">
            {
                results ?
                Array.isArray(results) > 0 ?
                  results.map( result => <SearchItem product={result}/> ) :
                  console.log( results.message )
                :
                null
            }
          </div>
        </div>
      </div>
    )
  }
}

function SearchItem(props) {

  function returnBrand ( attributes ) {
    let brand = attributes.find( attribute => attribute.name === 'бренд');
    return brand ? brand.options[0] : null;
  }

  const { product } = props;

  return(
    <li className="search_results_item">
      <Link to={`catalogue/`}>
        <img src={ product.images[0].src }/>
        <div className="search_results_item_info">
          <h2 className="search_results_item_info_title">{ product.name }</h2>
          <span className="search_results_item_info_brand"><span>Бренд: </span>{ returnBrand(product.attributes) }</span>
          <span className="search_results_item_info_stock"><span>В наличии: </span>{ product.stock_quantity }</span>
          <span className="search_results_item_info_price"><span>Цена: </span>{ product.price }</span>
        </div>
      </Link>
    </li>
  );
}
