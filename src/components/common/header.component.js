import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from '../ui/search-bar.component.js';

import logo from '../../assets/images/logo.svg';

export default class Header extends Component{

  componentDidUpdate(prevProps, prevState) {
    if( prevState.activeMenu === this.state.activeMenu && prevState.activeMenu === 1 ){
      this.openCatalog();
    }
  }

  state = {
    activeMenu: 0,
  }

  openCatalog = () => {
    let menu = document.getElementById('menu');
    let menu_state = this.state.activeMenu;

    if ( !menu_state ) {
      menu.classList.add('active-menu');
      this.setState({ activeMenu: 1 });
    }else{
      menu.classList.remove('active-menu');
      this.setState({ activeMenu: 0 });
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
