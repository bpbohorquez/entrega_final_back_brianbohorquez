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
  // let products = await productModel.find().lean();
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

  console.log({ products });
  res.render("productsview", { products });
});

router.get("/cartsview", async (req, res) => {
  let carts = await cartModel.find().lean();
  res.render("cartsview", { carts });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

export default router;
