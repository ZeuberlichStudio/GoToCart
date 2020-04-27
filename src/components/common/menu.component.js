import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Tabs from 'components/ui/tabs.component';
import { LabeledCheckbox, ColorCheckbox } from 'components/catalogue/checkboxes.component';

export default class Menu extends Component {

  render() {
    return(
      <div id="menu">
        <Tabs
          className="menu_tabs"
          content={[
            {
              title: 'По фильтрам',
              content: <MenuFilters history={ this.props.history }/>
            },
            {
              title: 'По категориям',
              content: <MenuCategories/>
            },
          ]}
        />
      </div>
    )
  }
}

class MenuFilters extends Component{

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
    for( let field of this.state.fields ){
      field.type === 'checkbox' ?
      field.checked = false : field.value = '';
    }
  }

  submitSearch = e => {
    e.preventDefault();

    let query_params = '';
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
      query_params = query_params + '&material=';
      filters.material.forEach( (material, i) => {
        query_params = i ?
        query_params + `,${material}` : query_params + material;
      });
    }

    //Set parameters for color;
    if( filters.color ){
      query_params = query_params + '&color=';
      filters.color.forEach( (color, i) => {
        query_params = i ?
        query_params + `,${color}` : query_params + color;
      });
    }

    //Set parameters for age and sex;
    if( filters.person ){
      query_params = query_params + '&person=';
      filters.person.forEach( (person, i) => {
        query_params = i ?
        query_params + `,${person}` : query_params + person;
      });
    }

    //Set parameters for brand;
    if( filters.brand ){
      query_params = query_params + '&brand=';
      filters.brand.forEach( (brand, i) => {
        query_params = i ?
        query_params + `,${brand}` : query_params + brand;
      });
    }

    //Set parameters for category;
    if( filters.cat ){
      query_params = query_params + '&cat=';
      filters.cat.forEach( (cat, i) => {
        query_params = i ?
        query_params + `,${cat}` : query_params + cat;
      });
    }

    //Set parameters for min-max price;
    if( filters.min_price ){
      query_params = query_params + `&min_price=${filters.min_price}`;
    }
    if( filters.max_price ){
      query_params = query_params + `&max_price=${filters.max_price}`;
    }

    //Set parameters for min-max stock;
    if( filters.min_stock ){
      query_params = query_params + `&min_stock=${filters.min_stock}`;
    }
    if( filters.max_stock ){
      query_params = query_params + `&max_stock=${filters.max_stock}`;
    }

    console.log(query_params)
    this.props.history.push(`/catalogue/search?${query_params}`);
  }

  render() {
    return(
      <Fragment>
        <div className="menu_tabs_content_annotation">
          <p>Просто отметьте все интересующие вас параметры и мы составим для вас оптимальный список товаров</p>
        </div>
        <div id="filters" className="menu_tabs_content_filters">
          <form id="filters-form" className="menu_tabs_content_filters_form">

            <div className="menu_tabs_content_filters_form_left-column">
              <div className="menu_tabs_content_filters_form_fieldset">
                <legend>Основные фильтры</legend>
                <LabeledCheckbox label="Хит продаж" value="sales" />
                <LabeledCheckbox label="Новое поступление" value="date"/>
              </div>
              <div className="menu_tabs_content_filters_form_fieldset">
                <legend>Пол и возраст</legend>
                <LabeledCheckbox dataFilter="person" value="male" label="Мужчинам"/>
                <LabeledCheckbox dataFilter="person" value="female" label="Женщинам"/>
                <LabeledCheckbox dataFilter="person" value="boys" label="Мальчикам"/>
                <LabeledCheckbox dataFilter="person" value="girls" label="Девочкам"/>
              </div>
              <div className="menu_tabs_content_filters_form_fieldset">
                <legend>Материал</legend>
                <LabeledCheckbox dataFilter="material" value="leather" label="Кожа"/>
                <LabeledCheckbox dataFilter="material" value="ecoleather" label="Экокожа"/>
                <LabeledCheckbox dataFilter="material" value="vinyl" label="ПВХ"/>
                <LabeledCheckbox dataFilter="material" value="suede" label="Замша"/>
                <LabeledCheckbox dataFilter="material" value="metal" label="Металл"/>
                <LabeledCheckbox dataFilter="material" value="wood" label="Дерево"/>
                <LabeledCheckbox dataFilter="material" value="plastic" label="Пластик"/>
              </div>
              <div className="menu_tabs_content_filters_form_fieldset">
                <legend>Бренд</legend>
                <LabeledCheckbox dataFilter="brand" value="matoone" label="Matoone"/>
                <LabeledCheckbox dataFilter="brand" value="fashion" label="Модные бренды одежды"/>
                <LabeledCheckbox dataFilter="brand" value="carbrand" label="Автомобильные бренды"/>
              </div>
              <div className="menu_tabs_content_filters_form_fieldset">
                <legend>Цвет</legend>
                <ColorCheckbox title="Белый" value="white" color="#FFF"/>
                <ColorCheckbox title="Голубой" value="white_blue" color="#7787FF"/>
                <ColorCheckbox title="Черный" value="black" color="#000"/>
                <ColorCheckbox title="Красный" value="red" color="#F23939"/>
                <ColorCheckbox title="Белый" value="white" color="#FFF"/>
                <ColorCheckbox title="Голубой" value="white_blue" color="#7787FF"/>
                <ColorCheckbox title="Черный" value="black" color="#000"/>
                <ColorCheckbox title="Красный" value="red" color="#F23939"/>
                <ColorCheckbox title="Белый" value="white" color="#FFF"/>
                <ColorCheckbox title="Голубой" value="white_blue" color="#7787FF"/>
              </div>

              <div className="menu_tabs_content_filters_form_fieldset">
                <legend>Цена (руб.)</legend>
                <input type="number" data-filter="min_price" name="min_price" placeholder="От"/>
                <input type="number" data-filter="max_price" name="max_price" placeholder="До"/>
              </div>
              <div className="menu_tabs_content_filters_form_fieldset">
                <legend>В наличии (шт)</legend>
                <input type="number" data-filter="min_stock" name="min_stock" placeholder="От"/>
                <input type="number" data-filter="max_stock" name="max_stock" placeholder="До"/>
              </div>
            </div>

            <div className="menu_tabs_content_filters_form_right-column">
              <div className="menu_tabs_content_filters_form_fieldset">
                <legend>Деньги, карты и ключи</legend>
                <LabeledCheckbox label="Кошельки"/>
              </div>
              <div className="menu_tabs_content_filters_form_fieldset">
                <legend>Обложки для</legend>
                <LabeledCheckbox label="Паспорта"/>
              </div>
              <div className="menu_tabs_content_filters_form_fieldset">
                <legend>Рюкзаки и сумки</legend>
                <LabeledCheckbox label="Рюкзаки"/>
              </div>
            </div>

            <div className="menu_tabs_content_filters_form_controls">
              <button onClick={ this.submitSearch } id="submit_search" className="proxima-18">Поиск</button>
              <button onClick={ this.resetFilters } id="reset_filters" className="proxima-18">Сбросить</button>
            </div>

          </form>
        </div>
      </Fragment>
    )
  }
}

class MenuCategories extends Component {

  componentDidUpdate(prevProps, prevState) {
    if( prevState.selected !== this.state.selected ){
      this.fetchCategories(this.state.selected);
    }
  }

  componentDidMount() {
    this.fetchCategories();
  }

  state = {
    cats: null,
    subcats: null,
    selected: []
  }

  fetchCategories = ( id ) => {
    let url =
    `http://localhost/wp-json/product-fetcher/v1/categories/?parent_id=${id ? id : 0}`;

    fetch( url, {
      method: 'get',
      mode: 'cors',
    })
    .then( response => response.json() )
    .then( response => { id ? this.setState({ subcats: response }) : this.setState({ cats: response }) } )
    .catch( err => console.log(err) );
  }

  selectCategroy = (id) => {
    this.setState({selected:id});
  }

  render() {

    const { selected, cats, subcats } = this.state;

    return(
      <Fragment>
        <div className="menu_tabs_content_annotation">
          <p>
            Просто отметьте все интересующие
             вас параметры и мы составим для
              вас оптимальный список товаров
          </p>
        </div>
        <div className="menu_tabs_content_categories">
          <ul>
            {
              cats && Array.isArray(cats) ?
              cats.map(
                (cat, i) =>
                <li
                  onClick={ () => this.selectCategroy( cat.id ) }
                  className={ selected === cat.id ? 'active-category' : null }
                >
                  { cat.name }
                </li>
              ) : null
            }
          </ul>
          <ul>
            {
              subcats && Array.isArray(subcats) ?
              subcats.map(
                (subcat, i) =>
                <li>
                  <Link to={`catalogue/${ subcat.parent }/${ subcat.id }`}>{ subcat.name }</Link>
                </li>
              ) : null
            }
          </ul>
        </div>
      </Fragment>
    );
  }
}
