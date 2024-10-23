window.onload = function () {

  let titleHeader = document.getElementById("title-header");
  let misProductosTitulo = document.getElementById("misProductosTitulo");
  let agregarProductoTitulo = document.getElementById("agregarProductoTitulo");
  let nombreForm = document.getElementById("nombreForm");
  let priceForm = document.getElementById("priceForm");
  let imagenForm = document.getElementById("imagenForm");
  let copyright = document.getElementById("footer__copyright");

  fetch("../labels.json")
    .then((response) => response.json()) // Convierte la respuesta en formato JSON
    .then((data) => {
      titleHeader.innerHTML = data.titleHeader + '&#128311; &#128311; &#128311;';
      misProductosTitulo.innerHTML = data.misProductosTitulo;
      agregarProductoTitulo.innerHTML = data.agregarProductoTitulo;  
      nombreForm.placeholder = data.nombreFormPlaceholder;
      priceForm.placeholder = data.precioFormPlaceholder;
      imagenForm.placeholder = data.imagenFormPlaceholder;
      copyright.innerHTML = data.titleHeader + '&#128311; &#128311; &#128311; <br>' + data.copyrightFooter;
    })
    .catch((error) => {
      alert.error("Error al cargar los datos:", error);
    });
};
