

import * as actionTypes from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART: {
      const item = action.payload;
      const existItemIndex = state.cartItems.findIndex((x) => x.id === item.id);

      if (existItemIndex !== -1) {
      
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existItemIndex].quantity += item.quantity;

        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    }
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((product) => product.id !== action.payload),
      };
    case actionTypes.UPDATE_CART_ITEM_QUANTITY: {
      const { id, quantity } = action.payload;
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }
    default:
      return state;
  }
};
