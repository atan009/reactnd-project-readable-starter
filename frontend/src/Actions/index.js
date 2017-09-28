import * as ReadableAPI from '../readableAPI/readableAPI'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_ALL_COMMENTS = 'GET_ALL_COMMENTS'
export const PLUS_POST = 'PLUS_POST'
export const MINUS_POST = 'MINUS_POST'
export const FILTER_POSTS = 'FILTER_POSTS'
export const SORT_BY_VOTE_SCORE = 'SORT_BY_VOTE_SCORE'
export const SORT_BY_TIMESTAMP = 'SORT_BY_TIMESTAMP'
export const EDIT_POST = 'EDIT_POST'
export const ADD_POST = 'ADD_POST'
export const DEL_POST = 'DEL_POST'
export const GET_FULL_POST = 'GET_FULL_POST'
export const PLUS_COMMENT = 'PLUS_COMMENT'
export const MINUS_COMMENT = 'MINUS_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DEL_COMMENT = 'DEL_COMMENT'
export const SET_COMMENTS = 'SET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'

export const filterAllPosts = (filter) => ({
	type: FILTER_POSTS,
	filter
})

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

export const fetchEditPost = (post, newPostTitle, newPostBody) => dispatch => (
	ReadableAPI.editPost(post, newPostTitle, newPostBody)
	.then(() => dispatch(receiveEditPost(post, newPostTitle, newPostBody)))
)

export const receiveEditPost = (post, newPostTitle, newPostBody) => ({
	type: EDIT_POST,
	post,
	newPostTitle,
	newPostBody
})

export const fetchAddPost = (post) => dispatch => (
	ReadableAPI.addPost(post)
	.then(() => dispatch(receiveAddPost(post)))
)

export const receiveAddPost = (post) => ({
	type: ADD_POST,
	post
})

export const fetchDelPost = (post) => dispatch => (
	ReadableAPI.delPost(post)
	.then(() => dispatch(receiveDelPost(post)))
)

export const receiveDelPost = (post) => ({
	type: DEL_POST,
	post
})

export const fetchSetComments = (post) => ({
	type: SET_COMMENTS,
	post
})

export const fetchGetFullPost = (post_id) => dispatch => (
	ReadableAPI.getFullPost(post_id)
	.then((post) => dispatch(receiveGetFullPost(post)))
)

export const receiveGetFullPost = (post) => ({
	type: GET_FULL_POST,
	post
})

export const fetchPlusComment = (comment) => dispatch => (
	ReadableAPI.voteComment(comment, "upVote")
	.then(() => dispatch(receiveUpvoteComment(comment)))
)

export const receiveUpvoteComment = (comment) => ({
	type: PLUS_COMMENT,
	comment
})

export const fetchMinusComment = (comment) => dispatch => (
	ReadableAPI.voteComment(comment, "downVote")
	.then(() => dispatch(receiveMinusComment(comment)))
)

export const receiveMinusComment = (comment) => ({
	type: MINUS_COMMENT,
	comment
})

export const fetchEditComment = (comment, newCommentBody) => dispatch => (
	ReadableAPI.editComment(comment, newCommentBody)
	.then(() => dispatch(receiveEditComment(comment, newCommentBody)))
)

export const receiveEditComment = (comment, newCommentBody) => ({
	type: EDIT_COMMENT,
	comment,
	newCommentBody
})

export const fetchDelComment = (comment) => dispatch => (
	ReadableAPI.delComment(comment)
	.then((comment) => dispatch(receiveDelComment(comment)))
)

export const receiveDelComment = (comment) => ({
	type: DEL_COMMENT,
	comment
})

export const fetchAddComment = (comment) => dispatch => (
	ReadableAPI.addComment(comment)
	.then(() => dispatch(receiveAddComment(comment)))
)

export const receiveAddComment = (comment) => ({
	type: ADD_COMMENT,
	comment
})