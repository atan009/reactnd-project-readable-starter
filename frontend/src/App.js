import React, { Component } from 'react';
import './CSS/App.css';
import './CSS/bootstrap.min.css'
import { Route, Switch, withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { 
  fetchAllPosts, 
  fetchAllComments, 
  fetchPlusPost,
  fetchMinusPost,
  sortByVoteScore,
  sortByTimestamp } from './Actions'

const customStyles = {
  content : {
    width                 : '75%',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class App extends Component {

  constructor() {
    super()
    this.state = {
      modalIsOpen: false,
      curPost: [],
      newPostTitle: "",
      newPostBody: ""
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal(post) {
    this.setState({
      modalIsOpen: true,
      curPost: post,
      newPostBody: post.body})
  }

  afterOpenModal() {
    //don't think this is necessary
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  // editingPostTitle(value) {
  //   this.setState({newPostTitle: value})
  // }

  editingPostBody(value) {
    this.setState({newPostBody: value})
  }

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

  changeSort(value) {
    var self = this
    if (value === "voteScore") {
      self.props.sortVoteScore()
    } else if (value === "timestamp") {
      self.props.sortTimestamp()
    }
  }

  submitChange(post, newPostBody) {
    console.log(post)
    // console.log(newPostTitle)
    console.log(newPostBody)
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
            <select onChange={event => this.changeSort(event.target.value)} className="Sort col-md-12">
              <option value="voteScore">voteScore</option>
              <option value="timestamp">timestamp</option>
            </select>
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
                  <button className="editPost" onClick={self.openModal.bind(this,post)}>Edit</button>
                    <Modal
                      isOpen={this.state.modalIsOpen}
                      onAfterOpen={this.afterOpenModal}
                      onRequestClose={this.closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >

                      <h2 ref={subtitle => this.subtitle = subtitle}>Edit</h2>
                      <button onClick={this.closeModal}>close</button>
                      <div>Click submit to confirm changes</div>
                      <form>
                        <h6>Id: {this.state.curPost.id}</h6>
                        <h6>Timestamp: {this.state.curPost.timestamp}</h6>
                        <h6>Author: {this.state.curPost.author}</h6>
                        <h6>Score: {this.state.curPost.voteScore}</h6>
                        <h6>Title: {this.state.curPost.title}</h6>
                        {/*<h6>Title: <input className="editPostTitle" type="text" name="editPostTitle" value={this.state.newPostTitle} onChange={event => this.editingPostTitle(event.target.value)}/></h6>*/}
                        <h6>Body: <input className="editPostBody" type="text" name="editPostBody" value={this.state.newPostBody} onChange={event => this.editingPostBody(event.target.value)}/></h6>
                      </form>
                      <button onClick={this.submitChange.bind(this, post, this.state.newPostBody)}>submit</button>
                    </Modal>

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
    downvotePost: (post) => dispatch(fetchMinusPost(post)),
    sortVoteScore: () => dispatch(sortByVoteScore()),
    sortTimestamp: () => dispatch(sortByTimestamp())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App));