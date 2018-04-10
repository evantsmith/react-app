import React, { Component } from 'react';
import './App.css';

const axios = require('axios');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      one: ['helloooo', 'goodbyeee', 6],
      another: 5,
    };
  }
  componentDidMount() {
    axios.get('https://hacker-news.firebaseio.com/v0/newstories.json').then((data) => {
      const storyIds = data.data.slice(0, 100);
      console.log(storyIds);
      const stories = [];
      storyIds.forEach((storyId) => {
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`).then((data1) => {
          console.log(data1);
          stories.push(data1);
        }).catch((error) => {
          console.log(error);
        });
      });
      console.log(stories[0]);
    }).catch((err) => {
      console.log(err);
    });
  }
  render() {
    const { one, another } = this.state;
    let items = one;
    items = items.map((item, index) => {
      if (item === 6) {
        return item;
      }
      return 5;
    });
    return (
      <div></div>
    );
  }
}
