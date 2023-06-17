import { SearchOutlined } from '@ant-design/icons'
import { Input, message } from 'antd';
import { useState } from 'react';
import { FindProductByPrice, SearchProduct } from '../../../api/product';
import ListProductByCategories from './components/ListProductByCategories';
import { IProduct } from '../../../types/product';
import FindProduct from './components/FindProduct';
import FilterProductByPrice from './components/FilterProductByPrice';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const handleSearch = async (value: string) => {
    try {
      setQuery(value);
      const response = await SearchProduct(value)
      message.success(response.data.message)
      setProducts(response.data.data);
    } catch (error: any) {
      message.warning(error.response.data.message);
    }
  };
  const [queryPrice, setQueryPrice] = useState<[number, number] | undefined>();
  const [productsByPrice, setProductsByPrice] = useState<IProduct[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const handleFilter = async () => {
    try {
      setQueryPrice([minPrice, maxPrice]);
      const response = await FindProductByPrice(minPrice, maxPrice);
      message.success(response.data.message)
      setProductsByPrice(response.data.data);
    } catch (error: any) {
      message.warning(error.response.data.message);
    }
  };

  return (
    <section className="py-20 bg-gray-50 font-poppins dark:bg-gray-800 ">
      <div className="banner">
        <img src="https://file.hstatic.net/1000376021/file/1920x720_copy_42b3f822c4ca4cd099bfb116931e6361.png" alt="" />
      </div>
      <div className=" py-4 mx-auto max-w-7xl lg:py-6 ">
        <div className="flex flex-wrap mb-24 -mx-3">
          <div className="w-full pr-4 lg:w-1/4 lg:block">
            <div className="p-4 mb-5 bg-white border border-gray-200 dark:border-gray-900 dark:bg-gray-900">
              <nav id="store" className="w-full z-30 top-0 py-1">
                <div className="w-full container flex justify-between items-center">
                  <Link
                    className="mr-4 uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
                    to=""
                  >
                    Store
                  </Link>
                  <div className="flex items-center" id="store-nav-content">
                    <div className="relative flex items-center">
                      <Input.Search
                        className="w-full max-w-xs p-2 rounded-full bg-[#5765be] focus:bg-white"
                        placeholder="Search products"
                        onSearch={handleSearch}
                        enterButton={<SearchOutlined />}
                      />
                    </div>
                  </div>
                </div>
              </nav>
              <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400" />
              <ul>
                <li className="mb-4">
                  <label
                    htmlFor=""
                    className="flex items-center dark:text-gray-400 "
                  >
                    <input type="checkbox" className="w-4 h-4 mr-2" />
                    <span className="text-lg">Sweater</span>
                  </label>
                </li>
                <li className="mb-4">
                  <label
                    htmlFor=""
                    className="flex items-center dark:text-gray-400 "
                  >
                    <input type="checkbox" className="w-4 h-4 mr-2 " />
                    <span className="text-lg">Socks</span>
                  </label>
                </li>
                <li className="mb-4">
                  <label
                    htmlFor=""
                    className="flex items-center dark:text-gray-400"
                  >
                    <input type="checkbox" className="w-4 h-4 mr-2" />
                    <span className="text-lg">T-Shirt</span>
                  </label>
                </li>
                <li className="mb-4">
                  <label
                    htmlFor=""
                    className="flex items-center dark:text-gray-400"
                  >
                    <input type="checkbox" className="w-4 h-4 mr-2" />
                    <span className="text-lg">Shoes</span>
                  </label>
                </li>
                <li className="mb-4">
                  <label
                    htmlFor=""
                    className="flex items-center dark:text-gray-400"
                  >
                    <input type="checkbox" className="w-4 h-4 mr-2" />
                    <span className="text-lg">Hoodies &amp; Pants</span>
                  </label>
                </li>
              </ul>
              <a
                href="#"
                className="text-base font-medium text-blue-500 hover:underline dark:text-blue-400"
              >
                View More
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <label className="text-gray-700 dark:text-gray-400 font-semibold mb-2">Min Price:</label>
                <input className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-transparent transition-colors" type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(parseInt(e.target.value))} />
              </div>
              <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <label className="text-gray-700 dark:text-gray-400 font-semibold mb-2">Max Price:</label>
                <input
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-transparent transition-colors" type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))} />
              </div>
              <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white" onClick={handleFilter}>Filter</button>
              </div>
            </div>
            <div className="p-4 mb-5 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-900">
              <h2 className="text-2xl font-bold dark:text-gray-400 ">Size</h2>
              <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400" />
              <div className="flex flex-wrap -mx-2 -mb-2">
                <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">
                  XL
                </button>
                <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                  S
                </button>
                <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                  M
                </button>
                <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                  XS
                </button>
              </div>
            </div>
          </div>
          <div className="w-full px-3 lg:w-3/4">
            {queryPrice ? (
              <FilterProductByPrice productsByPrice={productsByPrice} />
            ) : (
              <ListProductByCategories />
            )}
            {query ? (
              <FindProduct products={products} />
            ) : (
              <ListProductByCategories />
            )}
            <div className="flex justify-end mt-6">
              <nav aria-label="page-navigation">
                <ul className="flex list-style-none">
                  <li className="page-item disabled ">
                    <a
                      href="#"
                      className="relative block pointer-events-none px-3 py-1.5 mr-3 text-base text-gray-700 transition-all duration-300  rounded-md dark:text-gray-400 hover:text-gray-100 hover:bg-blue-600"
                    >
                      Previous
                    </a>
                  </li>
                  <li className="page-item ">
                    <a
                      href="#"
                      className="relative block px-3 py-1.5 mr-3 text-base hover:text-blue-700 transition-all duration-300 hover:bg-blue-200 dark:hover:text-gray-400 dark:hover:bg-gray-700 rounded-md text-gray-100 bg-blue-600"
                    >
                      1
                    </a>
                  </li>
                  <li className="page-item ">
                    <a
                      href="#"
                      className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 rounded-md mr-3  "
                    >
                      2
                    </a>
                  </li>
                  <li className="page-item ">
                    <a
                      href="#"
                      className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 rounded-md mr-3 "
                    >
                      3
                    </a>
                  </li>
                  <li className="page-item ">
                    <a
                      href="#"
                      className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 rounded-md "
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Homepage;