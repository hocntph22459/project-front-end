import { GetAllCategory } from "../../../api/categories";
import { ICategory } from "../../../types/category";
import { FETCH_CATEGORIES_FAILED, FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS } from "../../contants/categories/categories.type";


export const fetchCategoriesRequest = () => ({
    type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = (categories: ICategory[]) => ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories,
});

export const fetchCategoriesFailure = (error: any) => ({
    type: FETCH_CATEGORIES_FAILED,
    payload: error,
});

export const fetchCategories = () => async (dispatch:any) => {
    try {
        const { data } = await GetAllCategory();
        dispatch(fetchCategoriesSuccess(data));
    } catch (error: any) {
        console.log(error)
    }
};