import express from "express";
import { Router } from "express";
const router = Router();
import { readFileSync, writeFileSync } from "fs";

router.get("/", (req, res) => {
  let data = readFileSync("productos.json", "utf8");

  const products = JSON.parse(data);

  res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

export default router;
