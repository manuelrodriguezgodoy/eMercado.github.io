document.addEventListener("DOMContentLoaded", async () => {
  let radioEnvio = document.getElementById("formEnvio");

  const cartNavElement = document.createElement("li");
  cartNavElement.innerHTML = `
    <div class="container">
        <div class="btn-menu">
            <label for="btn-menu" class="nav-item">
                <a href="cart">
                    <i class="fa-solid fa-cart-shopping" style="color: #ffd6ff;"></i>
                </a>
            </label>
        </div>
    </div>
`;
  cartNavElement.classList.add("nav-item");
  cartNavElement.id = "cart-nav-li";

  //* Agregar elemento nav a navbar
  const navbar = document.getElementById("navlist");
  navbar.appendChild(cartNavElement);

 
  const agregarAlCarritoButton = document.getElementById(
    "agregarAlCarritoButton"
  );
  if (agregarAlCarritoButton) {
    agregarAlCarritoButton.addEventListener("click", fillSidebarCart);
  }
  getJSONData(cart_pre_hecho).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let productos =
        JSON.parse(localStorage.getItem("productosCarrito")) || [];
      resultObj.data.articles.forEach((element) => {
        if (!productos.includes(element.id)) {
          productos.push(element.id);
        }
      });
      //productos = { ...productos, [productoId]: resultObj.data.articles[0] };
      localStorage.setItem("productosCarrito", JSON.stringify(productos));

      // cart_productos = resultObj.data.articles;
      // subtotal_precio = cart_productos[0].unitCost;
      showCart().then(actualizarTotal());
    }
  });
  fillSidebarCart("lista-producto");
  loadProductIds();

  setTimeout(() => actualizarTotal(), 500);

  radioEnvio.addEventListener("click", () => {
    console.log("click");
    actualizarTotal();
  });
});

const cart_URL_base = "http://localhost:3000/user_cart/";
const cart_pre_hecho = cart_URL_base + "25801";
// const imagen_producto = document.getElementById("imagen-cart");
// const nombre_producto = document.getElementById("name-cart");
// const precio_producto = document.getElementById("cost-cart");
// const cantidad = document.getElementById("cantidad");
// const subtotal = document.getElementById("subtotal");
// const total_compra = document.getElementById("total");
// let cart_productos = [];
// let subtotal_precio = 0;

// document.addEventListener("DOMContentLoaded", function (e) {
//   cantidad?.addEventListener("change", actualizarSubtotal());
// });

async function showCart() {
  const listaProductosCompra = document.getElementById(
    "lista-productos-compra"
  );
  const productosCarritoRaw = await getJSONData('http://localhost:3000/cartdb')
  let productosCarrito = productosCarritoRaw.data.map(obj => obj.product)
  productosCarrito.forEach(async (elementid) => {
    let productoURL = `http://localhost:3000/products/${elementid}`;
    let productoFetch = await getJSONData(productoURL);
    let producto = productoFetch.data;

    const tableRow = document.createElement("tr");
    const tableDataImage = document.createElement("td");
    const imgProduct = document.createElement("img");
    imgProduct.src = producto.images[0];
    imgProduct.id = "img-cart";
    tableDataImage.appendChild(imgProduct);

    const tableDataNombre = document.createElement("td");
    const tableDataNombreText = document.createTextNode(producto.name);
    tableDataNombre.appendChild(tableDataNombreText);

    const tableDataCosto = document.createElement("td");
    const productoCosto = producto.cost || producto.unitCost;
    const tableDataCostoText = document.createTextNode(
      producto.currency + " " + productoCosto
    );
    tableDataCosto.appendChild(tableDataCostoText);
    tableDataCosto.id = `${producto.id}-costo`;

    const tableDataCantidad = document.createElement("td");
    const tableDataCantidadInput = document.createElement("input");
    tableDataCantidadInput.setAttribute("min", "1");
    tableDataCantidadInput.setAttribute("type", "number");
    tableDataCantidadInput.setAttribute("value", 1);
    tableDataCantidadInput.id = `${producto.id}-cantidad`;
    tableDataCantidadInput.classList.add("form-control");
    tableDataCantidadInput.classList.add("cantidad");
    tableDataCantidad.appendChild(tableDataCantidadInput);

    const tableDataSubtotal = document.createElement("td");
    tableDataSubtotal.id = `${producto.id}-subtotal`;
    const tableDataSubtotalText = document.createTextNode(
      producto.currency +
        " " +
        parseInt(productoCosto) * parseInt(tableDataCantidadInput.value)
    );

    tableDataSubtotal.appendChild(tableDataSubtotalText);

    //Agregando el bote de basura
    const tableDataBasura = document.createElement("td");
    const boteBasuraIcon = document.createElement("i");
    boteBasuraIcon.classList.add("fa-trash");
    boteBasuraIcon.classList.add("icono-basura-rojo");

    boteBasuraIcon.classList.add("fa");
    boteBasuraIcon.id = `${producto.id}-boteBasuraIcon`;

    tableDataBasura.appendChild(boteBasuraIcon);

    //Se appendea los datos para que aparezcan en el html
    tableRow.appendChild(tableDataImage);
    tableRow.appendChild(tableDataNombre);
    tableRow.appendChild(tableDataCosto);
    tableRow.appendChild(tableDataCantidad);
    tableRow.appendChild(tableDataSubtotal);
    tableRow.appendChild(tableDataBasura);

    listaProductosCompra.appendChild(tableRow);

    //Funcionalidad del boton de bote de basura
    let boteBasura = document.getElementById(`${producto.id}-boteBasuraIcon`);

    boteBasura.addEventListener("click", async () => {
      
      let data = {id: producto.id}

        fetch('http://localhost:3000/cartdb',{
          method: 'DELETE',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })


        tableRow.remove();
        actualizarTotal();

    });
  });

  // let { name, unitCost, currency, image } = cart_productos[0];
  // if (imagen_producto) {
  //   imagen_producto.innerHTML = `<img id=img-cart src="${image}" >`;
  // }
  // if (nombre_producto) {
  //   nombre_producto.innerHTML = `${name}`;
  // }
  // if (precio_producto) {
  //   precio_producto.innerHTML = `${currency} ${unitCost}`;
  // }
  // if (subtotal) {
  //   subtotal.innerHTML =
  //     currency + " " + parseInt(unitCost) * parseInt(cantidad.value);
  // }
}

const productIds = [];
function loadProductIds() {
  const productosCarrito =
    JSON.parse(localStorage.getItem("productosCarrito")) || {};

  productosCarrito.forEach((elementId) => {
    productIds.push(`${elementId}-cantidad`);
    console.log(productIds);
  });
}
document.addEventListener("click", function (e) {
  if (e.target && productIds.includes(e.target.id)) {
    actualizarSubtotal(e.target.id.slice(0, e.target.id.indexOf("-")));
    console.log(e.target.id);
    actualizarTotal();
  }
});

function actualizarSubtotal(id) {
  const subtotal = document.getElementById(`${id}-subtotal`);
  const cantidad = document.getElementById(`${id}-cantidad`);
  const costo = document.getElementById(`${id}-costo`);
  const costoValue = costo.innerHTML.slice(costo.innerHTML.indexOf(" "));
  const currency = subtotal.innerHTML.slice(0, subtotal.innerHTML.indexOf(" "));
  const textoSubtotal = document.createTextNode(
    currency + " " + cantidad.value * costoValue
  );
  if (subtotal) {
    subtotal.innerHTML = "";
    subtotal.appendChild(textoSubtotal);
  }
}

async function fillSidebarCart(idListElement) {
  const productosCarrito =
    JSON.parse(localStorage.getItem("productosCarrito")) || [];
  const sidebarUl = document.getElementById(idListElement);
  const subtotalSidebar = document.getElementById("subtotal-sidebar");
  sidebarUl.innerHTML = "";
  let subTotalSidebarAmount = 0;
  productosCarrito.forEach(async (elementid) => {
    let productoURL = `http://localhost:3000/products/${elementid}`;
    let productoFetch = await getJSONData(productoURL);
    let producto = productoFetch.data;
    const liElement = document.createElement("li");
    const imgProduct = document.createElement("img");
    imgProduct.src = producto.images[0];
    const productoCosto = producto.cost || producto.unitCost;
    const productCost = document.createTextNode(
      `${producto.currency} ${productoCosto}`
    );
    liElement.appendChild(imgProduct);

    liElement.appendChild(productCost);
    liElement.classList.add("calculos-carrito");
    sidebarUl.appendChild(liElement);
    subTotalSidebarAmount += productoCosto;
  });
  const subtotalText = document.createTextNode(await subTotalSidebarAmount);
  subtotalSidebar.appendChild(subtotalText);
}

function actualizarGranSubtotal() {
  const spanSubtotal = document.getElementById("spanGranSubtotal");
  //productosCarrito debería estar en DOMContentLoaded pero si lo saco de acá se rompe otra funcion :p
  const productosCarrito =
    JSON.parse(localStorage.getItem("productosCarrito")) || [];
  let total = 0;

  productosCarrito.forEach((id) => {
    const subtotal = document.getElementById(`${id}-subtotal`);
    const subtotalString = subtotal.textContent;
    let subtotalNumero = parseFloat(subtotalString.split(" ")[1]);

    if (subtotalString.split(" ")[0] == "UYU") {
      subtotalNumero /= 40;
      subtotalNumero = Math.round(subtotalNumero);
      console.log(subtotalNumero);
    }

    total += subtotalNumero;
    spanSubtotal.textContent = "USD " + total;
  });
  return total;
}

async function actualizarImpuesto() {
  let granSubtotal = await actualizarGranSubtotal();
  console.log(granSubtotal);
  let spanEnvio = document.getElementById("spanCostoDeEnvio");
  let tipoEnvio = document.getElementsByName("envio");

  let porcentaje;
  for (let i = 0; i < tipoEnvio.length; i++) {
    if (tipoEnvio[i].checked) {
      checkedNumber = parseFloat(tipoEnvio[i].value);
      porcentaje = checkedNumber / 100;
    }
  }
  totalEnvio = Math.round(granSubtotal * porcentaje);

  spanEnvio.textContent = "USD " + totalEnvio;

  return totalEnvio;
}

async function actualizarTotal() {
  let subtotal = await actualizarGranSubtotal();
  let impuesto = await actualizarImpuesto();

  let spanTotal = document.getElementById("spanTotal");

  let total = subtotal + impuesto;

  spanTotal.textContent = "USD " + total;
}

//Validación del contenido del formulario de envío
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".needs-validation");

  function mostrarAlertaModal(modalID) {
    $(modalID).modal("show");
  }

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (e) => {
        const formularioValido = form.checkValidity();
        const productosCarrito = JSON.parse(
          localStorage.getItem("productosCarrito")
        );

        if (!formularioValido) {
          e.preventDefault();
          e.stopPropagation();
          metodoPagoError.style.display = "block"; // Mostrar el mensaje de error
          mostrarAlertaModal("#customModalErrorValidaciones"); // Muestra el modal de validaciones
        } else if (!productosCarrito || productosCarrito.length === 0) {
          e.preventDefault();
          e.stopPropagation();
          mostrarAlertaModal("#customModalErrorProductos"); // Muestra el modal de productos vacíos
        } else {
          sessionStorage.setItem("formSubmitted", "true");
        }

        form.classList.add("was-validated");
      },
      false
    );
  });

  const cerrarPago = document.getElementById("noGuardarPago");
  const guardarPago = document.getElementById("guardarPago");
  const metodoPagoError = document.getElementById("metodoPagoError");

  guardarPago.addEventListener("click", function (e) {
    manejarEvento(e);
  });

  function manejarEvento(e) {
    let metodoPagoSeleccionado = document.querySelector(
      'input[name="metodoPago"]:checked'
    );

    if (metodoPagoSeleccionado) {
      // Obtener el div padre del radio button seleccionado
      let divPadre = metodoPagoSeleccionado.closest(".form-check");

      // Obtener el campo de entrada dentro del div
      let inputMetodoPago = divPadre.querySelector(".input-pago");

      if (inputMetodoPago && inputMetodoPago.value.trim() !== "") {
        // Enviar el formulario y guardar la info en session storage
        guardarPago.setAttribute("data-dismiss", "modal");
        metodoPagoError.style.display = "none"; // Ocultar el mensaje de error
        sessionStorage.setItem("Validacion", "true");
      } else {
        // Mostrar el mensaje de error y evitar que se cierre el modal
        metodoPagoError.style.display = "block"; // Mostrar el mensaje de error
        e.preventDefault();
        e.stopPropagation();
      }
    } else {
      // Mostrar el mensaje de error y evitar que se cierre el modal
      metodoPagoError.style.display = "block"; // Mostrar el mensaje de error
      e.preventDefault();
      e.stopPropagation();
    }
  }

  const inputMetodoPago = document.getElementsByName("metodoPago");
  const inputPagoTarjeta = document.getElementById("inputPagoTarjeta");
  const inputPagoTarjeta2 = document.getElementById("inputPagoTarjeta2");
  const inputPagoTarjeta3 = document.getElementById("inputPagoTarjeta3");
  const inputPagoTarjeta4 = document.getElementById("inputPagoTarjeta4");
  const inputPagoPaypal = document.getElementById("inputPagoPaypal");
  const inputPagoPaypal2 = document.getElementById("inputPagoPaypal2");
  const inputPagoTransferencia2 = document.getElementById(
    "inputPagoTransferencia2"
  );
  const inputPagoTransferencia = document.getElementById(
    "inputPagoTransferencia"
  );
  const inputPagoRedes1 = document.getElementById("inputPagoRedes1");
  const inputPagoRedes2 = document.getElementById("inputPagoRedes2");

  // Verificar el input seleccionado y chequear que tenga contenido
  inputMetodoPago.forEach((input) => {
    input.addEventListener("change", function () {
      // Deshabilitar todos los campos de entrada y quitar el atributo 'required'
      [
        inputPagoTarjeta2,
        inputPagoTarjeta3,
        inputPagoTarjeta4,
        inputPagoPaypal2,
        inputPagoTransferencia2,
        inputPagoRedes1,
        inputPagoRedes2,
      ].forEach((input) => {
        input.disabled = true;
        input.value = "";
        input.removeAttribute("required");
      });

      // Habilitar los campos de entrada correspondientes al método de pago seleccionado y agregar el atributo 'required'
      if (inputPagoTarjeta.checked) {
        [inputPagoTarjeta2, inputPagoTarjeta3, inputPagoTarjeta4].forEach(
          (input) => {
            input.disabled = false;
            input.setAttribute("required", "true");
          }
        );
      } else if (inputPagoPaypal.checked) {
        inputPagoPaypal2.disabled = false;
        inputPagoPaypal2.setAttribute("required", "true");
      } else if (inputPagoTransferencia.checked) {
        inputPagoTransferencia2.disabled = false;
        inputPagoTransferencia2.setAttribute("required", "true");
      } else if (input.value === "abitab") {
        inputPagoRedes1.disabled = false;
        inputPagoRedes1.setAttribute("required", "true");
      } else if (input.value === "redpagos") {
        inputPagoRedes2.disabled = false;
        inputPagoRedes2.setAttribute("required", "true");
      }
    });
  });

  // Verificar si el formulario se ha enviado correctamente
  const formSubmitted = sessionStorage.getItem("formSubmitted");
  if (formSubmitted === "true") {
    // Mostrar la alerta de compra exitosa usando Bootstrap alert
    $(".alert").alert();

    // Mostrar la alerta
    $(".alert").removeClass("d-none");

    // Agregar un evento al botón "Aceptar"
    const acceptButton = document.getElementById("accept-button");
    acceptButton.addEventListener("click", function () {
      // Ocultar la alerta al hacer clic en "Aceptar"
      $(".alert").alert("close");
    });

    // Limpiar el valor en sessionStorage para futuros envíos del formulario
    sessionStorage.removeItem("formSubmitted");
  }
});

//Mensaje red de cobranza

document.addEventListener("DOMContentLoaded", function () {
  const mensajeCobranza = document.getElementById("mensajeCobranza");
  const radioButtons = document.querySelectorAll('input[name="metodoPago"]');

  radioButtons.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (radio.value === "abitab" || radio.value === "redpagos") {
        mensajeCobranza.style.display = "block";
      } else {
        mensajeCobranza.style.display = "none";
      }
    });
  });
});

document
  .getElementById("inputPagoTarjeta2")
  .addEventListener("input", function () {
    const cardNumber = this.value.replace(/\D/g, ""); // Remove non-numeric characters
    const cardImageContainer = document.getElementById("cardImageContainer");

    // Determine the card type based on the card number (you can add more card types as needed)
    let cardType = "unknown";
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber)) {
      cardType = "visa";
    } else if (/^5[1-5][0-9]{14}$/.test(cardNumber)) {
      cardType = "mastercard";
    } else if (/^3[47][0-9]{13}$/.test(cardNumber)) {
      cardType = "amex";
    }

    // Set the appropriate card image
    cardImageContainer.innerHTML = `<img src="${cardType}.png" alt="${cardType}">`;
  });

