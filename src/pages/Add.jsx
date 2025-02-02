import { useState } from "react"

export default function AddItems() {
  const [images, setImages] = useState(Array(4).fill(null))
  const [sizes, setSizes] = useState([])

  const handleSizeToggle = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size))
    } else {
      setSizes([...sizes, size])
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Upload Image</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {images.map((_, index) => (
          <div
            key={index}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-pink-500"
          >
            <div className="text-gray-400">Upload</div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Product name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-pink-500"
            placeholder="Type here"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Product description</label>
          <textarea
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-pink-500"
            placeholder="Write content here"
            rows="4"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Product category</label>
            <select className="w-full p-2 border rounded-lg focus:outline-none focus:border-pink-500">
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Sub category</label>
            <select className="w-full p-2 border rounded-lg focus:outline-none focus:border-pink-500">
              <option>Topwear</option>
              <option>Bottomwear</option>
              <option>Footwear</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Product Price</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-pink-500"
              placeholder="25"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Product Sizes</label>
          <div className="flex gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`px-4 py-2 rounded ${
                  sizes.includes(size) ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <input type="checkbox" id="bestseller" className="mr-2" />
          <label htmlFor="bestseller">Add to bestseller</label>
        </div>

        <button className="bg-black text-white px-8 py-2 rounded-lg hover:bg-gray-800">ADD</button>
      </div>
    </div>
  )
}

