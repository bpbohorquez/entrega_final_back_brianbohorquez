const socket = io();
let idDelete = document.getElementById("idDelete");
let botonDelete = document.getElementById("botonDelete");

botonDelete.addEventListener("click", (e) => {
  socket.emit("deleteProduct", { id: idDelete.value });
  window.location.reload();
});

socket.emit("productos", {});

socket.on("products", (data) => {
  let productsView = document.getElementById("productsView");
  let listaProductos = "";

  data.forEach((element) => {
    listaProductos =
      listaProductos +
      `ID#${element.id}. Titulo: ${element.title}, Descripcion: ${element.description}, Codigo: ${element.code}, Precio: ${element.price}, Status: ${element.status}, Stock: ${element.stock}, Categoria: ${element.category}, Thumbnails: ${element.thumbnails} <br>`;
  });

  productsView.innerHTML = listaProductos;
});
