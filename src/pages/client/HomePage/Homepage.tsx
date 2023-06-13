import { SearchOutlined } from '@ant-design/icons'
import { Input, message } from 'antd';
import { useState } from 'react';
import { SearchProduct } from '../../../api/product';
import ListProductByCategories from './components/ListProductByCategories';
import { IProduct } from '../../../types/product';
import FindProduct from './components/FindProduct';

const Homepage = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const handleSearch = async (value: string) => {
    try {
      setQuery(value);
      const response = await SearchProduct(value)
      setProducts(response.data.data);
    } catch (error: any) {
      message.warning(error.response.data.message);
    }
  };
  return (
    <section className="bg-white py-8">
      <div className="main-banner">
        <img src="https://file.hstatic.net/1000376021/file/1920x720_copy_42b3f822c4ca4cd099bfb116931e6361.png" alt="" />
      </div>
      <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <nav id="store" className="w-full z-30 top-0 px-6 py-1">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
            <a
              className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
              href="#"
            >
              Store
            </a>
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
        {query ? (
          <FindProduct products={products} />
        ) : (
          <ListProductByCategories />
        )}
      </div>
    </section>
  )
}

export default Homepage;