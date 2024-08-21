import express from "express";
import { Router } from "express";
const router = Router();
import { readFileSync, writeFileSync } from "fs";
import productModel from "../models/producto.model.js";
import mongoose from "mongoose";
import cartModel from "../models/carrito.model.js";

router.get("/", async (req, res) => {
  res.render("home");
});

router.get("/productsview", async (req, res) => {
  let pageQuery = parseInt(req.query.page);

  if (!pageQuery) {
    pageQuery = 1;
  }

  let products = await productModel.find().paginate({
    limit: 10,
    page: pageQuery,
  });

  products.prevLink = products.hasPrevPage
    ? `http://localhost:8080/productsview?page=${products.prevPage}`
    : "";

  products.nextLink = products.hasNextPage
    ? `http://localhost:8080/productsview?page=${products.nextPage}`
    : "";

  let productsObjects = await productModel
    .find()
    .lean()
    .limit(10)
    .skip((pageQuery - 1) * 10);
  products.productsObjects = productsObjects;

  res.render("productsview", { products });
});

router.get("/cartsview", async (req, res) => {
  let carts = await cartModel.find().lean();
  res.render("cartsview", { carts });
});

router.get("/productsview/:pid", async (req, res) => {
  let paramId = req.params.pid;

  let product = await productModel.findOne({ _id: paramId }).lean();

  res.render("singleproductview", { product });
});

export default router;
