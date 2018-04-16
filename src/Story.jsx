import React, { Component } from 'react';
import './App.css';
import Comments from './Comments';

export default class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
    };
  }
  componentWillReceiveProps(newProps) {
    const stories = newProps.data;
    const stories2 = stories.map((story, index) => {
      const heading = 'heading' + index;
      const href = '#collapse' + index;
      const ariaControls = 'collapse' + index;
      return (
        <div className="card head" key={story.id}>
          <div className="card-header head1" role="tab" id={heading} >
            <div id="link1" className="collapsed" data-toggle="collapse" href={href} aria-expanded="false" aria-controls={ariaControls}>
              <a className="mainTextCSS" target="_blank" href={story.url} >
                {story.title}
              </a>
            </div>
          </div>
          <div id={ariaControls} className="collapse down" role="tabpanel" aria-labelledby={heading}>
            <div className="card-body collapseTextCSS">
              <Comments data1={story} />
            </div>
          </div>
        </div>
      );
    });
    this.setState({ stories: stories2 });
  }
  render() {
    const { stories } = this.state;
    return (
      <div>{stories}</div>
    );
  }
}
