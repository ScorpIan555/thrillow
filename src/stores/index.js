import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { userReducer, listingReducer, compsReducer } from '../reducers'

var store
export default {

	configure: (initialState) => { // initialState can be null

		const reducers = combineReducers({ // insert reducers here
			user: userReducer,
			listing: listingReducer,
			comps: compsReducer
		})

		if (initialState){
			store = createStore(
			    reducers,
			    initialState,
			    applyMiddleware(thunk)
			)

			return store
		}

		store = createStore(
		    reducers,
		    applyMiddleware(thunk)
		)

		return store
	},

	currentStore: () => {
		return store
	}
}
