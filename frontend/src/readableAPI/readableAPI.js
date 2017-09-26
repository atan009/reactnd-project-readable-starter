const api = "http://localhost:3001"

let token = localStorage.token
if (!token) {
	token = localStorage.token = Math.random().toString(36).substr(-8)
}

const headers = {
	'Accept': 'application/json',
	'Authorization': token,
	'Content-type': 'application/json'
}

//Get all posts
export const getAllPosts = () =>
	fetch(`${api}/posts`, {headers})
		.then(res => res.json())

//get comments by id
export const getCommentsByID = (id) =>
	fetch(`${api}/posts/${id}/comments`, {headers})
		.then(res => res.json())

export const votePost = (post, option) =>
	fetch(`${api}/posts/${post.id}`, {
		method: "POST",
		headers: headers,
		body: JSON.stringify({ option: option})
	})
	.then(res => res.json())

export const editPost = (post, newPostTitle, newPostBody) => 
	fetch(`${api}/posts/${post.id}`, {
		method: "PUT",
		headers: headers,
		body: JSON.stringify({
			title: newPostTitle,
			body: newPostBody
		})
	})
	.then(res => res.json())

export const addPost = (post) =>
	fetch(`${api}/posts`, {
		method: "POST",
		headers: headers,
		body: JSON.stringify({
			id: post.id,
			timestamp: post.timestamp,
			title: post.title,
			body: post.body,
			author: post.author,
			category: post.category
		})
	})
	.then(res => res.json())

export const delPost = (post) =>
	fetch(`${api}/posts/${post.id}`, {
		method: "DELETE",
		headers: headers
	})
	.then(res => res.json())

export const getFullPost = (post_id) =>
	fetch(`${api}/posts/${post_id}`, {
		method: "GET",
		headers: headers
	}) 
	.then(res => res.json())

export const voteComment = (comment, option) =>
	fetch(`${api}/comments/${comment.id}`, {
		method: "POST",
		headers: headers,
		body: JSON.stringify({ option: option})
	})
	.then(res => res.json())

export const editComment = (comment, newCommentBody) =>
	fetch(`${api}/comments/${comment.id}`, {
		method: "PUT",
		headers: headers,
		body: JSON.stringify({
			body: newCommentBody
		})
	})
	.then(res => res.json())

export const delComment = (comment) =>
	fetch(`${api}/comments/${comment.id}`, {
		method: "DELETE",
		headers: headers,
	})
	.then(res => res.json())