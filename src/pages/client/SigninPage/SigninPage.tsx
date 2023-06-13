import React, { useRef, useState } from 'react';
import { Button, Form, FormItemProps, Input, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { message } from "antd"
import { Signin } from '../../../api/auth';
import IUser from '../../../types/user';
import ReCAPTCHA from 'react-google-recaptcha';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import ForgotPassword from '../ForgotPassword';
const MyFormItemContext = React.createContext<(string | number)[]>([]);

function toArr(str: string | number | (string | number)[]): (string | number)[] {
    return Array.isArray(str) ? str : [str];
}
const MyFormItem = ({ name, ...props }: FormItemProps) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
};
const SigninPage = () => {
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (value: IUser) => {
        if (isVerified == true) {
            const key = 'loading'
            if (value) {
                try {
                    const loading = await message.loading({ content: 'đang xử lý!', key, duration: 2 })
                    if (loading) {
                        const response = await Signin(value);
                        if (response) {
                            localStorage.setItem('accessToken', (response.data.accessToken));
                            localStorage.setItem('user', JSON.stringify(response.data.user));
                            message.success(response.data.message, 3);
                            navigate('/')
                        }
                    }

                } catch (error: any) {
                    message.error(error.response.data.message, 5);
                }
            }
        }
    };

    const handleRecaptcha = (value: string | null) => {
        if (value) {
            setIsVerified(true);
        }
    };

    const resetRecaptcha = () => {
        setIsVerified(false);
        if (recaptchaRef.current) {
            recaptchaRef.current.reset();
        }
    };
    const showModalSignin = () => {
        setIsModalOpen(true);
    };
    const handleOkSignin = () => {
        setIsModalOpen(false);
    };

    const handleCancelSignin = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-white bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-600 hover:bg-indigo-600 duration-150 justify-center items-center" onClick={showModalSignin}>
                Signin
            </Button>
            <Modal footer={null} open={isModalOpen} onOk={handleOkSignin} onCancel={handleCancelSignin}>
                <Form className="mt-[30px] w-[400px] mx-auto" name="form_item_path" layout="vertical" onFinish={onFinish} autoComplete="off">
                    <h1 className="text-center mt-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in
                    </h1>
                    <MyFormItem className='text-black font-bold'
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
                        <Input className='font-mono border border-indigo-600 h-10' placeholder="nhập email" />
                    </MyFormItem>
                    <MyFormItem className='text-black font-bold'
                        name="password"
                        label="mật khẩu"
                        rules={[
                            {
                                message: 'vui lòng nhập password!',
                                required: true,
                            },
                        ]}
                    >
                        <Input.Password
                            type='password' className='font-mono border border-indigo-600 h-10' placeholder="nhập password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </MyFormItem>
                    <MyFormItem >
                        <ReCAPTCHA className=''
                            ref={recaptchaRef}
                            sitekey="6Ld_Ek8mAAAAAKtnDYdUCNiClx9m52L_aafio6we"
                            onChange={handleRecaptcha}
                        />
                        {isVerified ? (
                            <p>Xác thực thành công!</p>
                        ) : (
                            <p className='text-[red]'>Vui lòng xác thực bằng Recaptcha trước khi tiếp tục.</p>
                        )}
                    </MyFormItem>
                    <Button
                        htmlType="submit"
                        className="w-full h-[52px] text-center py-3 rounded bg-[black] text-white hover:bg-green-dark focus:outline-none my-1"
                    >
                        Đăng nhập
                    </Button>
                    <div>
                        <p className="text-sm text-black font-bold dark:text-gray-400">
                            bạn chưa có tài khoản?{" "}
                        </p>
                        <Link className="text-[13px] text-black font-bold" to="/signup">
                            đăng ký
                        </Link>
                    </div>
                    <div>
                        <ForgotPassword />
                    </div>
                </Form>
            </Modal>
        </>
    );
}

export default SigninPage