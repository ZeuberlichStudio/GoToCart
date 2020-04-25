import React, { Component } from 'react';

import SearchBar from '../components/ui/search-bar.component.js';
import Categories from '../components/home/categories.component.js';
import Slider from '../components/ui/slider.component.js';
import Post from '../components/home/post.component.js';

export default class Home extends Component{

  componentDidMount() {
    this.getProductDetail();
    this.calculateVh();
  }

  calculateVh = () => {
    let vh = document.documentElement.clientHeight / 100;
    document.getElementById('top-container').style.setProperty('--vh', `${vh}px`);
  }

  getProductDetail = () => {
    let url = 'http://localhost/wp-json/wp/v2/posts?_embed&filter[orderby]=date&order=desc';
    fetch(url, {
        method: 'GET',
        mode: 'cors'
    }).then( response => response.json() )
    .then( response => {
        this.setState({posts: response})
    }).catch(function (error) {
            console.log(error)
        });
  }

  state = {
    posts: [],
  }

  render() {

    const {
      posts
    } = this.state;

    return(
      <main id="content" className="home-page">
        <div id="top-container">
          <h1 className="montserrat-80 m-montserrat-30">Go to store</h1>
          <p className="proxima-18 m-proxima-12">
            Добро пожаловать на оптовый магазин нового уровня,
            Заходите, смотрите и покупайте
          </p>
          <SearchBar placeholder="Например: кожаный чехол для iPhone 11"/>
          <Categories/>
          <Slider id="slider-home-page"/>
        </div>
        <div id="posts-container">
          { posts.map((post) => <Post post={post}/> ) }
        </div>
      </main>
    )
  }
}
