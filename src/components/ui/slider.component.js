import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ButtonLink from './button-link.component.js'
import HtmlParser from 'react-html-parser';

export default class LinkButton extends Component{

  componentDidUpdate(prevProps, prevState) {
    if( this.state.posts && prevState.posts !== this.state.posts ){
      this.makeClones();
      this.state.slideCount = this.state.posts.length;
    }
  }

  componentDidMount() {
    this.fetchPosts();
  }

  state = {
    posts: null,
    slideCount: 0,
    activeSlide: 0
  }

  fetchPosts = () => {
    let url = `http://localhost/wp-json/wp/v2/posts?_embed&categories=${this.props.postsCat}`;

    fetch(url, {
      method: 'get',
      mode: 'cors'
    }).
    then(res => res.json()).
    then(res => this.setState({posts: res})).
    catch(err => console.log(err));
  }

  makeClones = () => {
    let container = document.getElementById(`${this.props.id}_slides-container`);
    let slides = container.childNodes;
    let firstClone = document.createElement('div');
        firstClone.classList.add('slide', 'slide-0-clone');
        firstClone.innerHTML = slides[0].innerHTML;

    let lastClone = document.createElement('div');
        lastClone.classList.add('slide', `slide-${slides.length - 1}-clone`);
        lastClone.innerHTML = slides[slides.length - 1].innerHTML;

    container.insertBefore(lastClone, slides[0]);
    container.appendChild(firstClone, slides[slides.length - 1]);
  }

  changeSlide = (e) => {
    let goToSlide = parseInt(e.currentTarget.dataset.slide);

    if( goToSlide > -1 && goToSlide < this.state.slideCount ){
      document.getElementById(this.props.id).style.setProperty('--slide', goToSlide + 1 );
      this.setState({ changing: true });
      this.setState({ activeSlide: goToSlide });
    }
    else if( goToSlide < 0 ){
      document.getElementById(this.props.id).style.setProperty('--slide', goToSlide + 1 );
      this.setState({ changing: true });
      this.setState({ activeSlide: this.state.slideCount - 1 });
      setTimeout(() => {
        this.setState({ changing: false });
        document.getElementById(this.props.id).style.setProperty('--slide', this.state.slideCount );
      }, 300);
    }
    else if( goToSlide > this.state.slideCount - 1 ){
      document.getElementById(this.props.id).style.setProperty('--slide', goToSlide + 1 );
      this.setState({ changing: true });
      this.setState({ activeSlide: 0 });
      setTimeout(() => {
        this.setState({ changing: false });
        document.getElementById(this.props.id).style.setProperty('--slide', 1 );
      }, 300);
    }
  };

  render() {

    const {
      posts,
      slideCount,
      activeSlide,
      changing
    } = this.state;

    return(
      <div id={ this.props.id } className="slider">
        <div
          id={ `${this.props.id}_slides-container` }
          className={`slides-container ${ changing ? 'changing' : null }`}>
          {
            posts ? posts.map((post, i) => <Slide post={post} i={i}/>) : null
          }
        </div>
        <div className="controls">
          <i style={{ transform: `translateX(calc(1.04167vw * ${activeSlide}))` }} className="indicator"></i>
          <button onClick={ this.changeSlide } data-slide={ activeSlide - 1 } className="prev-slide"></button>
          {
            posts ? posts.map( (post, i) =>
            <button key={i} data-slide={i} className="go-to-slide"/> ) : null
          }
          <button onClick={ this.changeSlide } data-slide={ activeSlide + 1 } className="next-slide"></button>
        </div>
      </div>
    )
  }
}

function Slide(props) {
  const {post} = props;
  return(
    <div className={`slide slide-${props.i}`}>
      <img src={post._embedded['wp:featuredmedia'][0].source_url}/>
      <div className="text-container">
        <h2 className="montserrat-80 m-montserrat-30">{ post.title.rendered }</h2>
        <p className="proxima-18 m-proxima-12">
          { HtmlParser(post.content.rendered.replace(/<p>|\<\/p>/gi, '')) }
        </p>
        <Link to={post.link_url} className="button-link proxima-18 m-proxima-12 undefined">
          {post.link_text}
        </Link>
      </div>
    </div>
  );
}
