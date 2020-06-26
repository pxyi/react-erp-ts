import { fromJS } from 'immutable';
import { SET_USER } from '.';

const defaultState = fromJS({
  name: '',
  code: '',
  roles: [],
  store: {},
  status: null
})
interface Action {
  type: string;
  payload: any
}
export default (state = defaultState, action: Action) => {
  switch (action.type) {
    case SET_USER: {
      window.localStorage.setItem('user', JSON.stringify(action.payload));
      return fromJS(action.payload);
    }
    case 'INIT_USER': {
      return state.set('hotlist', action.payload);
    }
    default:
      break;
  }
  return state;
}