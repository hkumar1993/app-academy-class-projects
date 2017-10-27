import BenchesReducer from './benches_reducer'
import { combineReducers } from 'redux'

export default combineReducers({
  benches: BenchesReducer
})
