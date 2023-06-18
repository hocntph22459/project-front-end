import { Table, Empty, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import IhashTag from '../../../types/hashtag';
import { GetAllHashtag, RemoveHashtag } from '../../../api/hashtags';
import { Link } from 'react-router-dom';
import { DeleteOutlined,EditOutlined } from "@ant-design/icons"
import ManageHashtagCreate from './components/ManageHashtagCreate';

const ManageHashtag = () => {
  // State hashtags
  const [hashtags, sethashtags] = useState<IhashTag[]>([])
  useEffect(() => {
    GetAllHashtag()
      .then(({ data }) => sethashtags(data))
  }, [])

  const HandleRemoveHashtag = async (id: string) => {
    const key = 'loading';
    try {
      const loading = await message.loading({ content: 'loading!', key, duration: 2 });
      // Hiển thị hộp thoại xác nhận trước khi xóa contact
      Modal.confirm({
        title: 'Confirm',
        content: 'Are you sure you want to delete this contact?',
        okText: 'Yes',
        cancelText: 'No',
        onOk: async () => {
          if (loading) {
            const response = await RemoveHashtag(id);
            if (response) {
              message.success('successfully delete contacts', 3);
              const dataNew = hashtags.filter(tag => tag._id !== id);
              sethashtags(dataNew);
            }
          }
        },
        onCancel: () => {
          message.success('clicked cancel button')
        }
      });
    } catch (error) {
      message.error('delete failed contacts', 5);
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
      title: 'created At',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'action',
      render: (item: IhashTag) =>
        <>
          <Link to={`/admin/hashtags/${item.key}/update`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><EditOutlined/></button>
          </Link>
          <button type="button"
            onClick={() => HandleRemoveHashtag(item.key)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            <DeleteOutlined/>
          </button>
        </>
    },
  ];

  const data = hashtags.map((item: IhashTag, index: number) => {
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
    <ManageHashtagCreate/>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={{ pageSize: 4, showQuickJumper: true }}
      />
    </>
  )
}

export default ManageHashtag