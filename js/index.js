//redirige al usuario a "products.html" y almacena los valores en el localStorage segun la categoria que se haya activado el addEventListener
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    localStorage.setItem("catName", "Autos")
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    localStorage.setItem("catName", "Juguetes");
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    localStorage.setItem("catName", "Muebles");
    window.location = "products.html";
  });
});
