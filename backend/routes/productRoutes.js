import express from "express"

import {createProduct,getProducts,getProductById,updateProduct,deleteProduct,orderProduct} from "../controllers/productController.js"

const router  =express.Router()

router.post("/products", createProduct);

router.get("/products", getProducts);

router.get("/products/:id", getProductById);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

router.patch("/products/order/:id", orderProduct);

export default router