import React, { Component } from 'react';
import { ProductItemList, ProductItemGrid } from './product_item.component';
import Filters from './filters.component';
import Loading from 'components/ui/loading.component';

export default class Products extends Component{

  componentDidMount() {
    this.composeQuery();
    console.log(this.state.query)
  }

  componentDidUpdate( prevProps ,prevState ) {
    if ( prevState.query !== this.state.query ){
      this.fetchProducts();
      console.log(this.state.query);
    }
  }

  state = {
    query: {},
    items: [],
    layout: 'grid-0',
    activeFilters: true
  }

  fetchProducts = () => {
    let url =
    `http://localhost/wp-json/product-fetcher/v1/search/?`;

    Object.keys(this.state.query).forEach( key => {
      url = url + '&' + key + '=' + this.state.query[key];
    });

    fetch( url, {
      method: 'get',
      mode: 'cors',
    })
    .then( response => response.json() )
    .then( response => this.setState({ products: response }) )
    .catch( err => console.log(err) );
  }

  composeQuery = () => {
    let params = this.props.location.search.replace('?', '').split('&');
    let query = [];

    params.forEach( param => {
      let name = param.split('=')[0];
      let value = param.split('=')[1];
      query[name] = value;
    });

    if( !query['cat'] && this.props.match.params.subcat_id ){
      query['cat'] = this.props.match.params.subcat_id;
    }

    if( !query['orderby'] && !query['order']){
      query['orderby'] = 'total_sales';
      query['order'] = 'DESC';
    }

    this.setState(
      state => {
        return {
          query,
        }
      }
    );
  }

  changeOrder = e => {
    let orderby = e.currentTarget.dataset.orderby;
    let order = e.currentTarget.dataset.order;
    let on_sale = e.currentTarget.dataset.onsale;

    this.setState(
      state => {
        let query = Object.assign({}, state.query);
        query.orderby = orderby;
        query.order = order;
        query.on_sale = on_sale ? on_sale : null;

        return {
          query,
        }
      }
    );
  }

  changeLayout = e => {
    let layout = e.currentTarget.type === 'range' ? ('grid-' + e.currentTarget.value) : e.currentTarget.value;

    this.setState({ layout });
  }

  applyFilters = e => {
    e.preventDefault();

    let form = document.getElementsByClassName('catalog-container_filters_form')[0];
    let inputs = form.getElementsByTagName('input');
    let applied_filters = {};

    for ( let input of inputs ){
      if(
        (input.type === 'checkbox' &&
        input.checked) ||
        (input.type === 'number' &&
        input.value)
      ){
        applied_filters[input.dataset.filter] =
        applied_filters[input.dataset.filter] ?
        applied_filters[input.dataset.filter] : new Array();

        applied_filters[input.dataset.filter].push(input.value);
      }
    }

    let new_query = [];

    for ( let [key, value] of Object.entries( applied_filters ) ){
      let parameter;
      value.forEach((option, i) => {
        parameter = i ? parameter + `,${option}` : option;
      });
      new_query[key] = parameter;
    }

    this.setState(
      state => {
        let query = Object.assign({}, state.query);
        let query_params = [
          'color',
          'material',
          'person',
          'brand',
          'max_price',
          'min_price',
          'max_stock',
          'min_stock'
        ];

        query_params.forEach( param => {
           new_query[param] ? (query[param] = new_query[param]) : (delete query[param]);
        });

        return {
          query,
        }
      }
    );
  }

  render() {

    const {
      products,
      layout,
      activeFilters
    } = this.state;

    return(
      <main id="catalog">
        <section>
          <div className="catalog-container">
            <CatalogControls
             activeOrder={
               this.state.query.on_sale ? 'on_sale' : this.state.query.orderby + '_' + this.state.query.order
             }
             activeLayout={
               this.state.layout
             }
             changeOrder={ this.changeOrder }
             changeLayout={ this.changeLayout }
            />

            { activeFilters ? <Filters applyFilters={ this.applyFilters } className={ layout }/> : null }

            <div
              id="catalog-items-container"
              className={ layout + " " + (activeFilters ? "active-filters" : null) }
            >
              { (Array.isArray( this.state.products )) ? layout !== 'list' ?
                products.map( (product, i) =>
                  <ProductItemGrid
                    id={product.id}
                    title={product.name}
                    description={product.short_description}
                    stock={product.stock_quantity}
                    price={product.price}
                    thumb={product.images[0].src}
                    layout={layout}
                  />
                ) :
                products.map( (product, i) =>
                  <ProductItemList
                    id={product.id}
                    title={product.name}
                    sku={product.sku}
                    description={product.description}
                    price={product.price}
                    thumb={product.images[0].src}
                    attributes={product.attributes}
                    stock={product.stock_quantity}
                    comments={product.comments}
                    variations={product.variations}
                  />
                ) : <Loading/>}
            </div>
          </div>
        </section>
      </main>
    )
  }
}

class CatalogControls extends Component {
  render() {

    const {
      activeOrder,
      activeLayout
    } = this.props;

    return(
      <div className="catalog-controls">
        <div className="catalog-controls_change-order">
          <span>Сначала</span>
          <div>
            <button onClick={ this.props.changeOrder }
             data-orderby="total_sales"
             data-order="DESC"
             className={ activeOrder === "total_sales_DESC" ? "active-order" : null }
            >
              Популярные
            </button>
            <button
             onClick={ this.props.changeOrder }
             data-orderby="date"
             data-order="DESC"
             className={ activeOrder === "date_DESC" ? "active-order" : null }
            >
              Новые
            </button>
            <button
             onClick={ this.props.changeOrder }
             data-orderby="_price"
             data-order="DESC"
             className={ activeOrder === "_price_DESC" ? "active-order" : null }
            >
              Дорогие
            </button>
            <button
             onClick={ this.props.changeOrder }
             data-orderby="_price"
             data-order="ASC"
             className={ activeOrder === "_price_ASC" ? "active-order" : null }
            >
              Дешевые
            </button>
            <button
             onClick={ this.props.changeOrder }
             data-onsale="true"
             data-orderby="_price"
             data-order="DESC"
             className={ activeOrder === "on_sale" ? "active-order" : null }
            >
              Со скидкой
            </button>
          </div>
        </div>
        <div className="catalog-controls_change-layout">
          <span>Отображать</span>
          <div>
            <button onClick={ this.props.changeLayout } className={ activeLayout === 'list' ? 'active-layout' : null } value="list">Списком</button>
            <label className={ activeLayout.includes('grid') ? 'active-layout' : null }>
              <span>Сеткой</span>
              <input onClick={ this.props.changeLayout } type="range" min="0" max="2" defaultValue="0"/>
              <div className="slider-marks"><i/><i/><i/></div>
            </label>
          </div>
        </div>
      </div>
    )
  }
}
