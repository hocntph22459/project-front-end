import { Table, Empty, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import IContact from '../../../types/contact';
import { GetAllContact, RemoveContact } from '../../../api/contact';
import { DeleteOutlined } from "@ant-design/icons"

const ManageContact = () => {
  const [contacts, setcontacts] = useState<IContact[]>([])
  useEffect(() => {
    GetAllContact().then(({ data }) => setcontacts(data))
  }, [])

  const HandleRemoveContact = async (id: string) => {
    const key = 'loading';
    try {
      const loading = await message.loading({ content: 'loading!', key, duration: 2 });
      Modal.confirm({
        title: 'Confirm',
        content: 'Are you sure you want to delete this contact?',
        okText: 'Yes',
        cancelText: 'No',
        onOk: async () => {
          if (loading) {
            const response = await RemoveContact(id);
            if (response) {
              message.success('successfully delete contacts', 3);
              const dataNew = contacts.filter(contact => contact._id !== id);
              setcontacts(dataNew);
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

  const HandleRemoveBill = async (id: string) => {
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
            const response = await RemoveContact(id);
            if (response) {
              message.success('Deleted successfully!', 3);
              const dataNew = contacts.filter((data) => data._id !== id);
              setcontacts(dataNew);
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
      title: 'support',
      dataIndex: 'support',
      key: 'support'
    },
    {
      title: 'created At',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'action',
      render: (item: IContact) => <>
        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => HandleRemoveContact(item.key)}><DeleteOutlined /></button>
      </>
    },
  ];

  const listData = contacts.map((item, index) => {
    return {
      key: item._id,
      index: index,
      name: item.name,
      email: item.email,
      phone: item.phone,
      address: item.address,
      support: item.support,
      createdAt: item.createdAt,
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

export default ManageContact