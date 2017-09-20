import * as ReadableAPI from '../readableAPI/readableAPI'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_ALL_COMMENTS = 'GET_ALL_COMMENTS'
export const PLUS_POST = 'PLUS_POST'
export const MINUS_POST = 'MINUS_POST'
export const SORT_BY_VOTE_SCORE = 'SORT_BY_VOTE_SCORE'
export const SORT_BY_TIMESTAMP = 'SORT_BY_TIMESTAMP'

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

export const sortByVoteScore = (post) => ({
	type: SORT_BY_VOTE_SCORE,
	post
})

export const sortByTimestamp = (post) => ({
	type: SORT_BY_TIMESTAMP,
	post
})

export const fetchPlusPost = (post) => dispatch => (
	ReadableAPI.votePost(post, "upVote")
	.then(() => dispatch(receiveUpvote(post)))
)

export const receiveUpvote = (post) => ({
	type: PLUS_POST,
	post
})

export const fetchMinusPost = (post) => dispatch => (
	ReadableAPI.votePost(post, "downVote")
	.then(() => dispatch(receiveDownvote(post)))
)

export const receiveDownvote = (post) => ({
	type: MINUS_POST,
	post
})