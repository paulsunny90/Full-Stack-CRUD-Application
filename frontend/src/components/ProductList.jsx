import React, { useState, useEffect } from "react";
import API from "../api";

const ProductList = () => {

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);


  const fetchProducts = async () => {
    try {
      let url = "/products?";

      if (category) url += `category=${category}&`;
      if (sort) url += `sort=${sort}`;

      const res = await API.get(url);
      setProducts(res.data);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, [category, sort]);


  const handleEdit = (product) => {
    setEditingProduct(product);
  };


  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const orderProduct = async (id) => {
    try {
      await API.patch(`/products/order/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Order failed:", error);
    }
  };

  return (
    <div>

      <h2>Product List</h2>

      
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Books">Books</option>
        <option value="Clothing">Clothing</option>
        <option value="Groceries">Groceries</option>
      </select>
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort</option>
        <option value="low">Price Low → High</option>
        <option value="high">Price High → Low</option>
        <option value="latest">Latest</option>
      </select>
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>

              <td>{p.name}</td>

              <td>{p.category}</td>

              <td>{p.price}</td>

              <td>
                {p.stock === 0 ? "Out of Stock" : p.stock}

                {p.stock < 5 && p.stock > 0 && (
                  <span style={{ color: "red" }}>
                    {" "}Low
                  </span>
                )}
              </td>

              <td>

                <button onClick={() => handleEdit(p)}>
                  Edit
                </button>

                <button onClick={() => deleteProduct(p._id)}>
                  Delete
                </button>

                <button
                  disabled={p.stock === 0}
                  onClick={() => orderProduct(p._id)}
                >
                  Order
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default ProductList;