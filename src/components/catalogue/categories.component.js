import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CategoryItem from './category_item.component';
import Loading from 'components/ui/loading.component';

export default class Categories extends Component {

  componentDidMount() {
    this.fetchCategories();
  }

  state = {
    categories: null
  }

  fetchCategories = () => {

    let parent_id =
    this.props.match.params.cat_id ? this.props.match.params.cat_id : 0;

    let url =
    `http://localhost/wp-json/product-fetcher/v1/categories/?parent_id=${parent_id}`;

    fetch( url, {
      method: 'get',
      mode: 'cors',
    })
    .then( response => response.json() )
    .then( response => this.setState({ categories: response }) )
    .catch( err => console.log(err) );
  }


  render() {
    return(
      <main id="categories">
        <section>
          <div className="catalog-container">
            <div id="catalog-items-container" className="grid-1">
              {
                !(Array.isArray( this.state.categories )) ?
                <Loading/> :
                this.state.categories.map( (category, i) =>
                  <CategoryItem
                   id={ category.id }
                   thumb={ category.image.src }
                   title={ category.name }
                  />
                )
              }
            </div>
          </div>
        </section>
      </main>
    )
  }
}
