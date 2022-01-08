import { createStore,combineReducers } from 'redux'
import authReducer from './reducer/auth'

const store = createStore(
    combineReducers({
        auth : authReducer
    })
)

export default store