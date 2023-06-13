import { IBillAction, IBillState } from '../../../types/bill';
import { ADD_TO_BILL, REMOVE_FROM_BILL } from '../../contants/bill/bill.type';

const initialState: IBillState = {
    BillItems: localStorage.getItem('billItems')
    ? JSON.parse(localStorage.getItem('billItems') as string)
    : [],
};

export const billReducer = (
    state: IBillState = initialState,
    action: IBillAction
) => {
    switch (action.type) {
        case ADD_TO_BILL:
            const item = action.payload;
            const existItem = state.BillItems.find((x) => x._id === item._id);
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.BillItems.map((x) =>
                        x._id === existItem._id ? item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.BillItems, item],
                };
            }
        case REMOVE_FROM_BILL:
            return {
                ...state,
                cartItems: state.BillItems.filter((x) => x._id !== action.payload),
            };
        default:
            return state;
    }
};
