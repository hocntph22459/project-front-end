import { Form, FormItemProps, Input, message } from 'antd';
import { createContext, useContext, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useSelector } from 'react-redux';
import { CreateBill } from '../../../../api/bill';
import { useNavigate } from 'react-router-dom';
import SigninPage from '../../SigninPage';
const MyFormItemContext = createContext<(string | number)[]>([]);
function toArr(str: string | number | (string | number)[]): (string | number)[] {
    return Array.isArray(str) ? str : [str];
}
const MyFormItem = ({ name, ...props }: FormItemProps) => {
    const prefixPath = useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
};

const CheckoutCart = ({ totalPrice }: any) => {
    const user:any = localStorage.getItem("user");
    const userParse = JSON.parse(user)
    const navigate = useNavigate()
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const cartItems = useSelector((state: any) => state.cart.cartItems);
    const onFinish = async (value: any) => {
        if (isVerified === true) {
            const key = 'loading'
            if (value) {
                const loading = await message.loading({ content: 'loading!', key, duration: 2 })
                if (loading) {
                    const BillData: any = {
                        name: value.name,
                        email: value.email,
                        phone: value.phone,
                        address: value.address,
                        total: totalPrice + 5.00,
                        items: cartItems,
                        User_id: userParse._id
                    }
                    console.log(BillData)
                    if (BillData) {
                        try {
                            const response = await CreateBill(BillData);
                            if (response && response.data) {
                                message.success(response.data.message, 3);
                                localStorage.removeItem('cartItems');
                                navigate('/order/bill')
                            }
                        } catch (error: any) {
                            message.error(error.response.data.message, 5);
                        }
                    }
                }
            }
        }
    };
    const handleRecaptcha = (value: string | null) => {
        if (value) {
            setIsVerified(true);
        }
    };
    return (
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/2">
            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                <p className="text-xl font-medium">Payment Details</p>
                <p className="text-gray-400">
                    Complete your order by providing your payment details.
                </p>
                <Form name="form_item_path" layout="vertical" onFinish={onFinish} autoComplete="off">
                    <MyFormItem className='text-black font-bold'
                        rules={[
                            {
                                message: 'vui lòng nhập name!',
                                required: true,
                            },
                        ]}
                        name="name"
                        label="name"
                    >
                        <Input className='font-mono border border-indigo-600 h-10' placeholder="nhập name" />
                    </MyFormItem>
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
                        rules={[
                            {
                                message: 'vui lòng nhập Phone!',
                                required: true,
                            },
                        ]}
                        name="phone"
                        label="Phone"
                    >
                        <Input className='font-mono border border-indigo-600 h-10' placeholder="nhập name" />
                    </MyFormItem>
                    <MyFormItem className='text-black font-bold'
                        rules={[
                            {
                                message: 'vui lòng nhập Address!',
                                required: true,
                            },
                        ]}
                        name="address"
                        label="Address"
                    >
                        <Input className='font-mono border border-indigo-600 h-10' placeholder="nhập name" />
                    </MyFormItem>
                    <MyFormItem className='flex w-[200px]'>
                        <ReCAPTCHA
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

                    {/* Total */}
                    <div className="mb-2 flex justify-between mt-4">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700">${totalPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Shipping</p>
                        <p className="text-gray-700">$5.00</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div className="">
                            <p className="mb-1 text-lg font-bold">${(totalPrice + 5.00).toFixed(2)} USD</p>
                            <p className="text-sm text-gray-700">including VAT</p>
                        </div>
                    </div>
                    <>
                        {user ? <button
                            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                        >
                            Check out
                        </button> : <SigninPage />}

                    </>
                </Form>
            </div>
        </div>
    )
}
export default CheckoutCart