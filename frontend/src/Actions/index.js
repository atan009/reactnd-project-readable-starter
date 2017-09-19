import * as ReadableAPI from '../readableAPI/readableAPI'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_ALL_COMMENTS = 'GET_ALL_COMMENTS'
export const PLUS_POST = 'PLUS_POST'

export const fetchAllPosts = () => dispatch => (
	ReadableAPI.getAllPosts()
	.then(payload => dispatch(receivePosts(payload)))
)

export const receivePosts = payload => ({
	type: GET_ALL_POSTS,
	payload
})

export const fetchAllComments = (post) => dispatch => (
	ReadableAPI.getCommentsByID(post.id)
	// .then(payload => post.comments = payload)
	// .then(payload => console.log(payload)/*dispatch(receiveComments(payload))*/)
	.then(payload => dispatch(receiveComments(post, payload)))
)

export const receiveComments = (post,payload) => ({
	type: GET_ALL_COMMENTS,
	post,
	payload
})

export const fetchPlusPost = (post) => ({
	type: PLUS_POST,
	post
})