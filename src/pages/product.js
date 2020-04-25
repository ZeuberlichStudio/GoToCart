import React, { Component, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Tabs from 'components/ui/tabs.component';
import ReactHtmlParser from 'react-html-parser';
import { VKShareButton, FBShareButton, FavButton } from 'components/ui/share-buttons.component';
import { ProductItemGrid } from 'components/catalogue/product_item.component';
import Loading from 'components/ui/loading.component';

export default class Product extends Component {

  componentDidMount() {
    this.fetchProductData();
  }

  state = {
    product_data: null,
    currentVariation: 0,
  }

  fetchProductData = () => {
    let url = `http://localhost/wp-json/product-fetcher/v1/products/${ this.props.match.params.product_id }`;

    fetch( url, {
      'method': 'get',
      'mode': 'cors'
    })
    .then( res => res.json() )
    .then( res => this.setState({ product_data: res }) )
    .catch( err => console.log(err) );
  }

  changeVariation = (i) => {
    this.setState({ currentVariation: i })
  }

  render() {

    const {
      product_data,
      currentVariation
    } = this.state;
    console.log(product_data)
    let path = this.props.location.pathname;
    let subcatLink = path.substring(0, path.lastIndexOf("/"));
    let catLink = subcatLink.substring(0, subcatLink.lastIndexOf("/"));

    return(
      <div id="individual-product-wrapper">
        <style>
          {
            `body{
              overflow: hidden
            }`
          }
        </style>
        <section id="individual-product">
          <div id="individual-product_share" className="individual-product_share">
            <VKShareButton link={ path }/>
            <FBShareButton link={ path }/>
            <FavButton/>
          </div>
          <Link id="individual-product_close" to={subcatLink}></Link>
          {
            product_data ?

            <Fragment>
              <div id="product-container" className="product">
                <ProductImages product={ product_data.variations[currentVariation] }/>
                <ProductInfo product={ product_data }/>
              </div>
              <RelatedProducts products={ product_data.related }/>
            </Fragment>

            :

            <Loading/>
          }
        </section>
      </div>
    );
  }
}

function ProductImages( props ) {

  const { product } = props;

  const [ currentImage, setCurrentImage] = useState(0);

  function changeImage(i) {
    setCurrentImage(i);
  }

  return(
    <div className="product_images">
      <div className="product_images_selected-wrapper">
        <img src={ product.images[currentImage].src } />
      </div>
      <div className="product_images_selector">
        {
          product.images.map(
            (image, i) =>
            <button
             className={ currentImage === i ? 'active-image' : null }
             onClick={ () => changeImage(i) }
            >
              <img src={ image.src }/>
            </button>
          )
        }
      </div>
    </div>
  );
}

function ProductInfo(props) {

  const { product } = props;

  function composeAttributes( attributes ) {
    return <ul className="product_info_tabs_content_attributes">
             {
              attributes.map( attribute => {
               if ( attribute.name !== "бренд" && attribute.slug !== "pa_color" )
               return <li>
                       <span>
                         { attribute.name.charAt(0).toUpperCase() + attribute.name.replace(/-/g, " ").slice(1) }
                       </span>
                       <hr/>
                       <span>{ attribute.options.map( (option, i) => option + (attribute.options.length > 1 ? '; ' : '') ) }</span>
                     </li>
               }
              )
            }
           </ul>
  }

  function composeComments( comments ) {
    return <ul className="product_info_tabs_content_comments">
             {
               comments > 0 ?
               comments.map( comment =>
                 <li>
                   <img className="product-comment_author-avatar" src={ comment.author_avatar }/>
                   <p className="product-comment_author-name">{ comment.author_name }</p>
                   <p className="product-comment_comment-content">{ comment.comment_content }</p>
                 </li>
               )
               :
               <li>Отзывы о данном товаре отсутствуют.</li>
             }
           </ul>
  }

  function composeColors( variations, attributes ) {
    return variations.map( variation => {
          let color =
          attributes.find( x => x.slug === 'pa_color' ).options.find( x => x.slug === variation.attributes[0].option ).description;
          return <li style={{backgroundColor: color}}></li>;
      })
  }

  function returnBrand ( attributes ) {
    let brand = attributes.find( attribute => attribute.name === 'бренд');
    return brand ? brand.options[0] : null;
  }

  return(
    <div className="product_info">
    {console.log(product)}
      <h2 className="product_info_title">{ product.name }</h2>
      <span className="product_info_sku"><span>Арт: </span>{ product.sku }</span>
      <span className="product_info_brand">
        <span>Бренд: </span>
        { returnBrand(product.attributes) }
      </span>

      <Tabs
      className="product_info_tabs"
      content={[
        {
          title: "Описание",
          content: <div className="product_info_tabs_content_description">{ReactHtmlParser(product.description)}</div>
        },
        {
          title: "Характеристики",
          content: composeAttributes(product.attributes)
        },
        {
          title: "Отзывы",
          content: composeComments(product.comments)
        }
      ]}
      />

      <ul className="product_info_colors">
        <span>Цвета:</span>
        { composeColors(product.variations, product.attributes) }
      </ul>

      <span className="product_info_stock">
        <span>В наличии: </span>
        { product.stock ? product.stock : 0 }шт.
      </span>

      <div className="product_info_buy">
        <input placeholder="1 шт." value=""/>
        <button>Купить</button>
      </div>
      <div className="product_info_price">
        <p>{ product.price }₽</p>
        <span>Выше опт — ниже цена</span>
      </div>
    </div>
  );
}

function RelatedProducts(props) {
  return(
    <div className="related-products grid-2">
      {
        props.products.map( product =>
          <ProductItemGrid
            id={product.id}
            title={product.name}
            description={product.short_description}
            stock={product.stock_quantity}
            price={product.price}
            thumb={product.images[0].src}
          />
        )
      }
    </div>
  );
}
