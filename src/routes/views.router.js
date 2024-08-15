import express from "express";
import { Router } from "express";
const router = Router();
import { readFileSync, writeFileSync } from "fs";
import productModel from "../models/producto.model.js";
import mongoose from "mongoose";

router.get("/", async (req, res) => {
  let products = await productModel.find();
  res.render("home", {});
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

export default router;
