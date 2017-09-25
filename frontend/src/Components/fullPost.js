import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import {
	fetchGetFullPost,
  	fetchAllComments, 
  	fetchPlusPost,
  	fetchMinusPost,
  	fetchEditPost,
  	fetchDelPost
} from '../Actions'

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

class fullPost extends Component {
	constructor() {
	    super()
		this.state = {
		  	modalIsOpen: false,
		   	curPost: [],
		   	newPostTitle: "",
		   	newPostBody: ""
		}

	    this.openModal = this.openModal.bind(this)
	    this.closeModal = this.closeModal.bind(this)
	}

	openModal(post) {
	    this.setState({
	    	modalIsOpen: true,
	      	curPost: post,
	      	newPostTitle: post.title,
	      	newPostBody: post.body
	    })
	}

	closeModal() {
	    this.setState({modalIsOpen: false})
	}

	editingPostTitle(value) {
	    this.setState({newPostTitle: value})
	}

	editingPostBody(value) {
	    this.setState({newPostBody: value})
	}

	submitEditPost(post, newPostTitle, newPostBody) {
	    this.props.editPost(this.state.curPost, this.state.newPostTitle, this.state.newPostBody)
	    this.closeModal()
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

	componentDidMount() {
		var self = this
		this.props.getPost(this.props.match.params.post_id)
		.then(action => self.props.getComments(action.post))
		console.log(this.state)
	}

	render () {
		var self = this
	    const categories = ['react', 'redux', 'udacity']
	    const { Posts } = this.props
	    console.log(Posts)

    return (
      <div className="container">
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
                        <h6>Title: <input className="editPostTitle" type="text" name="editPostTitle" value={this.state.newPostTitle} onChange={event => this.editingPostTitle(event.target.value)}/></h6>
                        <h6>Body: <input className="editPostBody" type="text" name="editPostBody" value={this.state.newPostBody} onChange={event => this.editingPostBody(event.target.value)}/></h6>
                      </form>
                      <button onClick={this.submitEditPost.bind(this, this.state.curPost, this.state.newPostTitle, this.state.newPostBody)}>submit</button>
                    </Modal>
                  <button onClick={self.props.deletePost.bind(this,post)}>Delete</button>
                </li>
                ))
              }
            </ul>
          </div>
          <div>
            <Link to="/addPost"><button className="addPost"> Add Post</button></Link>
          </div>
        </div>
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
		getPost: (post_id) => dispatch(fetchGetFullPost(post_id)),
		getComments: (post) => dispatch(fetchAllComments(post)),
	    upvotePost: (post) => dispatch(fetchPlusPost(post)),
	    downvotePost: (post) => dispatch(fetchMinusPost(post)),
	    editPost: (post, newPostTitle, newPostBody) => dispatch(fetchEditPost(post, newPostTitle, newPostBody)),
	    deletePost: (post) => dispatch(fetchDelPost(post))
	}
}

export default connect (mapStateToProps, mapDispatchToProps) (fullPost)