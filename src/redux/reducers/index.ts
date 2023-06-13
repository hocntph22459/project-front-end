import { combineReducers } from 'redux';
import { cartReducer } from './cart/cartReducer';
import { billReducer } from './bill/billReducer';
import productsReducer from './products/productReducer';
import categoriesReducer from './categories/categoriesReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  bill: billReducer,
  products:productsReducer,
  categories:categoriesReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer