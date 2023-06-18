import { Table, Empty, message } from 'antd';
import { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { RemoveAbout } from '../../../api/about';
import { Link } from 'react-router-dom';
import { GetAllBill } from '../../../api/bill';
import IBill from '../../../types/bill';
import ListItemsOrder from '../../../components/ListItemsOrder';

const ManageBill = () => {
  // api comment 
  const [bills, setbills] = useState<IBill[]>([])
  useEffect(() => {
    GetAllBill().then(({ data }) => setbills(data))
  }, [])
  const HandleRemoveBill = async (id: string) => {
    const key = 'loading';
    try {
      const loading = await message.loading({ content: 'loading!', key, duration: 2 });
      if (loading) {
        const response = await RemoveAbout(id);
        if (response)
          message.success('successfully delete', 3);
        //  GetAllComment().then(({ data }) => setbills(data))
      }
    } catch (error) {
        message.error('Failed delete', 5);
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
      key: 'items',
      render: (bill: IBill) =>
        <>
          <ListItemsOrder bill={bill} />
        </>
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'action',
      key: 'action',
      render: (item: IBill) =>
        <>
          <Link to={`/admin/order/bill/${item.key}/update`}>
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
      items: item.items,
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