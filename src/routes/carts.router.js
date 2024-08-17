import express from "express";
import { Router } from "express";
const router = Router();
import { readFileSync, writeFileSync } from "fs";
import productModel from "../models/producto.model.js";
import cartModel from "../models/carrito.model.js";

// POST Crear carrito:
router.post("/carts", async (req, res) => {
  let { products } = req.body;

  try {
    let result = await cartModel.create({
      products,
    });

    res.send({ status: "success", payload: result });
  } catch (error) {
    console.error(error);
  }
});

// GET Listar productos del carrito según id

router.get("/carts/:id", async (req, res) => {
  let cartId = req.params.id;

  try {
    let cart = await cartModel
      .findOne({ _id: cartId })
      .populate("products.product");

    res.send({ status: "success", payload: cart });
  } catch (error) {
    console.error(error);
  }
});

// GET traer todos los carritos

router.get("/carts/", async (req, res) => {
  try {
    let cart = await cartModel.find().populate("products.product");

    res.send({ status: "success", payload: cart });
  } catch (error) {
    console.error(error);
  }
});

// PUT Actualizar productos a un carrito

router.put("/carts/:cid/product/:pid", async (req, res) => {
  let productId = req.params.pid;
  let cartId = req.params.cid;

  try {
    let cartUpdate = await cartModel.findOne({ _id: cartId });

    cartUpdate.products.push({ product: productId });

    let result = await cartModel.updateOne({ _id: cartId }, cartUpdate);

    res.send({ status: "success", payload: result });
  } catch (error) {
    console.error(error);
  }
});

// PUT actualizar carrito
router.put("/carts/:cid", async (req, res) => {
  let cartId = req.params.cid;
  let productArray = req.body.products;

  try {
    let cartUpdate = await cartModel.findOne({ _id: cartId });

    cartUpdate.products = productArray;

    let result = await cartModel.updateOne({ _id: cartId }, cartUpdate);

    res.send({ status: "success", payload: result });
  } catch (error) {
    console.error(error);
  }
});

// DELETE borrar productos del carrito:
router.delete("/carts/:id", async (req, res) => {
  let { cartId } = req.params;

  try {
    let cartUpdate = await cartModel.findOne({ _id: cartId });

    cartUpdate.products = [];

    let result = await cartModel.updateOne({ _id: cartId }, cartUpdate);

    res.send({ status: "success", payload: result });
  } catch (error) {
    console.error(error);
  }
});

// DELETE borrar producto de carrito

router.delete("/carts/:cid/product/:pid", async (req, res) => {
  let productId = req.params.pid;
  let cartId = req.params.cid;

  try {
    let cartUpdate = await cartModel.findOne({ _id: cartId });

    cartUpdate.products = cartUpdate.products.filter(
      (p) => p.product != productId
    );

    let result = await cartModel.updateOne({ _id: cartId }, cartUpdate);
    res.send({ status: "success", payload: result });
  } catch (error) {
    console.error(error);
  }
});

export default router;
