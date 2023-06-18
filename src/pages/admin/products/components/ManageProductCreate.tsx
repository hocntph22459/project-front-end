import { useState } from 'react';
import {
  Button, Form, Input, Select, message,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { ICategory } from '../../../../types/category';
import { IProduct } from '../../../../types/product';
import { CreateProduct } from '../../../../api/product';
import IhashTag from '../../../../types/hashtag';
type Props = {
  categories: ICategory[],
  hashtags: IhashTag[],
};

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const ManagementProductCreate = (props: Props) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onFinish = async (values: IProduct) => {
    try {
      if (fileList.length === 0) {
        throw new Error("vui lòng nhập hình ảnh!");
      }
      const cloud_name = "dpy2w5vus";
      const upload_preset = "demo_upload";
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append(`file`, file.originFileObj as Blob);
        formData.append('upload_preset', upload_preset);
        formData.append('cloud_name', cloud_name);
        formData.append('folder', 'duancanhan');
      });
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/upload`, formData)
        .then(res => res.data);
      values.images = res.secure_url;
      console.log(values)
      const key = 'loading'
      const loading = await message.loading({ content: 'loading!', key, duration: 2 })
      if (loading) {
        const response = await CreateProduct(values);
        if (response)
          message.success('create successfully Product', 3);
        navigate('/admin/post');
        // GetAllProduct().then(({ data }) => setproducts(data))
      }
    } catch (error) {
      message.error('Failed to create product');
    }
  };
  return (
    <>
      <Button className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-indigo-700 bg-white border border-indigo-700 focus:outline-none focus:bg-gray-200 hover:bg-gray-200 duration-150 justify-center items-center" onClick={() => setOpen(true)}>
        <PlusOutlined />
      </Button>
      <Modal
        title="Create product"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={null}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
        >
          <Form.Item name="name" label="name" rules={[{ message: 'vui lòng nhập name!', required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="price" rules={[{ message: 'vui lòng nhập price!', required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="quantity" label="quantity" rules={[{ message: 'vui lòng nhập quantity!', required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Image">
            <div className="mb-6">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
          </Form.Item>
          <Form.Item name="description" label="description" rules={[{ message: 'vui lòng nhập description!', required: true }]}>
            <Input.TextArea rows={8} />
          </Form.Item>
          <Form.Item label="hashtag" name="tags">
            <Select
              className="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              options={props.hashtags.map((list) => ({
                label: list.name,
                value: list._id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Category" name="CategoryId">
            <Select
              className="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              options={props.categories.map((list) => ({
                label: list.name,
                value: list._id,
              }))}
            />
          </Form.Item>
          <Form.Item>
            <Button style={{ marginLeft: 165 }} type="primary" className="bg-blue-500" htmlType="submit">
              thêm mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ManagementProductCreate;
