import { IProduct } from '../../../../types/product'
import { Link } from 'react-router-dom'

type Props = {
  products: IProduct[],
}

const ListProducts = (props: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {props.products.map(item => {
        return (
          <div key={item._id} className="bg-white p-4 shadow-md rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <div className=''>
              <Link to={`/products/${item._id}`}>
                <img className='w-full' src={item.images[0]} alt="" ></img>
              </Link>
            </div>
            <div className="item-text">
              <h5 className='text-[18px] font-bold truncate'>{item.name}</h5>
              <p className='my-8 text-[#F54748] text-[20px] font-bold'>${item.price}</p>
            </div>
            <div className="item-add">
              <button className='bg-black text-white w-full h-[42px] rounded-xl'>Add To Cart</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ListProducts