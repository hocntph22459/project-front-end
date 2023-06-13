import { Table, Empty, message } from 'antd';
import { DeleteOutlined,EditOutlined } from "@ant-design/icons"
import { ICategory } from '../../../types/category';
import { RemoveCategory } from '../../../api/categories';
import { Link } from 'react-router-dom';
import ManageCategoryAdd from './components/ManageCategoryCreate';
type Props = {
  categories: ICategory[]
}
const ManageCategory = (props: Props) => {
  const HandleRemoveCategory = async (id: string) => {
    const key = 'loading';
    try {
      const loading = await message.loading({ content: 'đang xử lý!', key, duration: 2 });
      if (loading) {
        const response = await RemoveCategory(id);
        if (response)
          message.success(response.data.message, 3);
        // GetAllCategory().then(({ data }) => setcategories(data));
      }
    } catch (error: any) {
      if (error.response) {
        message.error(error.response.data.message, 5);
      } else {
        message.error('Có lỗi xảy ra, vui lòng thử lại sau.', 5);
      }
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
      key: 'name',
    },
    {
      title: 'created At',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'action',
      render: (item: ICategory) =>
        <>
          <Link to={`/admin/categories/${item.key}/update`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><EditOutlined /></button>
          </Link>
          <button type="button"
            onClick={() => HandleRemoveCategory(item.key)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            <DeleteOutlined />
          </button>
        </>
    },
  ];

  const data = props.categories.map((item:ICategory,index:number) => {
    return {
      index: index,
      key: item._id,
      name: item.name,
      createdAt: item.createdAt,

    }
  })
  if (data.length == 0)
    return (
      <Empty description={false} />
    )
  return (
    <>
    <ManageCategoryAdd/>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={{ pageSize: 4, showQuickJumper: true }}
      />
    </>
  )
}

export default ManageCategory