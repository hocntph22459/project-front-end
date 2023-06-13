import { useEffect, useState } from 'react'
import { GetBillByUser } from '../../../api/bill'
import EmptyCart from '../Cart/components/EmptyCart';
import IBill from '../../../types/bill';
import ListInformation from './components/ListInformation';
import ListProductBill from './components/ListProductBill';

const OrderPage = () => {
    const user: any = localStorage.getItem("user");
    const userParse = user ? JSON.parse(user) : null;
    const [orders, setorders] = useState<IBill[]>([])
    useEffect(() => {
        if (userParse && userParse._id) {
            GetBillByUser(userParse._id).then(({ data }) => setorders(data.data))
        }
    }, [])
    console.log(orders)
    return (
        <>
            {orders.length === 0 ? (
                <EmptyCart />
            ) : (
                <div className="bg-gray-100 py-[80px]">
                    <h1 className="mb-10 text-center text-2xl font-bold">order detail</h1>
                    {orders.map(order => {
                        return (
                            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                                <ListProductBill order={order}/>
                                <ListInformation order={order}/>
                            </div>
                        )
                    })}
                </div>
            )}

        </>
    )
}

export default OrderPage