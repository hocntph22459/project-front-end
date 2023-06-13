import { FETCH_PRODUCTS_SUCCESS } from "../../contants/products/products.type";

  const initialState = {
    products: [],
    loading: false,
    error: null,
  };
  
  const productsReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          loading: false,
          products: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default productsReducer;