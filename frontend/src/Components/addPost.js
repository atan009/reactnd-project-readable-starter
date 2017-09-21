import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
		this.setState({timestamp: Date.now()})
	}

	editPostTitle = (value) => {
		this.setState({title: value})
		console.log(this.state.title)
	}

	editPostBody = (value) => {
		this.setState({body: value})
		console.log(this.state.body)
	}

	addPostCall = () => {
		console.log(this.state.title)
		console.log(this.state.body)
	}

	render () {
		return (
			<div>
				<p>HELLO</p>
				<Link to="/">
					<button>
						Back
					</button>
				</Link>
				<form>
	                <h6>Id: </h6>
	                <h6>Timestamp: {this.state.timestamp}</h6>
	                <h6>Author: {}</h6>
	                <h6>Score: {}</h6>
	                <h6>Title: <input className="PostTitle" type="text" name="PostTitle" defaultValue="" onChange={event => this.setState({title: event.target.value})}/></h6>
	                <h6>Body: <input className="PostBody" type="text" name="PostBody" defaultValue="" onChange={event => this.setState({body: event.target.value})}/></h6>
	            </form>
	            <button onClick={this.addPostCall}>submit</button>
            </div>
    	)
	}

}

export default addPost