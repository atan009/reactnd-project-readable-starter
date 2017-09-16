import { combineReducers } from 'redux'
import {
	GET_ALL_POSTS
} from '../Actions'

function Posts (state = {}, action) {

	switch (action.type) {
		case GET_ALL_POSTS:
			return [...action.payload]

		default:
			return state
	}
}

function Comments(state = {}, action) {
	switch (action.type) {

		default:
			return state
	}
}

export default combineReducers ({
	Posts,
	Comments
})