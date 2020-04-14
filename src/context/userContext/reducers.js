import types from './types';
import initialState from './state';

const reducer = (state = initialState, action) => {
  // console.log({ oldState: state, type: action.type, payload: action.payload });
  switch (action.type) {
    case types.ADD_ADDRESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
      };

    case types.SAVE_ADDRESSES:
      return {
        ...state,
        addresses: action.payload,
      };

    default:
      return state;
  }
};
export default reducer;
