import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SearchBar extends Component{
  render() {
    return(
      <div className={("categories ") + this.props.className}>
        <nav>
          <ul className="proxima-18 m-proxima-12">
            <li><Link to="/">Каталог</Link></li>
            <li><Link to="/">Чехлы для телефонов</Link></li>
            <li><Link to="/">Кошельки</Link></li>
            <li><Link to="/">Косметички</Link></li>
          </ul>
        </nav>
      </div>
    )
  }
}
