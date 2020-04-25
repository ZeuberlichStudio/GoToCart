import React, { Component } from 'react';

export default class SearchBar extends Component{

  componentDidMount() {
  }

  state = {
    search: null,
    results: null,
  }

  loadResults = (e) => {
    const abortController = new AbortController();

    if( e.currentTarget.value !== '' ){

      let url = `http://localhost/wp-json/product-fetcher/v1/search?s=${e.currentTarget.value}`;

      fetch( url, {
        method: 'GET',
        mode: 'cors',
        signal: abortController.signal
      }).
      then( res => res.json() ).
      then( res => this.setState({ results: res }) ).
      catch( err => console.log( err ) );
    }else{
      console.log( 'empty' );
    }

    controller.abort.bind(controller);
  }

  render() {

    const {
      results,
    } = this.state;
    return(
      <div className="search-container">
        <div className={("search-bar ") + this.props.className}>
          <form>
            <input onChange={ e => this.loadResults(e) } type="text" name="search" placeholder={ this.props.placeholder } className="proxima-18 m-proxima-12"/>
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
      <img src={ product.images[0].src }/>
      <div className="search_results_item_info">
        <h2 className="search_results_item_info_title">{ product.name }</h2>
        <span className="search_results_item_info_brand"><span>Бренд: </span>{ returnBrand(product.attributes) }</span>
        <span className="search_results_item_info_stock"><span>В наличии: </span>{ product.stock_quantity }</span>
        <span className="search_results_item_info_price"><span>Цена: </span>{ product.price }</span>
      </div>
    </li>
  );
}
