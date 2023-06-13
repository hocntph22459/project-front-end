import { useEffect, useState } from 'react'
import ListProductSale from './components/ListProductSale'
import { IProduct } from '../../../types/product'
import { GetProductSale } from '../../../api/product'

const ProductSale = () => {
    const [ProductSale,setProductSale] = useState<IProduct[]>([])
    useEffect(()=>{
        GetProductSale()
        .then(({ data }) => setProductSale(data.data))
    },[])
  return (
    <section>
      <div className="main-banner">
        <img src="https://file.hstatic.net/1000376021/file/sale_ef93ce5a5b0e4e63845866c36b76400b.jpg" alt="" />
      </div>
        <ListProductSale ProductSale={ProductSale}/>
    </section>
  )
}

export default ProductSale