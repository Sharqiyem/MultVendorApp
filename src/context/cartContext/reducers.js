import types from './types';
import initialState from './state';
const reducer = (state = initialState, action) => {
  // console.log({ oldState: state, type: action.type, payload: action.payload });
  switch (action.type) {
    case types.CART_ADD:
      const newItem = action.payload;
      const itemExist = state.cartItems.find(
        (item) => item.item.id === newItem.id
      );
      if (itemExist) {
        itemExist.quantity += 1;

        return {
          ...state,
          cartItems: [...state.cartItems],
        };
      } else
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            { item: action.payload, quantity: 1 },
          ],
        };
    case types.CART_REMOVE:
      const itemToRemove = action.payload;
      const itemExist1 = state.cartItems.find(
        (item) => item.item.id === itemToRemove.id
      );
      if (itemExist1) {
        itemExist1.quantity -= 1;
        const cartItems = state.cartItems.filter(
          (item) => item.item.id !== itemExist1.item.id
        );
        if (itemExist1.quantity === 0) {
          return {
            ...state,
            cartItems: [...cartItems],
          };
        }
        return {
          ...state,
          cartItems: [...cartItems, itemExist1],
        };
      }

    case types.CART_REMOVE_ITEM:
      const itemExist2 = state.cartItems.find(
        (item) => item.item.id === action.payload.id
      );
      if (itemExist2) {
        const cartItems2 = state.cartItems.filter(
          (item) => item.item.id !== itemExist2.item.id
        );

        return {
          ...state,
          cartItems: [...cartItems2],
        };
      }
      return state;

    default:
      throw new Error('Unexpected action');
  }
};
export default reducer;
