import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './search-bar.component.js';

import logo from '../assets/images/logo.svg';

export default class Header extends Component{
  render() {
    return(
      <header>
        <div className="logo-wrapper">
          <img src={logo}/>
        </div>
        <Link to="/" className="catalog-link proxima-18 m-proxima-12">Каталог</Link>
        <Search placeholder="Поиск"/>
        <nav className="navigation proxima-18">
          <Link to="/">Скидки</Link>
          <Link to="/">Отмеченные</Link>
          <Link to="/">Корзина</Link>
        </nav>
      </header>
    )
  }
}
