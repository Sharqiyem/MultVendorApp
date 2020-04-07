import types from './types';
import initialState from './state';
const reducer = (state = initialState, action) => {
  console.log({ oldState: state, type: action.type, payload: action.payload });
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        currentUser: { ...action.payload }
      };
    case types.SET_LOGGED:
      return {
        ...state,
        isLogged: action.payload
      };

    default:
      throw new Error('Unexpected action');
  }
};
export default reducer;
