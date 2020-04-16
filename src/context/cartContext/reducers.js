import types from './types';
import initialState from './state';
const reducer = (state = initialState, action) => {
  // console.log({ oldState: state, type: action.type, payload: action.payload });
  switch (action.type) {
    case types.REORDER:
      const reOrderItems = action.payload.products;
      const storeId = action.payload.storeId;

      return {
        ...state,
        cartItems: [...reOrderItems],
        totalAmount: calcTotalAmount(reOrderItems),
        selectedStore: storeId,
      };

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
          totalAmount: calcTotalAmount(state.cartItems),
          selectedStore: newItem.storeId,
        };
      } else {
        const newCartItems = [
          ...state.cartItems,
          { item: action.payload, quantity: 1 },
        ];
        return {
          ...state,
          cartItems: newCartItems,
          totalAmount: calcTotalAmount(newCartItems),
          selectedStore: newItem.storeId,
        };
      }

    case types.CART_REMOVE:
      const itemToRemove = action.payload;
      const itemExist1 = state.cartItems.find(
        (item) => item.item.id === itemToRemove.id
      );
      if (itemExist1) {
        // itemExist1.quantity -= 1;

        if (itemExist1.quantity === 1) {
          const cartItems = state.cartItems.filter(
            (item) => item.item.id !== itemExist1.item.id
          );
          return {
            ...state,
            cartItems: [...cartItems],
            totalAmount: calcTotalAmount(cartItems),
          };
        }
        const cartItemIndex = state.cartItems.findIndex(
          (item) => item.item.id === itemExist1.item.id
        );
        state.cartItems[cartItemIndex].quantity -= 1;
        return {
          ...state,
          cartItems: [...state.cartItems],
          totalAmount: calcTotalAmount(state.cartItems),
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
          totalAmount: calcTotalAmount(cartItems2),
        };
      }
      return { ...state, totalAmount: calcTotalAmount(state.cartItems) };

    default:
      throw new Error('Unexpected action');
  }
};

const calcTotalAmount = (cartItems) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.item.price,
    0
  );
  console.log('calcTotalAmount', cartItems);
  return total;
};
export default reducer;
