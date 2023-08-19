// products.js
document.addEventListener("DOMContentLoaded", function () {
  const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";
  const productList = document.querySelector("#product-list");

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al hacer la solicitud.");
      }
      return response.json();
    })
    .then((data) => {
      const products = data.products;

      products.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");

        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2 class="encabezado">${product.name}</h2>
            <div class="product-gradiant"></div>
            <p class="precio-producto">$${product.cost} ${product.currency}</p>
            <p class="descripcion-producto">${product.description}</p>
            <button class="boton-producto">Comprar</button>
            <p class="vendidos-producto">Vendidos: ${product.soldCount}</p>
            `;

        productList.appendChild(productItem);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
