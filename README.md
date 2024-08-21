# ENTREGA FINAL BACKEND I - BRIAN BOHORQUEZ

Entrega final del curso de desarrollo de Backend I - Estudiante: Brian Bohorquez Sanchez. En este proyecto se desarrollaron los endpoints correspondientes a los productos y carritos de un marketplace

## Instructivo:

- Para ejecutar el proyecto se requiere clonar el repositorio (git clone https://github.com/bpbohorquez/entrega_final_back_brianbohorquez.git). El proyecto corre en el puerto 8080 por defecto
- Los diferentes endpoints para los productos y carritos se encuentran dentro de src/routes. Estos corresponden a los endpoints /products y /carts
- La página de visualización para todos los productos se encuentra en la dirección: http://localhost:8080/productsview. Cada producto cuenta con una página de detalle: http://localhost:8080/productsview/:productid
- La página de visualización para el carrito se encuentra en la dirección: http://localhost:8080/cartsview

## Endpoints API /products:

- GET: Obtener todos los productos
- GET: Obtener producto por ID
- POST: Crear nuevos productos
- PUT: Actualizar información de producto
- DELETE: Eliminar productos

## Endpoints API /carts:

- POST: Crear carrito
- GET: Obtener carrito según id
- GET: Obtener todos los carritos
- PUT: Actualizar producto de un carrito
- PUT: Actualizar carrito
- DELETE: Eliminar carrito
- DELETE: Eliminar producto de carrito

## Tecnolgías:

- Express
- NODE JS
- Handlebars
- MongoDB
- Mongoose
