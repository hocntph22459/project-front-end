import { combineReducers } from 'redux';
import { cartReducer } from './cart/cartReducer';
import productsReducer from './products/productReducer';
import categoriesReducer from './categories/categoriesReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  products:productsReducer,
  categories:categoriesReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer