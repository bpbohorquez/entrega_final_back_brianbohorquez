import express from "express";
import { Router } from "express";
const router = Router();
import { readFileSync, writeFileSync } from "fs";
import productModel from "../models/producto.model.js";
import mongoose from "mongoose";

// Get todos los productos
// router.get("/products", (req, res) => {
//   let data = readFileSync("productos.json", "utf8");

//   const products = JSON.parse(data);

//   let limit = parseInt(req.query.limit);

//   if (limit) {
//     res.json(products.slice(0, limit));
//   } else {
//     res.json(products);
//   }
// });

// CHECK ESTE YA SIRVE:
router.get("/products", async (req, res) => {
  // ESTO ES ANTES DE PAGINATE:
  //
  // try {
  //   let products = await productModel.find();

  //   let products1 = products.paginate()

  //   res.send({ result: "success", payload: products });
  // } catch (error) {
  //   console.error(error);
  // }
  // //
  // CON PAGINATE:
  //

  let limitQuery = parseInt(req.query.limit);
  let pageQuery = parseInt(req.query.page);
  let categoryQuery = req.query.category;
  let sortQuery = req.query.sort;

  if (!limitQuery) {
    limitQuery = 10;
  }

  if (!pageQuery) {
    pageQuery = 1;
  }

  if (sortQuery == "asc") {
    sortQuery = "price";
  } else if (sortQuery == "desc") {
    sortQuery = "-price";
  } else {
  }

  try {
    if (sortQuery) {
      if (categoryQuery) {
        let products = await productModel
          .find({ category: categoryQuery })
          .paginate({
            sort: sortQuery,
            limit: limitQuery,
            page: pageQuery,
          });

        res.send({ status: "success", payload: products });
      } else {
        let products = await productModel.find().paginate({
          sort: sortQuery,
          limit: limitQuery,
          page: pageQuery,
        });

        res.send({ status: "success", payload: products });
      }
    } else {
      if (categoryQuery) {
        let products = await productModel
          .find({ category: categoryQuery })
          .paginate(
            { category: "Category_A" },
            {
              limit: limitQuery,
              page: pageQuery,
            }
          );

        res.send({ status: "success", payload: products });
      } else {
        let products = await productModel.find().paginate({
          limit: limitQuery,
          page: pageQuery,
        });
        res.send({ status: "success", payload: products });
      }
    }
  } catch (error) {
    console.error(error);
  }
});

// Get producto por ID
// CHECK YA SIRVE:
router.get("/products/:id", async (req, res) => {
  // let data = readFileSync("productos.json", "utf8");

  // const products = JSON.parse(data);

  // const paramId = parseInt(req.params.id);

  // const product = products.find((p) => p.id === paramId);

  // if (product) {
  //   res.json(product);
  // } else {
  //   res.status(404).json({ message: "Producto no encontrado" });
  // }

  let paramId = req.params.id;

  let product = await productModel.findOne({ _id: paramId });

  res.send({ status: "success", payload: product });
});

// POST agregar nuevos productos

// router.post("/products", (req, res) => {
//   const {
//     title,
//     description,
//     code,
//     price,
//     status,
//     stock,
//     category,
//     thumbnails,
//   } = req.body;

//   let data = readFileSync("productos.json", "utf8");

//   const products = JSON.parse(data);

//   const id = products.length + 1;

//   const newProduct = {
//     id,
//     title,
//     description,
//     code,
//     price,
//     status,
//     stock,
//     category,
//     thumbnails: req.body.thumbnails ?? [],
//   };

//   products.push(newProduct);

//   writeFileSync("productos.json", JSON.stringify(products, null, 2));

//   res.json(newProduct);
// });

// CHECK, SIRVE BIEN:
router.post("/products", async (req, res) => {
  let { title, description, code, price, status, stock, category, thumbnails } =
    req.body;

  console.log(req.body);

  let result = await productModel.create({
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  });

  res.send({ status: "success", payload: result });
});

// PUT actualizar información de producto
// router.put("/products/:id", (req, res) => {
//   const {
//     title,
//     description,
//     code,
//     price,
//     status,
//     stock,
//     category,
//     thumbnails,
//   } = req.body;

//   let data = readFileSync("productos.json", "utf8");

//   let products = JSON.parse(data);

//   const paramId = parseInt(req.params.id);

//   let product = products.find((p) => p.id === paramId);

//   if (product) {
//     const id = paramId;

//     const updatedProduct = {
//       id,
//       title,
//       description,
//       code,
//       price,
//       status,
//       stock,
//       category,
//       thumbnails: req.body.thumbnails ?? [],
//     };

//     product = updatedProduct;
//     writeFileSync("productos.json", JSON.stringify(products, null, 2));
//     res.json(product);
//   } else {
//     res.status(404).json({ message: "Producto no encontrado" });
//   }
// });

// CHECK ESTE YA SIRVE
router.put("/products/:id", async (req, res) => {
  let { id } = req.params;

  let productReplace = req.body;

  let result = await productModel.updateOne({ _id: id }, productReplace);
  res.send({ status: "success", payload: result });
});

// DELETE Eliminar producto
// router.delete("/products/:id", (req, res) => {
//   let data = readFileSync("productos.json", "utf8");

//   let products = JSON.parse(data);

//   const paramId = parseInt(req.params.id);

//   products = products.filter((p) => p.id !== paramId);

//   writeFileSync("productos.json", JSON.stringify(products, null, 2));
//   res.json({ message: `Producto con id ${paramId} eliminado correctamente` });
// });

// CHECK ESTE YA SIRVE
router.delete("/products/:id", async (req, res) => {
  let { id } = req.params;

  let result = await productModel.deleteOne({ _id_: id });

  res.send({ status: "success", payload: result });
});

export default router;
