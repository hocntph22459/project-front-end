import { Dispatch } from 'redux';
import { ADD_TO_BILL, REMOVE_FROM_BILL } from '../../contants/bill/bill.type';
import IBill from '../../../types/bill';

export const addtoBill = (billData: IBill) => async (dispatch: Dispatch, getState: any) => {
  console.log(billData)
    dispatch({
    type: ADD_TO_BILL,
    payload: {
      name: billData.name,
      email: billData.email,
      address: billData.address,
      phone: billData.phone,
      total: billData.total,
      items: billData.items
    },
  });
//   localStorage.setItem('billItems', JSON.stringify(getState().cart.cartItems));
};


export const removeFromCart = (productId: string) => (dispatch: Dispatch, getState: any) => {
  dispatch({ type: REMOVE_FROM_BILL, payload: productId });
//   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
