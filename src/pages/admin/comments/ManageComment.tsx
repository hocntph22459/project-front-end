import { Table, Button, Empty, message } from 'antd';
import { useEffect, useState } from 'react';
import IComment from '../../../types/comment';
import { GetAllComment, RemoveComment } from '../../../api/comments';
import { DeleteOutlined } from "@ant-design/icons"

const ManageComment = () => {
 // api comment 
 const [comments, setcomments] = useState<IComment[]>([])
 useEffect(() => {
     GetAllComment().then(({ data }) => setcomments(data.data))
 }, [])
 const HandleRemoveComment = async (id: string) => {
     const key = 'loading';
     try {
         const loading = await message.loading({ content: 'đang xử lý!', key, duration: 2 });
         if (loading) {
             const response = await RemoveComment(id);
             if (response)
                 message.success(response.data.message, 3);
             GetAllComment().then(({ data }) => setcomments(data.data))
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
      title: 'content',
      dataIndex: 'content',
      key: 'content'
    },
    {
      title: 'product',
      dataIndex: 'product',
      key: 'product'
    },
    {
      title: 'created At',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'action',
      render: (item: IComment) => <>
        <Button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => HandleRemoveComment(item.key)}><DeleteOutlined/></Button>
      </>
    },
  ];

  const listData = comments.map((item:IComment,index:number) => {
    return {
      index: index,
      key: item._id,
      content: item.content,
      createdAt: item.createdAt,
      product: item.product
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

export default ManageComment