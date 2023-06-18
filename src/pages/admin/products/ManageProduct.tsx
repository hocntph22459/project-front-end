import { Table, Empty, Image, message } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { IProduct } from '../../../types/product';
import { RemoveProduct } from '../../../api/product';
import { Link } from 'react-router-dom';
import ManagementProductCreate from './components/ManageProductCreate';
import { ICategory } from '../../../types/category';
import IhashTag from '../../../types/hashtag';
type Props = {
  products: IProduct[],
  categories: ICategory[],
  hashtags:IhashTag[]
}
const ManagementProduct = (props: Props) => {
  const HandleRemovePost = async (id: string) => {
    const key = 'loading';
    try {
      const loading = await message.loading({ content: 'loading!', key, duration: 2 });
      if (loading) {
        const response = await RemoveProduct(id);
        if (response) {
          message.success('successfully delete Product', 3);
          props.products = props.products.filter(product => product._id !== id)
        }
      }
    } catch (error: any) {
      message.error('Failed delete Product', 5);
    }
  }
  const columns = [
    {
      title: 'stt',
      dataIndex: 'index',
      key: 'index'
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'sizes',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'images',
      key: 'images',
      render: (item: IProduct) =>
        <>
          <Image.PreviewGroup
          >
            {item.images.map((image: string, index: number) => (
              <Image style={{ width: 50, height: 50 }} src={image} alt="" key={index} />
            ))}
          </Image.PreviewGroup>
        </>

    },
    {
      title: 'created At',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'action',
      render: (item: IProduct) =>
        <>
          <Link to={`/admin/products/${item.key}/update`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><EditOutlined /></button>
          </Link>
          <button type="button"
            onClick={() => HandleRemovePost(item.key)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            <DeleteOutlined />
          </button>
        </>
    },
  ];

  const listData = Array.from(props.products).map((item: IProduct, index: Number) => ({
    key: item._id,
    index: index,
    href: '/post/' + item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    size: item.sizes,
    images: item.images,
    description: item.description,
    createdAt: item.createdAt,
    tags: item.tags,
    CategoryId: item.CategoryId,
  }));

  if (listData.length == 0)
    return (
      <Empty description={false} />
    )
  return (
    <>
      <ManagementProductCreate  hashtags={props.hashtags} categories={props.categories} />
      <Table
        columns={columns}
        dataSource={listData}
        bordered
        pagination={{
          pageSize: 4, showQuickJumper: true
        }}
      />
    </>
  )
}

export default ManagementProduct