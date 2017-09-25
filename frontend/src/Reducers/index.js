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
	GET_FULL_POST
} from '../Actions'

function Posts (state = {}, action) {

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
			return [...posts]

		case SORT_BY_VOTE_SCORE:
			for (i = 0; i + 1 < state.length; i++) {
				for (k = i+1; k < state.length; k++) {
					if (state[i].voteScore < state[k].voteScore) {
						tempPost = state[i]
						state[i] = state[k]
						state[k] = tempPost
					}
				}
			}
			return [...state]

		case SORT_BY_TIMESTAMP:
			for (i = 0; i + 1 < state.length; i++) {
				for (k = i+1; k < state.length; k++) {
					if (state[i].timestamp < state[k].timestamp) {
						tempPost = state[i]
						state[i] = state[k]
						state[k] = tempPost
					}
				}
			}
			return [...state]

		case PLUS_POST:
			for (i = 0; i < state.length; i++) {
				if (state[i].id === action.post.id) {
					state[i].voteScore++
				}
			}
			return [...state]

		case MINUS_POST:
			for (i = 0; i < state.length; i++) {
				if (state[i].id === action.post.id) {
					state[i].voteScore--
				}
			}
			return [...state]

		case EDIT_POST:
			for (i = 0; i < state.length; i++) {
				if (state[i].id === action.post.id) {
					state[i].title = action.newPostTitle
					state[i].body = action.newPostBody
				}
			}
			return[...state]

		case ADD_POST:
			return [...state,action.post]

		case DEL_POST:
			for (i = 0; i < state.length; i++) {
				if (state[i].id === action.post.id) {
					state.splice(i,1)
				}
			}
			return [...state]

		case GET_FULL_POST:
			posts = []
			posts[0] = action.post
			return [...posts]

		default:
			return state
	}
}

function Comments(state = {}, action) {
	switch (action.type) {
		case GET_ALL_COMMENTS:
		
			action.post.comments = action.payload
			return {...state}

		default:
			return state
	}
}

export default combineReducers ({
	Posts,
	Comments
})