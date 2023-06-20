import { Table, Empty, Image, message, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { IProduct, ISizes } from '../../../types/product';
import { GetAllProduct, RemoveProduct } from '../../../api/product';
import { Link } from 'react-router-dom';
import ManagementProductCreate from './components/ManageProductCreate';
import { ICategory } from '../../../types/category';
import IhashTag from '../../../types/hashtag';
import { useEffect, useState } from 'react';
type Props = {
  products: IProduct[],
  categories: ICategory[],
  hashtags: IhashTag[]
}
const ManagementProduct = (props: Props) => {
  const [products, setProducts] = useState<IProduct[]>([])
  useEffect(() => {
    GetAllProduct().then(({ data }) => setProducts(data))
  }, [])

  const HandleRemoveProduct = async (id: string) => {
    try {
      Modal.confirm({
        title: 'Confirm',
        content: 'Are you sure you want to delete this about?',
        okText: 'Yes',
        cancelText: 'No',
        okButtonProps: {
          className: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" // áp dụng lớp CSS
        },
        onOk: async () => {
          const loading = message.loading({ content: 'Loading...', duration: 0 });
          setTimeout(async () => {
            if (loading) {
              loading();
            }
            const response = await RemoveProduct(id);
            if (response) {
              message.success('Deleted successfully!', 3);
              const dataNew = products.filter((data) => data._id !== id);
              setProducts(dataNew);
            }
          }, 2000);
        },
        onCancel: () => {
          message.success('Canceled!');
        },
      });
    } catch (error) {
      message.error('Delete failed!', 5);
    }
  };
  const columns = [
    {
      title: 'stt',
      dataIndex: 'index',
      key: 'index',
      width: 5
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'salePrice',
      dataIndex: 'salePrice',
      key: 'salePrice',
    },
    {
      title: 'size',
      dataIndex: 'sizes',
      key: 'sizes',
      render: (sizes: ISizes[]) => (
        <>
          {sizes.map((size) => (
            <p key={size._id}>{size.size}</p>
          ))}
        </>
      ),
    },
    {
      title: 'quantity',
      dataIndex: 'sizes',
      key: 'sizes',
      render: (sizes: ISizes[]) => (
        <>
          {sizes.map((size) => (
            <p key={size._id}>{size.quantity}</p>
          ))}
        </>
      ),
      width: 20
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
        </>,
    },
    {
      title: 'action',
      render: (item: IProduct) =>
        <>
          <Link to={`/admin/products/${item.key}/update`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><EditOutlined /></button>
          </Link>
          <button type="button"
            onClick={() => HandleRemoveProduct(item.key)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            <DeleteOutlined />
          </button>
        </>
    },
  ];

  const listData = Array.from(products).map((item: IProduct, index: Number) => ({
    key: item._id,
    index: index,
    href: '/post/' + item._id,
    name: item.name,
    price: item.price,
    salePrice: item.salePrice,
    quantity: item.quantity,
    sizes: item.sizes,
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
      <ManagementProductCreate hashtags={props.hashtags} categories={props.categories} />
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