import * as ReadableAPI from '../readableAPI/readableAPI'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'

export const fetchAllPosts = () => dispatch => (
	ReadableAPI.getAllPosts()
	.then(payload => dispatch(receivePosts(payload)))
)

export const receivePosts = payload => ({
	type: GET_ALL_POSTS,
	payload
})