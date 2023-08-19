// products.js
document.addEventListener("DOMContentLoaded", function () {
    const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";
    const productList = document.querySelector("#product-list");
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al hacer la solicitud.");
        }
        return response.json();
      })
      .then(data => {
        const products = data.products;
  
         products.forEach(product => {
          const productItem = document.createElement("div");
          productItem.classList.add("product-item");
  
          productItem.innerHTML = 
           `
            <img src="${product.image}" alt="${product.name}">
            <h2 id="encabezado">${product.name}</h2>
            <p id="Descripción">${product.description}</p>
            <div id="testeo">
              <p><b>Precio:</b> ${product.cost} ${product.currency}</p>
              <p><b>Vendidos:</b> ${product.soldCount}</p>
              <div id="botonCarrito">
              <button id="carritoCompras"><b><span>Comprar</span></b></button>
              <div class='testeo10'></div>
              </div>
            </div>
            `
          ;
  
          productList.appendChild(productItem);
        });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  });