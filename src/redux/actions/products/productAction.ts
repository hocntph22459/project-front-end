import { FETCH_PRODUCTS_FAILED, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } from "../../contants/products/products.type";
import { GetAllProduct } from "../../../api/product";
import { IProduct } from "../../../types/product";


export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products: IProduct[]) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
});

export const fetchProductsFailure = (error: any) => ({
    type: FETCH_PRODUCTS_FAILED,
    payload: error,
});

export const fetchProducts = () => async (dispatch: any) => {
    try {
        const { data } = await GetAllProduct();
        dispatch(fetchProductsSuccess(data));
        console.log(data)
    } catch (error: any) {
        console.log(error)
    }
};