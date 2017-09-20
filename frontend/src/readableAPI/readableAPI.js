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