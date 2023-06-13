import { ADD_TO_CART, REMOVE_FROM_CART } from '../../contants/cart/cart.type';
import { Dispatch } from 'redux';
import { GetOneProduct } from '../../../api/product';

export const addToCart = (cartData: any) => async (dispatch: Dispatch, getState: any) => {
  const { data } = await GetOneProduct(cartData.productId);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      _id: data.data._id,
      name: data.data.name,
      image: data.data.images[0],
      price: data.data.price,
      quantity: cartData.quantity,
      size: cartData.size,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId: string) => (dispatch: Dispatch, getState: any) => {
  dispatch({ type: REMOVE_FROM_CART, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

