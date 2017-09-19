import * as ReadableAPI from '../readableAPI/readableAPI'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_ALL_COMMENTS = 'GET_ALL_COMMENTS'

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
	.then(payload => post.comments = payload)
	// .then(payload => console.log(payload)/*dispatch(receiveComments(payload))*/)
	.then(dispatch(receiveComments(post)))
)

export const receiveComments = payload => ({
	type: GET_ALL_COMMENTS,
	payload
})