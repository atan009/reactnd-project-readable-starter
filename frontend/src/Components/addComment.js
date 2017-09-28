import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
	fetchAddComment
} from '../Actions'

class addComment extends Component {

	state = {
			id:"",
			timestamp: "",
			body: "",
			author: "",
			parentId: ""
	}

	componentDidMount() {
		const uuidv1 = require('uuid/v1')
		this.setState({id: uuidv1()})
		this.setState({timestamp: Date.now()})
		this.setState({parentId: this.props.match.params.post_id})
	}

	addPostCall = () => {
		console.log(this.state.id)
		console.log(this.state.timestamp)
		console.log(this.state.body)
		console.log(this.state.author)
		console.log(this.state.parentId)
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
					<h6>ParentId: {this.props.match.params.post_id}</h6>
	                <h6>Id: {this.state.id}</h6>
	                <h6>Timestamp: {this.state.timestamp}</h6>
	                <h6>Body: <input className="CommentBody" type="text" name="CommentBody" defaultValue="" onChange={event => this.setState({body: event.target.value})}/></h6>
	                <h6>Author: <input className="CommentAuthor" type="text" name="CommentAuthor" defaultValue="" onChange={event => this.setState({author: event.target.value})}/></h6>
	            </form>
	            <Link to={`/${this.props.match.params.category}/${this.props.match.params.post_id}`}>
	            	<button onClick={this.props.addNewComment.bind(this,this.state)}>submit</button>
	            </Link>
            </div>
    	)
	}

}

function mapDispatchToProps (dispatch) {
	return {
		addNewComment: (comment) => dispatch(fetchAddComment(comment))
	}
}

export default connect(null, mapDispatchToProps)(addComment)