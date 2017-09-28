import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import {
	fetchGetFullPost,
  	fetchAllComments, 
  	fetchPlusPost,
  	fetchMinusPost,
  	fetchEditPost,
  	fetchDelPost,
  	fetchPlusComment,
  	fetchMinusComment,
  	fetchEditComment,
  	fetchDelComment,
  	fetchSetComments,
  	filterAllPosts
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

	submitEditComment(comment, newCommentBody) {
		this.props.editComment(this.state.curPost, newCommentBody)
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

  	//get post by id and store relevant comments
	componentDidMount() {
		var self = this
		this.props.getPost(this.props.match.params.post_id)
		.then(action => self.props.getComments(action.post))
		.then(action => self.props.setComments(action.post))
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
                  <Link to="/" onClick={self.props.filterPosts.bind(this,"all")}>All Categories</Link>
                </li>
              {categories.map((catType) => (
                <li key={catType} className="Category col-md-3 text-center">
                  <Link to={`/${catType}`} onClick={self.props.filterPosts.bind(this,catType)}>{catType}</Link>
                </li>
                ))}
            </ul>
          </div>

          <div className="row">
            <ul className="posts col-md-12">
              {Posts.Posts && Posts.Posts.map((post) => (
	                <li key={post.id} className="Post">
	                  <h6 className="post-id">{post.id} </h6>
	                  <h6 className="post-timestamp">{this.getTime(post.timestamp)} </h6>
	                  <h6 className="post-author">{post.author}</h6>
	                  <h6 className="post-voteScore">{post.voteScore}pts</h6>
	                  <Link to={`/${post.category}/${post.id}`}>
	                    <h5>{post.title}</h5>
	                  </Link>
	                  <h5>{post.body}</h5>
	                  <h6>comments({Posts.Comments ? Posts.Comments.length : 0})</h6>
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

          <div className="row">
          	<div className="placeHolder col-md-1">
          	</div>
          	<ul className="comments col-md-11">
          		{Posts.Comments && Posts.Comments.map((comment) => (
          			<li key={comment.id} className="Comment">
          				<h6 className="comment-id">{comment.id} </h6>
	                  	<h6 className="comment-timestamp">{this.getTime(comment.timestamp)} </h6>
	                  	<h6 className="comment-author">{comment.author}</h6>
	                  	<h6 className="comment-voteScore">{comment.voteScore}pts</h6>
	                    <h5 className="comment-body">{comment.body}</h5>
	                    <button onClick={self.props.upvoteComment.bind(this,comment)}>+</button>
	                  	<button onClick={self.props.downvoteComment.bind(this,comment)}>-</button>
	                  	<button className="editPost" onClick={self.openModal.bind(this,comment)}>Edit</button>
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
	                        <h6>Body: <input className="editPostBody" type="text" name="editPostBody" value={this.state.newPostBody} onChange={event => this.editingPostBody(event.target.value)}/></h6>
	                      </form>
	                      <button onClick={this.submitEditComment.bind(this, this.state.curPost, this.state.newPostBody)}>submit</button>
	                    </Modal>
	                    <button onClick={self.props.deleteComment.bind(this,comment)}>Delete</button>
          			</li>
          			))}
          	</ul>
          </div>
          <div>
            <Link to={`/${this.props.match.params.category}/${this.props.match.params.post_id}/addComment`}><button className="addComment"> Add Comment</button></Link>
          </div>
        </div>
      </div>
		);
	}
}

function mapStateToProps ({Posts}) {
  return {
    Posts
  }
}

function mapDispatchToProps (dispatch) {
	return {
		getPost: (post_id) => dispatch(fetchGetFullPost(post_id)),
		getComments: (post) => dispatch(fetchAllComments(post)),
		filterPosts: (filter) => dispatch(filterAllPosts(filter)),
	    upvotePost: (post) => dispatch(fetchPlusPost(post)),
	    downvotePost: (post) => dispatch(fetchMinusPost(post)),
	    editPost: (post, newPostTitle, newPostBody) => dispatch(fetchEditPost(post, newPostTitle, newPostBody)),
	    deletePost: (post) => dispatch(fetchDelPost(post)),
	    upvoteComment: (comment) => dispatch(fetchPlusComment(comment)),
	    downvoteComment: (comment) => dispatch(fetchMinusComment(comment)),
	    editComment: (comment, newCommentBody) => dispatch(fetchEditComment(comment, newCommentBody)),
	    deleteComment: (comment) => dispatch(fetchDelComment(comment)),
	    setComments: (post) => dispatch(fetchSetComments(post))
	}
}

export default connect (mapStateToProps, mapDispatchToProps) (fullPost)