window.onload = function () {

  let titleHeader = document.getElementById("title-header");
  let misProductosTitulo = document.getElementById("misProductosTitulo");
  let agregarProductoTitulo = document.getElementById("agregarProductoTitulo");

  fetch("../labels.json")
    .then((response) => response.json()) // Convierte la respuesta en formato JSON
    .then((data) => {
      titleHeader.innerHTML = data.titleHeader;
      misProductosTitulo.innerHTML = data.agregarProductoTitulo;
      agregarProductoTitulo.innerHTML = data.misProductosTitulo;  
    })
    .catch((error) => {
      alert.error("Error al cargar los datos:", error);
    });
};
