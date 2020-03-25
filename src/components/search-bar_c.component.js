import React, { Component } from 'react';

export default class SearchBar extends Component{
  render() {
    return(
      <div className={("search-bar ") + this.props.className}>
        <form>
          <input onChange={ this.loadResults() } type="text" name="search" placeholder={ this.props.placeholder } className="proxima-18 m-proxima-12"/>
          <button></button>
        </form>
      </div>
    )
  }
}
