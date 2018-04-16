import React, { Component } from 'react';
import './App.css';
import Story from './Story';

const axios = require('axios');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
    };
  }
  componentDidMount() {
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json').then((data) => {
      const storyIds = data.data.slice(0, 100);
      const reqs = storyIds.map((storyId) => {
        return new Promise ((resolve) => {
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`).then((data1) => {
            resolve(data1.data);
          }).catch((error) => {
            console.error(error);
          });
        });
      });
      Promise.all(reqs).then((stories) => {
        this.setState({ stories });
      });
    }).catch((err) => {
      console.log('Cannot get top stories: ', err);
    });
  }
  render() {
    const { stories } = this.state;
    return (
      <div className="flex-container-1">
        <div className="tablist1" role="tablist">
          <Story data={stories} />
        </div>
      </div>
    );
  }
}

