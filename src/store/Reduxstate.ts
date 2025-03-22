import { combineReducers } from 'redux'
import ticketsReducer from './Slice'

const rootReducer = combineReducers({
  tickets: ticketsReducer,
})

export type Reduxstate = ReturnType<typeof rootReducer>
export { rootReducer }