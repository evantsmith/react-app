import React, { Component } from 'react';
import './App.css';

const axios = require('axios');

export default class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      one: ['helloooo', 'goodbyeee', 6],
      another: 5,
    };
  }
  componentDidMount() {

  }
  render() {
    return (
      <div></div>
    );
  }
}

