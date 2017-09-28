import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
	fetchAddPost
} from '../Actions'

class addPost extends Component {

	state = {
			id:"",
			timestamp: "",
			title: "",
			body: "",
			author: "",
			category: ""
	}

	componentDidMount() {
		const uuidv1 = require('uuid/v1')
		this.setState({id: uuidv1()})
		this.setState({timestamp: Date.now()})
		this.setState({category: "react"})
	}

	editPostTitle = (value) => {
		this.setState({title: value})
		console.log(this.state.title)
	}

	editPostBody = (value) => {
		this.setState({body: value})
		console.log(this.state.body)
	}

	render () {
		return (
			<div>
				{/*<Link to="/">
					<button>
						Back
					</button>
				</Link>*/}
				<form>
	                <h6>Id: {this.state.id}</h6>
	                <h6>Timestamp: {this.state.timestamp}</h6>
	                <h6>Title: <input className="PostTitle" type="text" name="PostTitle" defaultValue="" onChange={event => this.setState({title: event.target.value})}/></h6>
	                <h6>Body: <input className="PostBody" type="text" name="PostBody" defaultValue="" onChange={event => this.setState({body: event.target.value})}/></h6>
	                <h6>Author: <input className="PostAuthor" type="text" name="PostAuthor" defaultValue="" onChange={event => this.setState({author: event.target.value})}/></h6>
	                <h6>Category: 
		                <select onChange={event => this.setState({category: event.target.value})} className="PostCategory">
			            	<option value="react">react</option>
			            	<option value="redux">redux</option>
			            	<option value="udacity">udacity</option>
			            </select>
	                </h6>
	            </form>
	            <Link to="/">
	            	<button onClick={this.props.addNewPost.bind(this,this.state)}>submit</button>
	            </Link>
            </div>
    	)
	}

}

function mapDispatchToProps (dispatch) {
	return {
		addNewPost: (post) => dispatch(fetchAddPost(post))
	}
}

export default connect(null, mapDispatchToProps)(addPost)