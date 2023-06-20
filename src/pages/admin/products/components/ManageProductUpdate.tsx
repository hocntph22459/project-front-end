import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button, Form, Image, Input, Select, message,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, } from 'antd';
import { ICategory } from '../../../../types/category';
import { IProduct } from '../../../../types/product';
import { CreateProduct, GetAllProduct, GetOneProduct, UpdateProduct } from '../../../../api/product';
import IhashTag from '../../../../types/hashtag';

type Props = {
  categories: ICategory[],
  hashtags: IhashTag[]
};

type Size = {
  size: string,
  quantity: number,
};

const ManagementProductUpdate = (props: Props) => {
  const { id }: any = useParams()
  const [product, setproduct] = useState<IProduct>();
  useEffect(() => {
    GetOneProduct(id).then(({ data }) => setproduct(data))
  }, []);
  console.log(product)
  const [open, setOpen] = useState(false);
  const [files, setFiles]: any = useState([]);
  const [sizes, setSizes] = useState<Size[]>([{ size: '', quantity: 0 }]);

  const onDrop = (acceptedFiles: any) => {
    setFiles((prev: any) => [...prev, ...acceptedFiles]);
  };
  const navigate = useNavigate();
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleAddSize = () => {
    setSizes([...sizes, { size: '', quantity: 0 }]);
  };

  const handleRemoveSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleSizeChange = (index: number, fieldName: 'size' | 'quantity', value: string | number) => {
    const newSizes: any = [...sizes];
    newSizes[index][fieldName] = value;
    setSizes(newSizes);
  };

  const onFinish = async (values: IProduct) => {
    try {
      const uploaders = await files.map((file: any) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'demo_upload');
        formData.append('cloud_name', 'dpy2w5vus');
        formData.append('folder', 'project');
        return axios.post(
          `https://api.cloudinary.com/v1_1/dpy2w5vus/image/upload`,
          formData
        );
      });
      try {
        const responses: any = await axios.all(uploaders);
        const images = responses.map((response: any) => response.data.secure_url);
        const DataNew: any = {
          _id: values._id,
          name: values.name,
          price: values.price,
          images: images,
          description: values.description,
          CategoryId: values.CategoryId,
          tags: values.tags,
          sizes: sizes,
        }
        console.log(DataNew)
        // const key = 'loading'
        // const loading = await message.loading({ content: 'loading!', key, duration: 2 })
        // if (loading) {
        //   const response = await UpdateProduct(DataNew);
        //   if (response)
        //     message.success('Update successfully Product', 3);
        //   navigate('/admin/products');
        // }
      } catch (error) {
        console.error(error);
      }
    }
    catch (error) {
      message.error('Failed to Update product');
    }
  };

  if (!product) return null;

  const initial = {
    _id: product._id,
    name: product.name,
    price: product.price,
    images: product.images,
    description: product.description,
    tags: product.tags.map(tag => tag.name),
    CategoryId: product.CategoryId.map(cate => cate.name),
    sizes: product.sizes
  };
  console.log(initial) //sizes là 1 mảng chứa {size,quantity}
  return (
    <Form
      initialValues={initial}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      onFinish={onFinish}
    >
      <Form.Item hidden
        label="_id"
        name="_id"
      >
        <Input />
      </Form.Item>
      <Form.Item name="name" label="Name" rules={[{ message: 'Please enter name!', required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ message: 'Please enter price!', required: true }]}>
        <Input type='number' />
      </Form.Item>
      <Form.Item label="Image">
        <div className="mb-6">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <UploadOutlined />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </div>
        {files.length > 0 ? (
          <div className="mb-6">
            {files.map((file: any) => (
              <div key={file.name}>
                <p>{file.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-6">

            <Image.PreviewGroup
            >
              {initial.images.map((image: string, index: number) => (
                <Image style={{ width: 50, height: 50 }} src={image} alt="" key={index} />
              ))}
            </Image.PreviewGroup>
          </div>
        )}
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[{ message: 'Please enter description!', required: true }]}>
        <Input.TextArea rows={8} />
      </Form.Item>
      <Form.Item
        label="Hashtag"
        name="tags"
        rules={[{ message: 'Please enter hashtags!', required: true }]}
      >
        <Select
          className="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          options={props.hashtags.map((list) => ({
            label: list.name,
            value: list._id,
            defaultValue: initial.tags.includes(list._id) ? list._id : null,
          }))}
        />
      </Form.Item>

      <Form.Item
        label="Categories"
        name="CategoryId"
        rules={[{ message: 'Please enter Categories!', required: true }]}
      >
        <Select
          className="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          options={props.categories.map((list) => ({
            label: list.name,
            value: list._id,
            defaultValue: initial.CategoryId.includes(list._id) ? list._id : null,
          }))}
        />
      </Form.Item>

      <Form.Item label="Sizes" rules={[{ message: 'Please enter sizes!', required: true }]}>
        {sizes.map((size, index) => (
          <div className="flex space-x-4 mb-4 mt-8" key={index}>
            <div>
              <label htmlFor="">size</label>
              <Input placeholder="Size" type='number' value={size.size} onChange={(e) => handleSizeChange(index, 'size', parseInt(e.target.value))} />
            </div>
            <div>
              <label htmlFor="">quantity</label>
              <Input placeholder="Quantity" type="number" value={size.quantity} onChange={(e) => handleSizeChange(index, 'quantity', parseInt(e.target.value))} />
            </div>
            <Button type="primary" danger onClick={() => handleRemoveSize(index)}>Remove</Button>
          </div>
        ))}
        <Button type="dashed" onClick={handleAddSize}>Add Size</Button>
      </Form.Item>
      <Form.Item>
        <Button style={{ marginLeft: 165 }} type="primary" className="bg-blue-500" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ManagementProductUpdate;