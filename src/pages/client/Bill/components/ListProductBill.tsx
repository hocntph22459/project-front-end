type Props = {
    order: any
}
const ListProductBill = (props: Props) => {
    return (
        <div className="rounded-lg md:w-2/3">
            {props.order.items.map((cart: any) => {
                return (
                    <div key={cart._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                        <img
                            src={cart.image}
                            alt="product-image"
                            className="w-full rounded-lg sm:w-40"
                        />
                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                            <div className="mt-5 sm:mt-0">
                                <h2 className="text-lg font-bold text-gray-900">
                                    {cart.name}
                                </h2>
                                <p className="mt-1 text-xs text-gray-700">Size: {cart.size}</p>
                            </div>
                            <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                <div className="flex items-center border-gray-100">
                                    <p>
                                        Quantity: {cart.quantity}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <p className="text-sm font-bold text-[red]">$
                                        {cart.price}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListProductBill