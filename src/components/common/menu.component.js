import React, { Component } from 'react';

export default class Menu extends Component {

  render() {
    return(
      <div id="menu" className="active">
        <Filters/>
      </div>
    )
  }
}

class Filters extends Component{

  componentDidMount() {
    let fields = document.getElementById('filters-form').getElementsByTagName('input');
    this.setState({ fields });
  }

  state = {
    filters: {},
    fields: []
  }

  resetFilters = e => {
    e.preventDefault();
    for( let i = 0; i < this.state.fields.length; i++ ){
      this.state.fields[i].type === 'checkbox' ?
      this.state.fields[i].checked = false : this.state.fields[i].value = '';
    }
  }

  submitSearch = e => {
    e.preventDefault();

    let base_url = 'http://localhost:8888/wp-json/product-fetcher/v1/search/';
    let request_url = 'http://localhost:8888/wp-json/product-fetcher/v1/search/?';
    let filters = {};

    Array.from(this.state.fields).forEach(field => {
      if(
        (field.type === 'checkbox' &&
        field.checked) ||
        (field.type === 'text' &&
        field.value)
      ){
        filters[field.dataset.filter] =
        filters[field.dataset.filter] ?
        filters[field.dataset.filter] : new Array();

        filters[field.dataset.filter].push([field.value]);
      }
    });

    //Set parameters for material;
    if( filters.material ){
      request_url = request_url + '&material=';
      filters.material.forEach( (material, i) => {
        request_url = i ?
        request_url + `,${material}` : request_url + material;
      });
    }

    //Set parameters for color;
    if( filters.color ){
      request_url = request_url + '&color=';
      filters.color.forEach( (color, i) => {
        request_url = i ?
        request_url + `,${color}` : request_url + color;
      });
    }

    //Set parameters for age and sex;
    if( filters.person ){
      request_url = request_url + '&person=';
      filters.person.forEach( (person, i) => {
        request_url = i ?
        request_url + `,${person}` : request_url + person;
      });
    }

    //Set parameters for brand;
    if( filters.brand ){
      request_url = request_url + '&brand=';
      filters.brand.forEach( (brand, i) => {
        request_url = i ?
        request_url + `,${brand}` : request_url + brand;
      });
    }

    //Set parameters for category;
    if( filters.cat ){
      request_url = request_url + '&cat=';
      filters.cat.forEach( (cat, i) => {
        request_url = i ?
        request_url + `,${cat}` : request_url + cat;
      });
    }

    //Set parameters for min-max price;
    if( filters.min_price ){
      request_url = request_url + `&min_price=${filters.min_price}`;
    }
    if( filters.max_price ){
      request_url = request_url + `&max_price=${filters.max_price}`;
    }

    //Set parameters for min-max stock;
    if( filters.min_stock ){
      request_url = request_url + `&min_stock=${filters.min_stock}`;
    }
    if( filters.max_stock ){
      request_url = request_url + `&max_stock=${filters.max_stock}`;
    }

    console.log(request_url);
  }

  render() {
    return(
      <div id="filters" className={ this.props.active ? "active" : null }>
        <form id="filters-form" className="proxima-18">
          <div className="left-column">
            <div className="fieldset checkboxes">
              <legend>Основные фильтры</legend>
              <Checkbox label="Хит продаж" value="sales" />
              <Checkbox label="Новое поступление" value="date"/>
            </div>
            <div className="fieldset checkboxes">
              <legend>Пол и возраст</legend>
              <Checkbox dataFilter="person" value="male" label="Мужчинам"/>
              <Checkbox dataFilter="person" value="female" label="Женщинам"/>
              <Checkbox dataFilter="person" value="boys" label="Мальчикам"/>
              <Checkbox dataFilter="person" value="girls" label="Девочкам"/>
            </div>
            <div className="fieldset checkboxes">
              <legend>Материал</legend>
              <Checkbox dataFilter="material" value="leather" label="Кожа"/>
              <Checkbox dataFilter="material" value="ecoleather" label="Экокожа"/>
              <Checkbox dataFilter="material" value="vinyl" label="ПВХ"/>
              <Checkbox dataFilter="material" value="suede" label="Замша"/>
              <Checkbox dataFilter="material" value="metal" label="Металл"/>
              <Checkbox dataFilter="material" value="wood" label="Дерево"/>
              <Checkbox dataFilter="material" value="plastic" label="Пластик"/>
            </div>
            <div className="fieldset checkboxes">
              <legend>Бренд</legend>
              <Checkbox dataFilter="brand" value="matoone" label="Matoone"/>
              <Checkbox dataFilter="brand" value="fashion" label="Модные бренды одежды"/>
              <Checkbox dataFilter="brand" value="carbrand" label="Автомобильные бренды"/>
            </div>
            <div className="fieldset checkboxes">
              <legend>Цвет</legend>
              <ColorSwatch title="Белый" value="white" swatchColor="#FFF"/>
              <ColorSwatch title="Голубой" value="white_blue" swatchColor="#7787FF"/>
              <ColorSwatch title="Черный" value="black" swatchColor="#000"/>
              <ColorSwatch title="Красный" value="red" swatchColor="#F23939"/>
              <ColorSwatch title="Белый" value="white" swatchColor="#FFF"/>
              <ColorSwatch title="Голубой" value="white_blue" swatchColor="#7787FF"/>
              <ColorSwatch title="Черный" value="black" swatchColor="#000"/>
              <ColorSwatch title="Красный" value="red" swatchColor="#F23939"/>
              <ColorSwatch title="Белый" value="white" swatchColor="#FFF"/>
              <ColorSwatch title="Голубой" value="white_blue" swatchColor="#7787FF"/>
            </div>

            <div className="fieldset fieldset-text">
              <legend>Цена ₽</legend>
              <input type="text" data-filter="min_price" name="min_price" placeholder="От"/>
              <input type="text" data-filter="max_price" name="max_price" placeholder="До"/>
            </div>
            <div className="fieldset fieldset-text">
              <legend>В наличии (шт)</legend>
              <input type="text" data-filter="min_stock" name="min_stock" placeholder="От"/>
              <input type="text" data-filter="max_stock" name="max_stock" placeholder="До"/>
            </div>
          </div>
          <div className="right-column">
            <div className="fieldset checkboxes">
              <legend>Деньги, карты и ключи</legend>
              <Checkbox label="Кошельки"/>
            </div>
            <div className="fieldset checkboxes">
              <legend>Обложки для</legend>
              <Checkbox label="Паспорта"/>
            </div>
            <div className="fieldset checkboxes">
              <legend>Рюкзаки и сумки</legend>
              <Checkbox label="Рюкзаки"/>
            </div>
          </div>
          <div className="buttons_container">
            <button onClick={ this.submitSearch } id="submit_search" className="proxima-18">Поиск</button>
            <button onClick={ this.resetFilters } id="reset_filters" className="proxima-18">Сбросить фильтры</button>
          </div>
        </form>
      </div>
    )
  }
}

class Checkbox extends Component {

  render() {
    return(
      <label className="button-checkbox">
        <input data-filter={ this.props.dataFilter } type="checkbox" name={ this.props.name } value={ this.props.value }/>
        <span>{ this.props.label }</span>
      </label>
    )
  }
}

class ColorSwatch extends Component {

  render() {
    return(
      <label title={ this.props.title } className="color-swatch">
        <input data-filter="color" name={ this.props.name } value={ this.props.value } type="checkbox"/>
        <span style={{ backgroundColor: this.props.swatchColor }}></span>
      </label>
    )
  }
}
