import { combineReducers } from 'redux'
import {
	GET_ALL_POSTS,
	PLUS_POST,
	GET_ALL_COMMENTS
} from '../Actions'

function Posts (state = {}, action) {

	switch (action.type) {
		case GET_ALL_POSTS:
			return [...action.payload]

		case PLUS_POST:
			for (var i = 0; i < state.length; i++) {
				if (state[i].id === action.post.id) {
					state[i].voteScore++
				}
			}
			return [...state]

		default:
			return state
	}
}

function Comments(state = {}, action) {
	switch (action.type) {
		case GET_ALL_COMMENTS:
		console.log(action)
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