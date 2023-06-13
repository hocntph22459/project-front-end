import { useDispatch, useSelector } from 'react-redux'
import { ICategory } from '../../../../types/category'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchCategories } from '../../../../redux/actions/categories/categoriesAction'
import { RootState } from '../../../../redux/reducers'
import { ThunkDispatch } from 'redux-thunk'

const ListProductByCategories = () => {
    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);
    useEffect(() => {
        dispatch(fetchCategories());
    }, []);
    return (
        <div>
            {categories.data && categories.data.map((item: ICategory) => {
                return (
                    <div key={item._id} className="container mx-auto">
                        <div className="title">
                            <h1 className='my-8 px-2 text-[36px] font-bold'>{item.name}</h1>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {item.products.map((product) => (
                                <Link key={product._id} to={`/products/${product._id}`}>
                                    <div className="bg-white p-4 shadow-md rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                                        <h3 className="text-lg font-medium">{product.name}</h3>
                                        <img className='w-full' src={product.images[0]} alt="" />
                                        <p className="mt-1 text-[red] font-bold">${product.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListProductByCategories
