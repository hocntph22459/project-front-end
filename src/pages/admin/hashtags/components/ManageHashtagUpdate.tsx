import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Col, Form, Input, Row, message } from 'antd';
import IhashTag from '../../../../types/hashtag';
import { UpdateHashtag } from '../../../../api/hashtags';
type Props = {
  hashtags: IhashTag[],
}
const ManageHashtagUpdate = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const onFinish = async (values: IhashTag) => {
    const key = 'loading';
    try {
      const loading = await message.loading({ content: 'loading!', key, duration: 2 });
      if (loading) {
        const response = await UpdateHashtag(values);
        if (response)
          message.success('successfully update hashtags', 3);
        navigate('/admin/hashtags');
      }
    } catch (error: any) {
      message.error('update failed hashtags', 5);
    }
  };
  const [hashtags, sethashtags] = useState<IhashTag>();
  useEffect(() => {
    const response = props.hashtags.find((item: any) => item._id == id);
    sethashtags(response);
  }, [props]);
  if (!hashtags) return null;
  const initial = {
    _id: hashtags._id,
    name: hashtags.name,
  };
  return (
    <Form layout="vertical" autoComplete="off" onFinish={onFinish} initialValues={initial}>
      <Row gutter={50}>
        <Col span={12}>
          <Form.Item hidden
            label="_id"
            name="_id"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ message: 'Không được bỏ trống!', required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Button type="primary" className="bg-blue-500" htmlType="submit">
        cập nhật
      </Button>
    </Form>
  );
};

export default ManageHashtagUpdate;
