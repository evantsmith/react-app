import React, { Component } from 'react';
import './App.css';

const axios = require('axios');

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments2: [],
    };
  }
  componentDidMount() {
    const story = this.props.data1;
    let comments2 = [];
    if (story.kids !== undefined) {
      const reqs2 = story.kids.map((commentId) => {
        return new Promise ((resolve) => {
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`).then((data2) => {
            resolve(data2.data);
          }).catch((error2) => {
            console.log('cannot get comment');
          });
        });
      });
      Promise.all(reqs2).then((comments) => {
        comments2 = comments.map((comment, index) => {
          if (comment.deleted) {
            return (<li key={comment.id}>(Deleted)</li>);
          }
          if (!comment.text.includes('<script')) {
            return (<li key={comment.id}>
              <span dangerouslySetInnerHTML={{__html: comment.text}} /> - {comment.by}
              </li>);
          }
        });
        this.setState({ comments2 });
      });
    } else {
      this.setState({ comments2 });
    }
  }
  render() {
    const { comments2 } = this.state;
    return (
      <ol>{comments2}</ol>
    );
  }
}
