import express from "express";
import { Router } from "express";
const router = Router();
import { readFileSync, writeFileSync } from "fs";
import productModel from "../models/producto.model.js";
import cartModel from "../models/carrito.model.js";

// POST Crear carrito
router.post("/carts", (req, res) => {
  const { products } = req.body;

  let data = readFileSync("carrito.json", "utf8");

  const carts = JSON.parse(data);

  const id = carts.length + 1;

  carts.push({ id, products });

  writeFileSync("carrito.json", JSON.stringify(carts, null, 2));

  res.json({ id, products });
});

// GET Listar productos del carrito según id
// router.get("/carts/:id", (req, res) => {
//   let data = readFileSync("carrito.json", "utf8");

//   const carts = JSON.parse(data);

//   const paramId = parseInt(req.params.id);

//   const cart = carts.find((p) => p.id === paramId);

//   if (cart) {
//     res.json(cart.products);
//   } else {
//     res.status(404).json({ message: "Carrito no encontrado" });
//   }
// });

router.get("/carts/:id", async (req, res) => {
  let cartId = req.params;

  let cart = await cartModel
    .findOne({ _id: cartId })
    .populate("products.product");
  // IMPLEMENTAR PRE (MONGO AVANZADO I)
  res.send({ status: "success", payload: cart });
});

// POST Agregar productos a un carrito
// router.post("/carts/:cid/product/:pid", (req, res) => {
//   let data = readFileSync("carrito.json", "utf8");
//   let dataP = readFileSync("productos.json", "utf8");

//   let carts = JSON.parse(data);
//   let products = JSON.parse(dataP);

//   const paramCartId = parseInt(req.params.cid);
//   const paramProductId = parseInt(req.params.pid);

//   let cartProducts = carts.find((p) => p.id === paramCartId).products;

//   let lookProduct = products.find((p) => p.id === paramProductId);

//   cartProducts.push({ product: paramProductId, quantity: 1 });

//   if (cartProducts && lookProduct) {
//     writeFileSync("carrito.json", JSON.stringify(carts, null, 2));

//     res.json("Producto agregado al carrito exitosamente");
//   } else {
//     res.status(404).json({ message: "Producto no encontrado" });
//   }
// });

router.put("/carts/:cid/product/:pid", async (req, res) => {
  let productId = req.params.pid;
  let cartId = req.params.cid;

  let cartUpdate = await cartModel.findOne({ _id: cartId });

  cartUpdate.products.push({ product: productId });

  let result = await cartModel.updateOne({ _id: cartId }, cartUpdate);

  res.send({ status: "success", payload: result });
});

export default router;
