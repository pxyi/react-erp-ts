import { combineReducers } from 'redux-immutable';
import userReducer from './user';

export interface StoreState {
  
}

export default combineReducers({
  user: userReducer
});