import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react";
import LayoutClient from "../layouts/client";
import Homepage from "../pages/client/HomePage";
import ProductPage from "../pages/client/ProductsPage";
import ProductDetailPage from "../pages/client/ProductDetailPage";
import NotFoundPage from "../pages/client/404";
import SignupPage from "../pages/client/SignupPage";
import SigninPage from "../pages/client/SigninPage";
import ContactPage from "../pages/client/ContactPage";
import { CartPage } from "../pages/client/Cart";
import ProductSale from "../pages/client/ProductsSalePage";
import OrderPage from "../pages/client/Bill";

import LayoutAdmin from "../layouts/admin";
import ManagementProduct from "../pages/admin/products/ManageProduct";
import ManagementProductUpdate from "../pages/admin/products/components/ManageProductUpdate";
import ManageCategory from "../pages/admin/categories/ManageCategory";
import ManageCategoryUpdate from "../pages/admin/categories/components/ManageCategoryUpdate";
import ManageComment from "../pages/admin/comments/ManageComment";
import ManageContact from "../pages/admin/contacts/ManageContact";
import ManageUser from "../pages/admin/user/ManageUser";
import Management from "../pages/admin/dashboard/Management";
import ManageHashtag from "../pages/admin/hashtags/ManageHashtag";
import ManageHashtagUpdate from "../pages/admin/hashtags/components/ManageHashtagUpdate";
import ManageBill from "../pages/admin/bills/ManageBill";
import ManageBillUpdate from "../pages/admin/bills/components/ManageBillUpdate";
import ManageAbout from "../pages/admin/abouts/ManageAbout";
import ManageAboutUpdate from "../pages/admin/abouts/components/ManageAboutUpdate";

import { ICategory } from "../types/category";
import { IProduct } from "../types/product";
import IhashTag from "../types/hashtag";
import { GetAllHashtag } from "../api/hashtags";
import { GetAllProduct } from "../api/product";
import { GetAllCategory } from "../api/categories";
const Router = () => {
    // State product
    const [products, setproducts] = useState<IProduct[]>([])
    useEffect(() => {
        GetAllProduct().then(({ data }) => setproducts(data.data))
    }, [])

    // State categories
    const [categories, setcategories] = useState<ICategory[]>([])
    useEffect(() => {
        GetAllCategory()
            .then(({ data }) => setcategories(data.data))
    }, [])

    // State hashtags
    const [hashtags, sethashtags] = useState<IhashTag[]>([])
    useEffect(() => {
        GetAllHashtag()
            .then(({ data }) => sethashtags(data.data))
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='' element={<LayoutClient />}>
                    <Route index element={<Homepage />} />
                    <Route path='products'>
                        <Route index element={<ProductPage categories={categories} />} />
                        <Route path=':id' element={<ProductDetailPage />} />
                    </Route>
                    <Route path='products/sales'>
                        <Route index element={<ProductSale />} />
                    </Route>
                    <Route path='cart'>
                        <Route index element={<CartPage />} />
                    </Route>
                    <Route path='order/bill'>
                        <Route index element={<OrderPage />} />
                    </Route>
                    <Route path='contacts' element={<ContactPage />} />
                </Route>
                <Route path='admin' element={<LayoutAdmin />}>
                    <Route index element={<Management />} />
                    <Route path='products'>
                        <Route index element={<ManagementProduct products={products} categories={categories} hashtags={hashtags} />} />
                        <Route path=':id/update' element={<ManagementProductUpdate products={products} hashtags={hashtags} categories={categories} />} />
                    </Route>
                    <Route path='categories'>
                        <Route index element={<ManageCategory categories={categories} />} />
                        <Route path=':id/update' element={<ManageCategoryUpdate categories={categories} />} />
                    </Route>
                    <Route path='hashtags'>
                        <Route index element={<ManageHashtag />} />
                        <Route path=':id/update' element={<ManageHashtagUpdate hashtags={hashtags} />} />
                    </Route>
                    <Route path='abouts'>
                        <Route index element={<ManageAbout />} />
                        <Route path=':id/update' element={<ManageAboutUpdate />} />
                    </Route>
                    <Route path='bill'>
                        <Route index element={<ManageBill />} />
                        <Route path=':id/update' element={<ManageBillUpdate />} />
                    </Route>
                    <Route path='comments'>
                        <Route index element={<ManageComment />} />
                    </Route>
                    <Route path='contacts'>
                        <Route index element={<ManageContact />} />
                    </Route>
                    <Route path='accounts'>
                        <Route index element={<ManageUser />} />
                    </Route>
                </Route>
                <Route path='signin' element={<SigninPage />}></Route>
                <Route path='signup' element={<SignupPage />}></Route>
                <Route path='*' element={<NotFoundPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default Router