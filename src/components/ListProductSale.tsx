import { Link } from 'react-router-dom'
import { IProduct } from '../types/product'
type Props = {
    ProductSale: IProduct[]
}
const ListProductSale = (props: Props) => {
    return (
        <div>
            <div className="container mx-auto">
                <div className="title">
                    <h1 className='my-8 px-2 text-[36px] font-bold'>Products on sale</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {props.ProductSale.map((product) => (
                        <Link key={product._id} to={`/products/${product._id}`}>
                            <div className="bg-white p-4 shadow-md rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                                <h3 className="text-lg font-medium">{product.name}</h3>
                                <img className='w-full' src={product.images[0]} alt="" />
                                <p className="mt-1 text-[red] font-bold">${product.salePrice}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListProductSale