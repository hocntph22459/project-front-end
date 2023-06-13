import { IProduct } from '../../../../types/product'
import { Link } from 'react-router-dom'

type Props = {
    products: IProduct[]
}

const FindProduct = (props: Props) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {props.products.map((product: IProduct) => (
                <div key={product._id}>
                    <Link key={product._id} to={`/products/${product._id}`}>
                        <div className="bg-white p-4 shadow-md rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                            <h3 className="text-lg font-medium">{product.name}</h3>
                            <img className='w-full' src={product.images[0]} alt="" />
                            <p className="mt-1 text-[red] font-bold">${product.price}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default FindProduct