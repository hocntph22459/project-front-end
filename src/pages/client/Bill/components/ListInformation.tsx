import React from 'react'

type Props = {
    order: any
}

const ListInformation = (props: Props) => {
    return (
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/2">
            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                <p className="text-xl font-medium">Payment Details</p>
                <p className="text-gray-400">
                    Complete your order by providing your payment details.
                </p>
                <div>
                    <h5>Name: {props.order.name}</h5>
                    <h5>Email: {props.order.email}</h5>
                    <h5>Phone: {props.order.phone}</h5>
                    <h5>Address: {props.order.address}</h5>
                    <h5>ngày đặt hàng: {props.order.createdAt}</h5>
                    <h5>Total: {props.order.total}</h5>
                </div>
            </div>
        </div>
    )
}

export default ListInformation