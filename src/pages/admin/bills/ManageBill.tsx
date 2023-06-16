import { Table, Empty, message } from 'antd';
import { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { RemoveAbout } from '../../../api/about';
import { Link } from 'react-router-dom';
import { GetAllBill } from '../../../api/bill';
import IBill from '../../../types/bill';

const ManageBill = () => {
  // api comment 
  const [bills, setbills] = useState<IBill[]>([])
  useEffect(() => {
    GetAllBill().then(({ data }) => setbills(data.data))
  }, [])
  const HandleRemoveBill = async (id: string) => {
    const key = 'loading';
    try {
      const loading = await message.loading({ content: 'đang xử lý!', key, duration: 2 });
      if (loading) {
        const response = await RemoveAbout(id);
        if (response)
          message.success(response.data.message, 3);
        //  GetAllComment().then(({ data }) => setbills(data.data))
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
      title: 'total',
      dataIndex: 'total',
      key: 'total'
    },
    {
      title: 'items',
      dataIndex: 'items',
      key: 'items',
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'action',
      render: (item: IBill) =>
        <>
          <Link to={`/admin/bills/${item.key}/update`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><EditOutlined /></button>
          </Link>
          <button type="button"
            onClick={() => HandleRemoveBill(item.key)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            <DeleteOutlined />
          </button>
        </>
    },
  ];

  const listData = bills.map((item: IBill, index: number) => {
    return {
      index: index,
      key: item._id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      address: item.address,
      total: item.total,
      items: item.items.length,
      status: item.status
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

export default ManageBill