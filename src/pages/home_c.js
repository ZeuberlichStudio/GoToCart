import React, { Component } from 'react';

import SearchBar from '../components/search-bar.component.js';
import Categories from '../components/categories.component.js';
import Slider from '../components/slider.component.js';
import Post from '../components/post.component.js';

export default class Home extends Component{

  componentDidMount() {
    this.getProductDetail();
  }

  getProductDetail = () => {
    let url = `http://localhost:8888/wp-json/wp/v2/posts?_embed&filter[orderby]=date&order=desc`;
    fetch(url, {
        method: 'GET',
    }).then((response) => response.json())
    .then((response) => {
        this.setState({posts: response})
        this.setState({ leftColumnPosts: response.filter( (e, i) => i + 3 % 3 === 0 ) });
        this.setState({ middleColumnPosts: response.filter( (e, i) => i % 2 === 2 - 1 ) });
        this.setState({ rightColumnPosts: response.filter( (e, i) => i % 3 === 3 - 1 ) });
    }).catch(function (error) {
            console.log(error)
        });
  }

  state = {
    posts: [],
    leftColumnPosts: [],
    middleColumnPosts: [],
    rightColumnPosts: [],
  }

  render() {

    const {
      posts,
      leftColumnPosts,
      middleColumnPosts,
      rightColumnPosts
    } = this.state;

    console.log(rightColumnPosts)

    return(
      <main>
        <div id="top-container">
          <h1 className="montserrat-80">Go to store</h1>
          <p className="proxima-18">
            Добро пожаловать на оптовый магазин нового уровня,
            Заходите, смотрите и покупайте
          </p>
          <SearchBar/>
          <Categories/>
          <Slider id="slider-home-page"/>
        </div>
        <div id="posts-container">
          <div className="posts-column posts-left-column">
            { leftColumnPosts.map( (post) => <Post post={ post }/> ) }
          </div>
          <div className="posts-column posts-middle-column">
            { middleColumnPosts.map( (post) => <Post post={ post }/> ) }
          </div>
          <div className="posts-column posts-right-column">
            { rightColumnPosts.map( (post) => <Post post={ post }/> ) }
          </div>
        </div>
      </main>
    )
  }
}
