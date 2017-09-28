import { combineReducers } from 'redux'
import {
	GET_ALL_POSTS,
	PLUS_POST,
	MINUS_POST,
	GET_ALL_COMMENTS,
	SORT_BY_VOTE_SCORE,
	SORT_BY_TIMESTAMP,
	EDIT_POST,
	ADD_POST,
	DEL_POST,
	SET_COMMENTS,
	GET_FULL_POST,
	PLUS_COMMENT,
	MINUS_COMMENT,
	EDIT_COMMENT,
	DEL_COMMENT,
	ADD_COMMENT
} from '../Actions'

const initialState = {
	Posts: [],
	sortBy: 'voteScore',
	currentPost: null,
	Comments: []
}

function Posts (state = initialState, action) {

	switch (action.type) {
		case GET_ALL_POSTS:
		//bubble sort posts by voteScore by default
			var posts = action.payload
			for (var i = 0; i + 1 < posts.length; i++) {
				for (var k = i+1; k < posts.length; k++) {
					if (posts[i].voteScore < posts[k].voteScore) {
						var tempPost = posts[i]
						posts[i] = posts[k]
						posts[k] = tempPost
					}
				}
			}
			console.log(state)
			return {
				...state,
				Posts: posts
			}

		case SORT_BY_VOTE_SCORE:
			var sbvcPosts = state.Posts
			for (i = 0; i + 1 < sbvcPosts.length; i++) {
				for (k = i+1; k < sbvcPosts.length; k++) {
					if (sbvcPosts[i].voteScore < sbvcPosts[k].voteScore) {
						tempPost = sbvcPosts[i]
						sbvcPosts[i] = sbvcPosts[k]
						sbvcPosts[k] = tempPost
					}
				}
			}
			return {
				...state,
				Posts: sbvcPosts,
				sortBy: "voteScore"
			}

		case SORT_BY_TIMESTAMP:
			var sbtsPosts = state.Posts
			for (i = 0; i + 1 < sbtsPosts.length; i++) {
				for (k = i+1; k < sbtsPosts.length; k++) {
					if (sbtsPosts[i].timestamp < sbtsPosts[k].timestamp) {
						tempPost = sbtsPosts[i]
						sbtsPosts[i] = sbtsPosts[k]
						sbtsPosts[k] = tempPost
					}
				}
			}
			return {
				...state,
				sortBy: "timestamp"
			}

		case PLUS_POST:
			action.post.voteScore++
			return {
				...state,
				Posts: state.Posts.map(
					post => (post.id === action.post.id ? action.post : post))
			}

		case MINUS_POST:
			action.post.voteScore--
			return {
				...state,
				Posts: state.Posts.map(
					post => (post.id === action.post.id ? action.post : post))
			}

		case EDIT_POST:
			action.post.body = action.newPostBody
			action.post.title = action.newPostTitle
			return {
				...state,
				Posts: state.Posts.map(
					post => (post.id === action.post.id ? action.post : post))
			}

		case ADD_POST:
			var addPost = state.Posts
			addPost.push(action.post)
			return {
				...state,
				Posts: addPost
			}

		case DEL_POST:
			return {
				...state,
				Posts: state.Posts.filter(post => post.id !== action.post.id)
			}

		case GET_FULL_POST:
			var tempArray = []
			tempArray.push(action.post)
			return {
				...state,
				Posts: tempArray,
				currentPost: action.post
			}

		case GET_ALL_COMMENTS:
			action.post.comments = action.payload
			return {
				...state
			}

		case SET_COMMENTS:
			return {
				...state,
				Comments: action.post.comments
			}

		case PLUS_COMMENT:
			action.comment.voteScore++
			return {
				...state,
				[Posts]: {
					...state[Posts]
				}
			}

		case MINUS_COMMENT:
			action.comment.voteScore--
			return {
				...state,
				[Posts]: {
					...state[Posts]
				}
			}

		case EDIT_COMMENT:
			action.comment.body = action.newCommentBody
			return {
				...state,
				[Posts]: {
					...state[Posts]
				}
			}

		case DEL_COMMENT:
			return {
				...state,
					Comments: state.Comments.filter(comment => comment.id !== action.comment.id),
			}

		case ADD_COMMENT:
			return {
				...state
			}

		default:
			return state
	}
}

export default combineReducers ({
	Posts
})