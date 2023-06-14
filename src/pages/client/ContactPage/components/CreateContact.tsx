import { Button, Form, FormItemProps, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { message } from "antd"
import { createContext, useContext } from 'react';
import { CreateContact } from '../../../../api/contact';
import IContact from '../../../../types/contact';
const MyFormItemContext = createContext<(string | number)[]>([]);
function toArr(str: string | number | (string | number)[]): (string | number)[] {
    return Array.isArray(str) ? str : [str];
}
const MyFormItem = ({ name, ...props }: FormItemProps) => {
    const prefixPath = useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
};
type Props = {}

const FormCreateContact = (props: Props) => {
    const Navigate = useNavigate()
    const onFinish = async (value: IContact) => {
        const key = 'loading'
        if (value) {
            try {
                const loading = await message.loading({ content: 'đang xử lý!', key, duration: 2 })
                if (loading) {
                    const response = await CreateContact(value);
                    if (response && response.data) {
                        message.success(response.data.message, 3);
                        Navigate('/')
                    }
                }

            } catch (error: any) {
                message.error(error.response.data.message, 5);
            }
        }
    }
    return (
        <div className="px-8 py-8 bg-white border rounded-md shadow-md dark:border-gray-800 dark:bg-gray-800">
            <div className="max-w-xl mx-auto">
                <div className="text-center ">
                    <div className="relative flex flex-col items-center">
                        <div className="absolute hidden md:block -top-14 left-0 text-[120px] text-gray-400 font-bold opacity-10">
                            Contact
                        </div>
                        <h1 className="text-5xl font-bold dark:text-white">
                            {" "}
                            Our <span className="text-blue-500"> Contact</span>{" "}
                        </h1>
                        <div className="flex w-24 mt-1 mb-10 overflow-hidden rounded">
                            <div className="flex-1 h-2 bg-blue-200"></div>
                            <div className="flex-1 h-2 bg-blue-400"></div>
                            <div className="flex-1 h-2 bg-blue-600"></div>
                        </div>
                    </div>
                    <p className="mb-16 text-base text-center text-gray-500">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
                        magni eius eaque? Pariatur numquam, odio quod nobis ipsum ex
                        cupiditate?
                    </p>
                </div>
            </div>
            <div className="px-8 py-8 bg-white border rounded-md shadow-md dark:border-gray-800 dark:bg-gray-800">
                <Form className="mt-4 max-w-lg mx-auto" name="form_item_path" layout="vertical" onFinish={onFinish} autoComplete="off">
                    <MyFormItem
                        name="name"
                        label="name"
                        rules={[
                            {
                                message: 'vui lòng nhập name!',
                                required: true,
                            },
                        ]}
                    >
                        <Input className='h-10 border rounded-md px-4 py-2 text-lg lg:w-[600px]' placeholder="nhập name" />
                    </MyFormItem>
                    <MyFormItem
                        name="email"
                        label="Email"
                        rules={[
                            {
                                message: 'vui lòng nhập email!',
                                required: true,
                                type: 'email'
                            },
                        ]}
                    >
                        <Input className='h-10 border rounded-md px-4 py-2 text-lg lg:w-[600px]' placeholder="nhập email" />
                    </MyFormItem>
                    <MyFormItem
                        name="phone"
                        label="phone"
                        rules={[
                            {
                                message: 'vui lòng nhập phone!',
                                required: true,
                            },
                        ]}
                    >
                        <Input className='h-10 border rounded-md px-4 py-2 text-lg lg:w-[600px]' placeholder="nhập phone" />
                    </MyFormItem>
                    <MyFormItem
                        name="address"
                        label="address"
                        rules={[
                            {
                                message: 'vui lòng nhập address!',
                                required: true,
                            },
                        ]}
                    >
                        <Input className='h-10 border rounded-md px-4 py-2 text-lg lg:w-[600px]' placeholder="nhập address" />
                    </MyFormItem>
                    <MyFormItem
                        name="support"
                        label="support"
                        rules={[
                            {
                                message: 'vui lòng nhập support!',
                                required: true,
                            },
                        ]}
                    >
                        <Input.TextArea className='border rounded-md px-4 py-2 text-lg' rows={4} />
                    </MyFormItem>
                    <Button
                        htmlType="submit"
                        className="w-full rounded-lg h-12 text-center py-3 bg-black text-white hover:bg-green-dark focus:outline-none my-1"
                    >
                        Gửi Ngay
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default FormCreateContact