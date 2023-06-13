import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetOneProduct } from '../../../api/product'
import ListRelatedProduct from './components/ListRelatedProduct'
import ListProductDetail from './components/ListProductDetail'
import { IProductDetail } from '../../../types/product'
const ProductDetailPage = () => {
  const { id }: any = useParams()
  const [product, setproduct] = useState<IProductDetail>()
  useEffect(() => {
    GetOneProduct(id)
      .then(({ data }) => setproduct(data))
  }, [])
  if (!product) return null;
  return (
    <section>
      <ListProductDetail product={product} />
      <ListRelatedProduct product={product} />
    </section>
  )
}

export default ProductDetailPage