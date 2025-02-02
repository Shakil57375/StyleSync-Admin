export default function Orders() {
  const orders = [
    {
      id: 1,
      product: "Men Round Neck Pure Cotton T-shirt x 1L",
      customer: "Shubham Bhardwaj",
      address: "S, Sonipat, Haryana, Dd, 123123",
      items: 1,
      price: 74,
      method: "COD",
      payment: "Pending",
      date: "2/2/2025",
      status: "Shipped",
    },
    // Add more orders as needed
  ]

  const statusOptions = ["Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered"]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Order Page</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-lg shadow">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-4 rounded">📦</div>
                  <div>
                    <h3 className="font-medium">{order.product}</h3>
                    <p className="text-gray-600">{order.customer}</p>
                    <p className="text-gray-600">{order.address}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="space-y-2">
                  <p>Items: {order.items}</p>
                  <p>Method: {order.method}</p>
                  <p>Payment: {order.payment}</p>
                  <p>Date: {order.date}</p>
                  <p className="font-medium">${order.price}</p>

                  <select
                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-pink-500"
                    defaultValue={order.status}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

