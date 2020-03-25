import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from '../ui/search-bar.component.js';

import logo from '../../assets/images/logo.svg';

export default class Header extends Component{

  state = {
    catalogActive: 0,
  }

  openCatalog = () => {
    let catalog = document.getElementById('catalog');
    let catalog_state = this.state.catalogActive;

    if ( !catalog_state ) {
      catalog.classList.add('active');
      this.setState({ catalogActive: 1 });
    }else{
      catalog.classList.remove('active');
      this.setState({ catalogActive: 0 });
    }
  }

  render() {
    return(
      <header>
        <div className="logo-wrapper">
          <img src={logo}/>
        </div>
        <button onClick={ this.openCatalog } className="catalog-button proxima-18 m-proxima-12">Каталог</button>
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
