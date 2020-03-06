import React, { Component, Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import ButtonLink from './button-link.component.js';

export default class Post extends Component{
  render() {

    const {
      className,
      post
    } = this.props;

    return(
      <Fragment>
        { post ?
          <div style={{ backgroundImage: `url(${post._embedded['wp:featuredmedia'][0].source_url})` }} className={ "post " + post._embedded['wp:term'][0][0].name }>
            <h2 className="montserrat-56 m-montserrat-30">
              { post.title['rendered'] }
            </h2>
            <p className="proxima-18 m-proxima-12">
              { ReactHtmlParser(post.content['rendered']) }
            </p>
            <ButtonLink to="/" text="Посмотреть раздел" className="proxima-18"/>
          </div> :
          null
        }
      </Fragment>
    )
  }
}
