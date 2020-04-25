import React, { Component } from 'react';

export default class Tabs extends Component {

  state = {
    tab: 0,
    changing: 0
  }

  changeTab = e => {
    let tab = parseInt(e.currentTarget.dataset.tab);
    let tab_content = document.getElementsByClassName(this.props.className + "_content")[0];

    this.setState({ changing: 1 });
    setTimeout( () => {
      this.setState({ tab });
      this.setState({ changing: 0 });
    }, 300 );
  }

  render() {

    const {
      className,
      content
    } = this.props;

    return(
      <div className={ this.props.className }>
        <div className={ this.props.className + "_controls" }>
          {
            content.map((item, i) =>
              <button
              data-tab={ i }
              key={ i }
              onClick={ this.changeTab }
              className={ this.state.tab === i ? "active-tab" : null }
              >
                { item.title }
              </button>
            )
          }
        </div>
        <div
        className={ this.props.className + "_content" }
        style={{
          opacity: this.state.changing ? 0 : 1,
          transition: "opacity 0.3s"
        }}>
          { content[this.state.tab].content  }
        </div>
      </div>
    )
  }
}
