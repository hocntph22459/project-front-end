import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import ModalAddtocart from '../../../../components/ModalAddtocart';
import { IProduct } from '../../../../types/product';

type Props = {
  products: IProduct[],
}

const ListProducts = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = props.products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {currentProducts.map((item) => (
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
              <ModalAddtocart product={item} />
            </div>
          ))}
        </div>
      </div>
      <Pagination className='mt-8'
        current={currentPage}
        pageSize={productsPerPage}
        total={props.products.length}
        onChange={handleChangePage}
      />
    </section>
  );
};

export default ListProducts;