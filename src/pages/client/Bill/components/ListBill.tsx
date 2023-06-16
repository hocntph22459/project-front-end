import IBill from '../../../../types/bill'
import ListItemsOrder from './ListItemsOrder'

type Props = {
    orders: IBill[]
}

const ListBill = (props: Props) => {
    return (
        <>{props.orders.map((bill) => {
            return (
                <div key={bill._id} className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
                    <div className="px-6 py-4">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Thank you for your purchase!
                        </h2>
                        <p className="text-gray-700 mt-2">
                            We have received your order and will process it shortly.
                        </p>
                        <p className="text-gray-700">
                            Your order number is: <span className="font-semibold">{bill.orderCode}</span>
                        </p>
                        <p className="text-gray-700">
                            An invoice has been sent to your email address.
                        </p>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-300">
                        <ListItemsOrder bill={bill} />
                    </div>
                    <div className="px-6 py-4 border-t border-gray-300">
                        <h3 className="text-xl font-bold text-gray-800">Shipping Address</h3>
                        <div className="mt-2">
                            <p className="text-gray-700">Name: {bill.name}</p>
                            <p className="text-gray-700">Email: {bill.email}</p>
                            <p className="text-gray-700">Phone: {bill.phone}</p>
                            <p className="text-gray-700">Address: {bill.address}</p>
                            <p className="text-gray-700">status: {bill.status}</p>
                            <p className="text-[red]">total: ${bill.total}</p>
                        </div>
                    </div>
                </div>
            )
        })}
        </>
    )
}
export default ListBill