export default function ListItems() {
  const products = [
    {
      id: 1,
      name: "Kid Tapered Slim Fit Trouser",
      category: "Kids",
      price: 38,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Men Round Neck Pure Cotton T-shirt",
      category: "Men",
      price: 64,
      image: "/placeholder.svg?height=80&width=80",
    },
    // Add more products as needed
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">All Products List</h1>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Image</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">
                  <button className="text-gray-500 hover:text-red-500">X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

