export default function Orders() {
  const orders = [
    {
      id: 1,
      product: "Men Round Neck Pure Cotton T-shirt x 1L",
      customer: "shubham Bhardwaj",
      address: {
        line1: "S,",
        line2: "Sonipat, Haryana, Dd, 123123"
      },
      items: 1,
      price: 74,
      method: "COD",
      payment: "Pending",
      date: "2/2/2025",
      status: "Shipped"
    },
    {
      id: 2,
      product: "Men Round Neck Pure Cotton T-shirt x 1L",
      customer: "shubham Bhardwaj",
      address: {
        line1: "S,",
        line2: "Sonipat, Haryana, Dd, 12"
      },
      items: 1,
      price: 74,
      method: "COD",
      payment: "Pending",
      date: "2/2/2025",
      status: "Order Placed"
    },
    {
      id: 3,
      product: "Boy Round Neck Pure Cotton T-shirt x 1L",
      customer: "test test",
      address: {
        line1: "test,",
        line2: "test, test, test, 44444"
      },
      items: 1,
      price: 70,
      method: "COD",
      payment: "Pending",
      date: "2/2/2025",
      status: "Order Placed"
    }
  ];

  const statusOptions = [
    "Order Placed",
    "Packing",
    "Shipped",
    "Out for delivery",
    "Delivered"
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl text-gray-600 mb-6">Order Page</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded border">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{order.product}</h3>
                  <p className="text-gray-600 mt-1">{order.customer}</p>
                  <p className="text-gray-600">{order.address.line1}</p>
                  <p className="text-gray-600">{order.address.line2}</p>
                </div>
              </div>

              <div className="text-right space-y-1">
                <p className="text-gray-600">Items : {order.items}</p>
                <p className="text-gray-600">Method : {order.method}</p>
                <p className="text-gray-600">Payment : {order.payment}</p>
                <p className="text-gray-600">Date : {order.date}</p>
              </div>

              <div className="text-right min-w-[100px]">
                <p className="font-medium text-gray-800 mb-2">${order.price}</p>
                <select
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 bg-white"
                  defaultValue={order.status}
                >
                  {statusOptions.map((status) => (
                    <option 
                      key={status} 
                      value={status}
                      className={status === "Order Placed" ? "bg-blue-500 text-white" : ""}
                    >
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}