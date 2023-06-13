import ListCategories from './components/ListCategories'
import ListProducts from './components/ListProducts'
import { IProduct } from '../../../types/product'
import { ICategory } from '../../../types/category'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { FilterProductByCategory } from '../../../api/product';
type Props = {
  categories: ICategory[]
}
const ProductPage = (props: Props) => {
  const location = useLocation();
  // Lấy giá trị của cateId từ location.search sau đó loại bỏ dấu ? ở đầu
  const cateId: any = new URLSearchParams(location.search).get("cateId");
  const [products, setproducts] = useState<IProduct[]>([])
  useEffect(() => {
    FilterProductByCategory(cateId).then(({ data }) => setproducts(data.data))
  }, [cateId])
  return (
    <section>
      <div className="main-banner">
        <img src="https://file.hstatic.net/1000376021/file/1920x720_d628af2ab2c24b26b156660120d24bef.png" alt="" />
      </div>
      <div className='my-16' style={{ display: 'grid', gridTemplateColumns: '330px 1fr' }}>
        <ListCategories categories={props.categories} />
        <ListProducts products={products} />
      </div>
    </section>
  )
}

export default ProductPage;