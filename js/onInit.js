window.onload = function () {

  let titleHeader = document.getElementById("title-header");
  let misProductosTitulo = document.getElementById("misProductosTitulo");
  let agregarProductoTitulo = document.getElementById("agregarProductoTitulo");
  let nombreForm = document.getElementById("nombreForm");
  let priceForm = document.getElementById("priceForm");
  let submitBtn = document.getElementById("submit__btn");
  let resetBtn = document.getElementById("reset__btn");
  let imagenForm = document.getElementById("imagenForm");
  let footerTitle = document.getElementById("footer__title");
  let footerCopyright = document.getElementById("footer__copyright");
  let footerAluraMsg = document.getElementById("footer__alura__msg");
  let imgAluraGeek = document.querySelectorAll(".alura_geek_logo");

  fetch("../labels.json")
    .then((response) => response.json()) // Convierte la respuesta en formato JSON
    .then((data) => {
      titleHeader.innerHTML = data.titleHeader;
      misProductosTitulo.innerHTML = data.misProductosTitulo;
      agregarProductoTitulo.innerHTML = data.agregarProductoTitulo;  
      nombreForm.placeholder = data.nombreFormPlaceholder;
      priceForm.placeholder = data.precioFormPlaceholder;
      submitBtn.innerHTML = data.submitBtn;
      resetBtn.innerHTML = data.resetBtn;
      imagenForm.placeholder = data.imagenFormPlaceholder;
      footerTitle.innerHTML = data.titleHeader;
      footerCopyright.innerHTML = data.copyrightFooter;
      footerAluraMsg.innerHTML = data.footerAluraMsg;
      imgAluraGeek.forEach((img) => {
        img.src = data.srcHeaderImg;
      })
    })
    .catch((error) => {
      alert.error("Error al cargar los datos:", error);
    });
};
