import { Table, Empty, message, Image } from 'antd';
import { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { GetAllAbout, RemoveAbout } from '../../../api/about';
import IAbout from '../../../types/about';
import { Link } from 'react-router-dom';

const ManageAbout = () => {
  // api comment 
  const [abouts, setabouts] = useState<IAbout[]>([])
  useEffect(() => {
    GetAllAbout().then(({ data }) => setabouts(data.data))
  }, [])
  const HandleRemoveAbout = async (id: string) => {
    const key = 'loading';
    try {
      const loading = await message.loading({ content: 'đang xử lý!', key, duration: 2 });
      if (loading) {
        const response = await RemoveAbout(id);
        if (response)
          message.success(response.data.message, 3);
        //  GetAllComment().then(({ data }) => setabouts(data.data))
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
      key: 'name'
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'image',
      key: 'image',
      render: (item: IAbout) =>
        <Image style={{ width: 50, height: 50 }} src={item.image} alt="" />
    },
    {
      title: 'mô tả',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'action',
      render: (item: IAbout) =>
        <>
          <Link to={`/admin/abouts/${item.key}/update`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><EditOutlined /></button>
          </Link>
          <button type="button"
            onClick={() => HandleRemoveAbout(item.key)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            <DeleteOutlined />
          </button>
        </>
    },
  ];

  const listData = abouts.map((item: IAbout, index: number) => {
    return {
      index: index,
      key: item._id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      address: item.address,
      image: item.image,
      description: item.description,
    }
  })
  if (listData.length == 0)
    return (
      <Empty description={false} />
    )
  return (
    <>
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

export default ManageAbout