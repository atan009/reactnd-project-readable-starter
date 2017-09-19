import React, { Component } from 'react';
import './CSS/App.css';
import './CSS/bootstrap.min.css'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { 
  fetchAllPosts, 
  fetchAllComments, 
  fetchPlusPost,
  fetchMinusPost } from './Actions'

class App extends Component {

  componentWillMount() {
    var self = this
    this.props.getPosts()
    .then(posts => posts.payload.map(post => self.props.getComments(post)))
  }

  getTime(timestamp) {
    var date = new Date(timestamp)
    return date.getUTCFullYear() +
      '-' + ('0' + date.getUTCMonth()).slice(-2) +
      '-' + ('0' + date.getUTCDate()).slice(-2) + 
      ' ' + ('0' + date.getUTCHours()).slice(-2) +
      ':' + ('0' + date.getUTCMinutes()).slice(-2) +
      ':' + ('0' + date.getUTCSeconds()).slice(-2)
  }

  render() {
    var self = this
    const categories = ['react', 'redux', 'udacity']
    const { Posts} = this.props
    console.log(this.props)
    console.log(Posts)

    return (
      
      <div className="container">
      <Route exact path ='/' render={() => (
        <div>
          <div className="row">
            <ul className='categories col-md-12'>
                <li className="Category col-md-3 text-center">
                  <Link to="/">All Categories</Link>
                </li>
              {categories.map((catType) => (
                <li key={catType} className="Category col-md-3 text-center">
                  <Link to={`/${catType}`}>{catType}</Link>
                </li>
                ))}
            </ul>
          </div>

          <div className="row">
            <ul className="posts col-md-12">
              {Posts.length && Posts.map((post) => (
                <li key={post.id} className="Post">
                  <h6 className="post-id">{post.id} </h6>
                  <h6 className="post-timestamp">{this.getTime(post.timestamp)} </h6>
                  <h6 className="post-author">{post.author}</h6>
                  <h6 className="post-voteScore">{post.voteScore}pts</h6>
                  <Link to={`/${post.category}/${post.id}`}>
                    <h5>{post.title}</h5>
                  </Link>
                  <h6>comments({post.comments ? post.comments.length : 0})</h6>
                  <button onClick={self.props.upvotePost.bind(this,post)}>+</button>
                  <button onClick={self.props.downvotePost.bind(this,post)}>-</button>
                  <button>Edit</button>
                  <button>Delete</button>
                </li>
                ))
              }
            </ul>
          </div>
        </div>
        )}/>
      <Switch>
        <Route exact path ='/' Component={App}/>
        <Route exact path='/react' render={() => (
          <div className="row">
            REACT PAGE
          </div>
          )}/>
        <Route exact path ='/redux' render={() => (
          <div className="row">
            REDUX PAGE
          </div>
          )}/>
        <Route exact path ='/udacity' render={() => (
          <div className="row">
            udacity PAGE
          </div>
          )}/>
        </Switch>
      </div>
    );
  }
}

function mapStateToProps ({Posts, Comments}) {
  return {
    Posts,
    Comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPosts: () => dispatch(fetchAllPosts()),
    getComments: (post) => dispatch(fetchAllComments(post)),
    upvotePost: (post) => dispatch(fetchPlusPost(post)),
    downvotePost: (post) => dispatch(fetchMinusPost(post))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App));