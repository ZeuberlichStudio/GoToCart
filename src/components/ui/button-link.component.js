import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ButtonLink extends Component{
  render() {
    return(
      <Link to={ this.props.to } className={ ("button-link proxima-18 m-proxima-12 ") + this.props.className}>
        { this.props.text }
      </Link>
    )
  }
}
