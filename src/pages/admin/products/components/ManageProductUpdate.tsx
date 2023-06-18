import { useEffect, useState } from 'react';
import {
  Button, Form, Input, Select, message,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { ICategory } from '../../../../types/category';
import { IProduct } from '../../../../types/product';
import { UpdateProduct } from '../../../../api/product';
import IhashTag from '../../../../types/hashtag';
type Props = {
  products: IProduct[]
  categories: ICategory[],
  hashtags: IhashTag[]
};

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const ManagementProductUpdate = (props: Props) => {
  const { id } = useParams()
  const [product, setproduct] = useState<IProduct>();
  useEffect(() => {
    const response = props.products.find((item: any) => item._id == id);
    setproduct(response);
  }, [props]);
  console.log(product)
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  console.log(fileList)
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
        console.log(file.originFileObj as Blob)
      });
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/upload`, formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      })
        .then(res => res.data);
      values.images = res.secure_url;

      const key = 'loading';

      const loading = await message.loading({ content: 'loading!', key, duration: 2 });
      if (loading) {
        const response = await UpdateProduct(values);
        if (response)
          message.success('update Product seccessfully', 3);
      }

      navigate('/admin/product');
    } catch (error) {
      message.error('update Product failed');
    }
  };


  if (!product) return null;

  const initial = {
    _id: product._id,
    name: product.name,
    price: product.price,
    images: product.images,
    description: product.description,
    tags: product.tags,
    CategoryId: product.CategoryId,
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
        <Form.Item name="title" label="Title" rules={[{ message: 'vui lòng nhập title!', required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Content" rules={[{ message: 'vui lòng nhập content!', required: true }]}>
          <Input.TextArea rows={8} />
        </Form.Item>
        <Form.Item name="author" label="Author" rules={[{ message: 'vui lòng nhập author!', required: true }]}>
          <Input />
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
        <Form.Item label="Image">
          <div className="mb-6">
            <Upload
              action=""
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
            cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ManagementProductUpdate;
