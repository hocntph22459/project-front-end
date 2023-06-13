import { Table, Button, Empty, Input, message, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import IUser from '../../../types/user';
import { GetAllUser, RemoveUser } from '../../../api/user';
import { DeleteOutlined } from "@ant-design/icons"

const ManageUser = () => {
  // api users 
  const [users, setusers] = useState<IUser[]>([])
  useEffect(() => {
    GetAllUser().then(({ data }) => setusers(data.data))
  }, [])
  const HandleRemoveUser = async (id: string) => {
    const key = 'loading';
    try {
      const loading = await message.loading({ content: 'đang xử lý!', key, duration: 2 });
      if (loading) {
        const response = await RemoveUser(id);
        if (response)
          message.success(response.data.message, 3);
        GetAllUser().then(({ data }) => setusers(data.data))
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
      title: 'role',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'created At',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'action',
      render: (item: IUser) => <>
        {item.role === 'admin' ? <Button hidden>delete</Button> :
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
          >
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => HandleRemoveUser(item.key)} ><DeleteOutlined/></button>
          </Popconfirm>
        }
      </>
    },
  ];

  const data = users.map((item:IUser,index:number) => {
    return {
      index: index,
      key: item._id,
      name: item.name,
      email: item.email,
      role: item.role,
      createdAt: item.createdAt,
    }
  })
  if (data.length == 0)
    return (
      <Empty description={false} />
    )
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={{ pageSize: 4, showQuickJumper: true }}
      />
    </>
  )
}

export default ManageUser