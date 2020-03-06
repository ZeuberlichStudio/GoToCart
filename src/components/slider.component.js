import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ButtonLink from './button-link.component.js'

export default class LinkButton extends Component{

  componentDidMount() {
    if( this.props.id ) {
      let slideCount = document.getElementById(this.props.id).getElementsByClassName('slide').length;
      this.setState({slideCount});
    }
  }

  state = {
    slideCount: 0,
    activeSlide: 0
  }

  changeSlide = (e) => {
    let goToSlide = parseInt(e.currentTarget.dataset.slide);

    if( goToSlide > -1 && goToSlide < this.state.slideCount ){
      document.getElementById(this.props.id).style.setProperty('--slide', goToSlide);
      this.setState({ activeSlide: goToSlide });
    }
  };

  render() {

    const {
      slideCount,
      activeSlide
    } = this.state;

    const slideButtons = [];

    for( let i = 0; i < slideCount; i++ ) {
      slideButtons.push(
        <button key={i} data-slide={i} className="go-to-slide">
        </button>
      );
    };

    return(
      <div id={ this.props.id } className="slider">
        <div className="slides-container">
          <div className="slide">
            <div className="text-container">
              <h2 className="montserrat-80 m-montserrat-30">Новое поступление</h2>
              <p className="proxima-18 m-proxima-12">
              Современный daypack рюкзак из экологически чистой ткани на основе натурального
хлопка с водоотталкивающим покрытием. Рюкзак с вместительным основным отсеком
на двухсторонней молнии, внутренним карманом с мягкой подкладкой для ноутбука,
дополнительными боковыми карманами на молниях для быстрого доступа и потайным
карманом на лицевой части.
              </p>
              <ButtonLink to="" text="Перейти к каталогу"/>
            </div>
          </div>
          <div className="slide">
          </div>
          <div className="slide">
          </div>
          <div className="slide">
          </div>
        </div>
        <div className="controls">
          <i className="indicator"></i>
          <button onClick={ this.changeSlide } data-slide={ activeSlide - 1 } className="prev-slide"></button>
          { slideButtons }
          <button onClick={ this.changeSlide } data-slide={ activeSlide + 1 } className="next-slide"></button>
        </div>
      </div>
    )
  }
}
