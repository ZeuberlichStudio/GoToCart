import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Tabs from '../ui/tabs.component';
import { VKShareButton, FBShareButton, FavButton } from 'components/ui/share-buttons.component';
import Scrollbar from 'components/ui/scrollbar.component';

export function ProductItemList(props) {

  const { url } = useRouteMatch();

  function composeAttributes( attributes ) {
    return <ul className="catalog-item_content_info-tabs_content_attributes">
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
    return <ul className="catalog-item_content_info-tabs_content_comments">
             {
               comments.map( comment =>
                 <li>
                   <img className="product-comment_author-avatar" src={ comment.author_avatar }/>
                   <p className="product-comment_author-name">{ comment.author_name }</p>
                   <p className="product-comment_comment-content">{ comment.comment_content }</p>
                 </li>
               )
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

  function generateLink(id) {
    let link = `http://localhost:3000/product=${id}`;
    return link;
  }

  const {
    id,
    title,
    sku,
    description,
    price,
    thumb,
    attributes,
    stock,
    comments,
    variations
  } = props;

  return(
    <div className="catalog-item">
      <div className="catalog-item_share">
        <VKShareButton link={ generateLink(id) }/>
        <FBShareButton link={ generateLink(id) }/>
        <FavButton/>
      </div>

      <div className="catalog-item_image-wrapper">
        <img src={ thumb } />
      </div>
      <div className="catalog-item_content">
        <h2><Link to={ `/product=${id}` }>{ title }</Link></h2>
        <span className="catalog-item_content_sku"><span>Арт: </span>{ sku }</span>
        <span className="catalog-item_content_brand">
          <span>Бренд: </span>
          { returnBrand(attributes) }
        </span>

        <Tabs
        className="catalog-item_content_info-tabs"
        content={[
          {
            title: "Описание",
            content: ReactHtmlParser(description)
          },
          {
            title: "Характеристики",
            content: composeAttributes(attributes)
          },
          {
            title: "Отзывы",
            content: composeComments(comments)
          }
        ]}
        />

        <ul className="catalog-item_content_colors">
          { composeColors(variations, attributes) }
        </ul>

        <span className="catalog-item_content_stock">
          <span>В наличии: </span>
          { stock ? stock : 0 }шт.
        </span>

        <div className="catalog-item_content_buy">
          <input placeholder="1 шт." value=""/>
          <button>Купить</button>
        </div>
        <div className="catalog-item_content_price">
          <p>{ price }Р</p>
          <span>Выше опт — ниже цена</span>
        </div>
      </div>
    </div>
  );
}

export function ProductItemGrid(props) {

  const { url } = useRouteMatch();

  function generateLink(id) {
    let link = `http://localhost:3000/product=${id}`;
    return link;
  }

  const {
    id,
    title,
    description,
    stock,
    price,
    thumb,
    layout
  } = props;

  return(
    <div className="catalog-item product-item">
      <img src={ thumb } />

      <div className="product-item_share">
        <VKShareButton link={ generateLink(id) }/>
        <FBShareButton link={ generateLink(id) }/>
        <FavButton/>
      </div>

      <div className="product-item_info">
        <div className="product-item_info_preview">
          <h2>{ title }</h2>
          <span>{"До " + price } руб.</span>
        </div>

        <p className="product-item_info_desc">
          { ReactHtmlParser(description) }
        </p>

        <span className="product-item_info_stock">
          <span>В наличии:</span>
          { stock }
        </span>

        <div className="product-item_info_price-and-link proxima-18">
          <span>{ price + "Р"}</span>
          <Link to={ `/product=${id}` }>Подробнее</Link>
        </div>
      </div>
    </div>
  );
}
