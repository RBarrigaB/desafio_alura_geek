import { productosAPI } from "./productos.js";

const listaProductos = document.querySelector("[productos-lista]");

const crearCard = (titulo, precio, path) => {
  const producto = document.createElement("li");
  console.log("Veo el path: ",path)
  producto.innerHTML = `
    <div class="card">
      <button class="delete-icon">&times;</button>
      <img src="${path}" alt="${titulo}">
      <p>${titulo}</p>
      <p>$ ${precio}</p>
    </div>`;
  return producto;
};

const listarProductos = async () => {
  listaProductos.innerHTML = '';
  await productosAPI.listarProductos()
    .then((list) => {
      list.forEach(producto => {
        console.log("Path?: ",typeof producto.path)
        listaProductos.appendChild(crearCard(producto.titulo, producto.precio, producto.path));
      });
    })
    .catch((error) => {
      console.error("Error al listar los productos: ", error);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("Evento DOMContentLoaded disparado");
  listarProductos();
});
