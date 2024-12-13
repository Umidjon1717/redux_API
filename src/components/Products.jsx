import React, { useEffect, useState } from "react";
import { request } from "@/api";
import { useSelector } from "react-redux";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });
  
  
  const token = useSelector((s) => s.token.value);

  useEffect(() => {
    request
      .get("product/get")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (productId) => {
    request
      .delete(`/product/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedData = {
      ...formData,
      price: Number(formData.price),
    };
  
    request
      .patch(`/product/update/${editingProduct.id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const updatedProducts = products.map((product) =>
          product.id === editingProduct.id ? response.data : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
      })
      .catch((error) => {
        console.error("Error updating product:", error.response?.data || error.message);
      });
  };
  
  

  if (loading) {
    return <div>Loading products...</div>;
  }

  const productItems = products.map((product) => (
    <div
      key={product.id}
      className="w-full sm:w-80 p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
    >
      <img
        src={product.image}
        className="w-full h-60 object-cover rounded-t-md"
        alt={product.name}
      />
      <div className="mt-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="mt-1 text-gray-600">${product.price}</p>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => {
            setEditingProduct(product);
            setFormData({
              name: product.name,
              price: product.price,
              image: product.image,
            });
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(product.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-wrap gap-6 justify-center container mx-auto p-6">
      {productItems}

      {editingProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-md shadow-md max-w-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                required
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Products;
