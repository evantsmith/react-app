import React, { Component } from 'react';
import './App.css';

const axios = require('axios');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theStories: [],
    };
  }
  componentDidMount() {
    let stories = [];
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json').then((data) => {
      const storyIds = data.data.slice(0, 100);
      console.log(storyIds);

      const reqs = [];
      storyIds.forEach((storyId) => {
        reqs.push(new Promise((resolve) => {
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`).then((data2) => {
            const storyData = data2;
            const comments = [];
            if (data2.data.kids !== undefined) {
              const storyCommentIds = data2.data.kids;
              storyCommentIds.forEach((commentId) => {
                axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`).then((data3) => {
                  comments.push(data3);
                }).catch((errr) => {
                  console.log(errr);
                });
              });
            }
            const returnObj = {
              storyData,
              comments,
            };
            resolve(returnObj);
          }).catch((error3) => {
            console.log(error3);
          });
        }).catch((error) => {
          console.log(error);
        }));
      });
      Promise.all(reqs).then((res) => {
        stories = res.map((story, index) => {
          console.log(story.comments);
          const comments = story.comments.map((comment, index2) => {
            return (<div>{index2} - By {comment.data.by}: {comment.data.text} <br /></div>);
          });
          setTimeout(() => {
            console.log('comments', comments);
          }, 1500);
          if (story.storyData.data !== null) {
            const heading = 'heading' + index;
            const href = '#collapse' + index;
            const ariaControls = 'collapse' + index;
            const linkHref = (event) => {
              event.preventDefault();
              return document.location.href = story.storyData.data.url;
            };
            // const getComments = (event) => {

            // };
            return (
              <div className="card head" >
                <div className="card-header head1" role="tab" id={heading} >
                    <a id="link1" className="collapsed" data-toggle="collapse" href={href} aria-expanded="false" aria-controls={ariaControls}>
                        <span id="mainTextCSS" onClick={(e) => linkHref(e)}>
                           {story.storyData.data.title}
                        </span>
                    </a>
                </div>
                <div id={ariaControls} className="collapse down" role="tabpanel" aria-labelledby={heading}>
                    <div id="collapseTextCSS" className="card-body">
                      {comments}
                    </div>
                 </div>
                  
             </div>
            );
          }
        });
        this.setState({ theStories: stories });
      });
    }).catch((err) => {
      console.log(err);
    });
  }
  render() {
    const { theStories } = this.state;
    return (
      <div className="flex-container-1">
        <div className="tablist1" role="tablist">
          {theStories}
        </div>
      </div>
    );
  }
}

