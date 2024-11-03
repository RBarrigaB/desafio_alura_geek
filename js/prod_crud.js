import { listarProductos, crearProducto, eliminarProducto } from "../js/api.js";

const listaProductos = document.querySelector("[productos-lista]");
const formProducto = document.getElementById("form-producto");
const resetBtn = document.getElementById("reset__btn");
const jsonLabels = fetch("../labels.json").then((response) => response.json());

const crearCard = (id, titulo, precio, path) => {
  const producto = document.createElement("li");
  producto.innerHTML = `
    <div class="card">
      <button class="delete-icon" onclick="eliminarProd(${id},'${titulo}')"><i class="fas fa-trash-alt"></i></button>
      <img src="${path}" alt="${titulo}">
      <p class="p__name">${titulo}</p>
      <p>$ ${precio}</p>
      <p hidden class="p__id">${id}</p>
    </div>`;
  return producto;
};

const mostrarProductos = async () => {
  try {
    const productos = await listarProductos();
    listaProductos.innerHTML = "";
    productos.forEach((producto) => {
      const { id, name, price, image } = producto;
      listaProductos.appendChild(crearCard(id, name, price, image));
    });
  } catch (error) {
    console.error("Error al listar los productos: ", error);
  }
};

formProducto.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nameC = event.target.name.value;
  const priceC = event.target.price.value;
  const imageFile = event.target.image.files[0];
  try {
    const nuevoProducto = await crearProducto(nameC, priceC, imageFile);
    const { name, price, image } = nuevoProducto;
    listaProductos.appendChild(crearCard(name, price, image));
    formProducto.reset();
    mostrarPopupExito("crear");
  } catch (error) {
    mostrarPopupFallido("crear");
    console.error("Creación de producto fallida", error);
  }
});

resetBtn.addEventListener("click", async () => {
  formProducto.reset();
})

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
});

window.eliminarProd = async (id,name) => {
  if (
    confirm(`Está seguro que desea eliminar el producto: ${name}`) == true) {
    try {
      await eliminarProducto(id);
      mostrarProductos();
      mostrarPopupExito("eliminar");
    } catch (error) {
      mostrarPopupFallido("eliminar");
      console.error("Error al eliminar el producto: ", error);
    }
  }
};

const mostrarPopupExito = async (accion) => {
  const popup = document.getElementById("successPopup");

   await jsonLabels.then((data => {
      popup.innerHTML = (accion === "crear")
      ? data.productoCreadoExitosamente
      : (accion === "eliminar") ? data.productoEliminadoExitosamente
      : "";
    }));
 
  popup.classList.add("show");
  
  setTimeout(() => {
      popup.classList.remove("show");
  }, 8000);
}

const mostrarPopupFallido = async (accion) => {
  const popup = document.getElementById("failedPopup");

 await jsonLabels.then((data => {
    popup.innerHTML = (accion === "crear")
    ? data.productoCreadoFallido
    : (accion === "eliminar") ? data.productoEliminadoFallido
    : "";
  }));
  
  popup.classList.add("show");
  
  setTimeout(() => {
      popup.classList.remove("show");
  }, 8000);
}
