import { request } from '@/api'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'



const ProductCreate = () => {
  const token = useSelector((s) => s.token.value)
  const [categories, setCategories] = useState(null)

  
  useEffect(() => {
    request.get('/product-category/get').then((res) => {
      setCategories(res.data)
    })
  }, [])

  const handleCreateProduct = (e) => {
    e.preventDefault()
    let formData = new FormData(e.target)
    const product = Object.fromEntries(formData)

    product.price = +product.price
    product.categoryId = +product.categoryId
    product.stock = +product.stock
    product.average_rating = 0

    request.post('/product/create', product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Product</h2>
      <form
        onSubmit={handleCreateProduct}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 focus:outline-none"
            type="text"
            name="name"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 focus:outline-none"
            name="description"
            rows="4"
            placeholder="Enter product description"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price
          </label>
          <input
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 focus:outline-none"
            type="number"
            name="price"
            placeholder="Enter price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 focus:outline-none"
            type="text"
            name="image"
            placeholder="Enter image URL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 focus:outline-none"
            name="categoryId"
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock
          </label>
          <input
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 focus:outline-none"
            type="number"
            name="stock"
            placeholder="Enter stock quantity"
          />
        </div>

        <div className="md:col-span-2">
          <button
            className="w-full bg-blue-500 text-white font-semibold rounded-md p-3 hover:bg-blue-600 transition duration-300"
            type="submit"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductCreate
