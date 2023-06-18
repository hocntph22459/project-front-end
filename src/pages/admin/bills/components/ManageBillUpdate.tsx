import { useEffect, useState } from 'react';
import {
  Button, Form, Input, Select, message,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import IBill from '../../../../types/bill';
import { GetOneBill } from '../../../../api/bill';
type Props = {

};

const ManageBillUpdate = (props: Props) => {
  const { id }: any = useParams()
  const [orders, setorders] = useState<IBill>();
  useEffect(() => {
    GetOneBill(id)
      .then(({ data }) => setorders(data))
  }, [props]);
  // console.log(orders)
  const navigate = useNavigate();


  const onFinish = async (values: IBill) => {
    // try {
    //   const key = 'loading';
    //   const loading = await message.loading({ content: 'loading!', key, duration: 2 });
    //   if (loading) {
    //     const response = await Updateorders(values);
    //     if (response)
    //       message.success(response.data.message, 3);
    //   }

    //   navigate('/admin/orders');
    // } catch (error: any) {
    //   message.error(error.message || 'lỗi khi thêm bài viết!');
    // }
    console.log(values)
  };


  if (!orders) return null;

  const initial = {
    _id: orders._id,
    name: orders.name,
    email: orders.email,
    phone: orders.phone,
    address: orders.address,
    items: orders.items,
    status: orders.status,
  };

  return (
    <>
      <Form initialValues={initial}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        className="max-w-[1000px] mx-auto"
      >
        <Form.Item hidden
          label="_id"
          name="_id"
        >
          <Input />
        </Form.Item>
        <Form.Item name="name" label="name" rules={[{ message: 'vui lòng nhập name!', required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="email" rules={[{ message: 'vui lòng nhập email!', required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="phone" rules={[{ message: 'vui lòng nhập phone!', required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="address" rules={[{ message: 'vui lòng nhập address!', required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="phone" rules={[{ message: 'vui lòng nhập phone!', required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="status" name="staus">
          <Select
            className="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            options={[
              { value: 'disabled', label: 'đang chờ duyệt', disabled: true },
              { value: 'đang giao hàng', label: 'đang giao hàng' },
              { value: 'đã thanh toán', label: 'đã thanh toán' },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button style={{ marginLeft: 165 }} type="primary" className="bg-blue-500" htmlType="submit">
            cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ManageBillUpdate;
