import React, { useEffect, useState } from "react";
import API from "../api";

function ProductForm({ editingProduct, setEditingProduct, refreshProducts }) {

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: ""
  });

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingProduct) {
      await API.put(`/products/${editingProduct._id}`, form);
      setEditingProduct(null);
    } else {
      await API.post("/products", form);
    }

    setForm({
      name: "",
      category: "",
      price: "",
      stock: ""
    });
    refreshProducts();

  };

  return (
    <form onSubmit={handleSubmit}>

      <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
      <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
      <select name="category" value={form.category} onChange={handleChange} required>
        <option value="">Select Category</option>
        <option>Electronics</option>
        <option>Books</option>
        <option>Clothing</option>
        <option>Groceries</option>
      </select>
      <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
      <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required />
      <button type="submit">{editingProduct ? "Update" : "Add"}</button>
    </form>
  );
}

export default ProductForm;