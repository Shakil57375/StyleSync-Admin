import { useState } from "react"
import { useForm } from "react-hook-form"

const BACKEND_URL = "http://localhost:5000"

export default function AddItems() {
  const [imageFiles, setImageFiles] = useState(Array(4).fill(null))
  const [imagePreviews, setImagePreviews] = useState(Array(4).fill(null))
  const [sizes, setSizes] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const handleSizeToggle = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size))
    } else {
      setSizes([...sizes, size])
    }
  }

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0]
    if (file) {
      const newImageFiles = [...imageFiles]
      newImageFiles[index] = file
      setImageFiles(newImageFiles)

      const previewUrl = URL.createObjectURL(file)
      const newImagePreviews = [...imagePreviews]
      newImagePreviews[index] = previewUrl
      setImagePreviews(newImagePreviews)
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitMessage("")

    const formData = new FormData()
    formData.append("name", data.productName)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("category", data.category)
    formData.append("subCategory", data.subCategory)
    formData.append("sizes", JSON.stringify(sizes))
    formData.append("bestseller", data.isBestseller ? "true" : "false")
    formData.append("latestProduct", "false") // Assuming this is not user-selectable

    imageFiles.forEach((file, index) => {
      if (file) {
        formData.append(`image${index + 1}`, file)
      }
    })

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${BACKEND_URL}/api/product/add`, {
        method: "POST",
        body: formData,
        Authorization: `Bearer ${token}`,  // ✅ Include the token
        // Note: Don't set Content-Type header, let the browser set it for FormData
      })

      const result = await response.json()

      if (result.success) {
        setSubmitMessage("Product added successfully!")
        reset() // Reset the form
        setImageFiles(Array(4).fill(null))
        setImagePreviews(Array(4).fill(null))
        setSizes([])
      } else {
        setSubmitMessage("Failed to add product: " + result.message)
      }
    } catch (error) {
      setSubmitMessage("An error occurred while adding the product.")
      console.error("Error adding product:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Upload Image</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {imagePreviews.map((preview, index) => (
          <div
            key={index}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-pink-500 relative"
            style={{ height: "200px" }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, index)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="Upload image"
            />
            {preview ? (
              <img
                src={preview || "/placeholder.svg"}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Upload
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Product name</label>
          <input
            {...register("productName", { required: "Product name is required" })}
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-pink-500"
            placeholder="Type here"
          />
          {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Product description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-pink-500"
            placeholder="Write content here"
            rows="4"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Product category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-pink-500"
            >
              <option value="">Select category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Sub category</label>
            <select
              {...register("subCategory", { required: "Sub category is required" })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-pink-500"
            >
              <option value="">Select sub-category</option>
              <option value="topwear">Topwear</option>
              <option value="bottomwear">Bottomwear</option>
              <option value="footwear">Footwear</option>
            </select>
            {errors.subCategory && <p className="text-red-500 text-sm mt-1">{errors.subCategory.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Product Price</label>
            <input
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              })}
              type="number"
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-pink-500"
              placeholder="25"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Product Sizes</label>
          <div className="flex gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                type="button"
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
          {sizes.length === 0 && <p className="text-red-500 text-sm mt-1">Please select at least one size</p>}
        </div>

        <div className="flex items-center">
          <input type="checkbox" id="bestseller" {...register("isBestseller")} className="mr-2" />
          <label htmlFor="bestseller">Add to bestseller</label>
        </div>

        {submitMessage && (
          <div
            className={`p-2 rounded ${submitMessage.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {submitMessage}
          </div>
        )}

        <button
          type="submit"
          className="bg-black text-white px-8 py-2 rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
          disabled={isSubmitting || sizes.length === 0}
        >
          {isSubmitting ? "Adding..." : "ADD"}
        </button>
      </div>
    </form>
  )
}

