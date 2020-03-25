import React, { Component } from 'react';

export default class SearchBar extends Component{

  componentDidMount() {
  }

  state = {
    results: '',
  }

  loadResults = (e) => {
    let url = `http://localhost:8888/wp-json/product-fetcher/v1/search?s=${e.currentTarget.value}`;

    if( e.currentTarget.value !== '' ){
      fetch( url, {
        method: 'GET',
        'Content-Type': 'application/json'
      })
      .then( res => res.json())
      .then( res => res !== this.state.results ? this.setState({ results:res }) : null)
      .catch( err => console.log(err));
    }else{
      this.setState({ results:[] });
    }
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
        <div id="live-search-results" className={ results.length > 0 ? 'active' : null }>
          <div id="results-container" className="results-container">
            {
                results ?
                results.length > 0 ?
                  results.map( result => <p>{result.name}</p> ) :
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
