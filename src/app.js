import express from "express";
import path from "path";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import fs from "fs";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import { readFileSync } from "fs";

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

// Endpoints
app.use("/", productsRouter);
app.use("/", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  let dataProductos = readFileSync("productos.json", "utf8");

  const listaProductos = JSON.parse(dataProductos);

  socket.on("productos", () => {
    socketServer.emit("products", listaProductos);
  });
});
