document.addEventListener("DOMContentLoaded", () => {
  const navElement = document.getElementById("navlist");

  let userEmail = localStorage.getItem("email") || "nombre@empresa.com";
  let userName = userEmail.split("@")[0];

  // Cargar foto usuario
  let fotoUsuario =
    localStorage.getItem(`${userEmail}-icon`) ||
    "../img/iconos_perfil/desconocido.png";

  // Crear elemento nav
  const loginNavElement = document.createElement("li");
  loginNavElement.innerHTML = `
    <p id="login-nav-user-name" class="nav-link" >${userName}</p>
    <img id="login-nav-user-foto" src="${fotoUsuario}">
  `;
  loginNavElement.classList.add("nav-item");
  loginNavElement.id = "login-nav-li";

  // Crear menu opciones
  const loginMenu = document.createElement("div");
  loginMenu.id = "login-menu-container";
  loginMenu.innerHTML = `
    <img id="login-foto-perfil-usuario" src=${fotoUsuario}>
    <button id="login-cambiar-icono-btn"><i class="fa fa-pencil-alt"></i></button>
    <h2 id="login-nombre-usuario">${userName}</h2>
    <h3 id="login-email-usuario">${userEmail}</h3>
    <button id="login-edit-perfil-btn"><a class="mo-texto-negro" href="my-profile.html" id="btn-edit-perfil">Editar Perfil<a></button>
    <button id="mi-carrito-btn"><a class="mo-texto-negro" href="cart.html" id="btn-mi-carrito">Mi carrito<a></button>
    <button id="login-logout-btn">Salir</button>
    <button id="btn-oscuro" class="modoOscuroBtn"></button>
  `;

  const fotoPerfilMenu = document.createElement("div");
  fotoPerfilMenu.id = "menu-cambiar-icono-wrap";

  let cambiarIconoContainer = document.createElement("div");
  cambiarIconoContainer.id = "menu-cambiar-icono-container";

  let cambiarIconoTitulo = document.createElement("h2");
  cambiarIconoTitulo.id = "menu-cambiar-icono-titulo";
  cambiarIconoTitulo.innerText = "Elije un nuevo icono";

  let opcionesContainer = document.createElement("div");

  let cambiarIconoOpciones = document.createElement("div");
  cambiarIconoOpciones.id = "menu-cambiar-icono-opciones";

  //cargar una imagen personalizada
  let customIconInput = document.createElement("input");
  customIconInput.type = "file";
  customIconInput.accept = "image/*"; // Acepta imágenes de cualquier tipo
  customIconInput.id = "custom-icon-input";
  customIconInput.addEventListener("change", handleCustomIconUpload);

  opcionesContainer.appendChild(cambiarIconoOpciones);
  opcionesContainer.appendChild(customIconInput);

  cambiarIconoContainer.appendChild(cambiarIconoTitulo);
  cambiarIconoContainer.appendChild(opcionesContainer);

  fotoPerfilMenu.appendChild(cambiarIconoContainer);

  let fotoDefaultArray = [
    "hombre_(1).png",
    "hombre_(2).png",
    "hombre_(3).png",
    "hombre.png",
    "usuario.png",
    "mujer_(1).png",
    "mujer_(2).png",
    "mujer_(3).png",
    "mujer.png",
    "jugador.png",
  ];

  fotoDefaultArray.forEach((element) => {
    let iconButton = document.createElement("button");
    let iconImg = document.createElement("img");
    iconButton.classList.add("opcion-icono");
    iconButton.setAttribute("data-icon", `./img/iconos_perfil/${element}`);
    iconImg.src = `./img/iconos_perfil/${element}`;

    iconButton.appendChild(iconImg);

    cambiarIconoOpciones.appendChild(iconButton);
  });

  //* Agregar elemento nav a navbar
  const navbar = document.getElementById("navlist");
  navbar.appendChild(loginNavElement);
  // Mostrar menú si se da clic
  loginNavElement.addEventListener("click", (event) => {
    loginMenu.style.display === "block"
      ? (loginMenu.style.display = "none")
      : (loginMenu.style.display = "block");
    event.stopPropagation();
  });
  // Esconder menú si se da clic afuera
  window.addEventListener("click", (event) => {
    if (loginMenu.style.display === "block") {
      loginMenu.style.display = "none";
    }
  });

  //* Agregar elemento menú opciones
  document.body.appendChild(loginMenu);

  //* Agregar elemento elegir imágenes
  const cambiarIconoBtn = document.getElementById("login-cambiar-icono-btn");
  document.body.appendChild(fotoPerfilMenu);
  // Mostrar menú si se da clic
  cambiarIconoBtn.addEventListener("click", (event) => {
    fotoPerfilMenu.style.display = "block";
    event.stopPropagation();
  });
  // Esconder menú si se da clic afuera
  window.addEventListener("click", (event) => {
    if (fotoPerfilMenu.style.display === "block") {
      fotoPerfilMenu.style.display = "none";
    }
  });

  function handleCustomIconUpload(event) {
    const customIconFile = event.target.files[0];
    if (customIconFile) {
      let reader = new FileReader();

      reader.readAsDataURL(customIconFile);

      reader.onload = () => {
        let base64Custom = reader.result;
        console.log(userEmail);
        localStorage.setItem(`${userEmail}-icon`, base64Custom);
        window.location.reload();
      };
    }
  }
  // Cambiar foto perfil
  const contenedorImagenes = document.getElementById(
    "menu-cambiar-icono-opciones"
  );
  contenedorImagenes.addEventListener("click", (event) => {
    fotoUsuario = event.target.src;
    localStorage.setItem(`${userEmail}-icon`, event.target.src);
    console.log(fotoUsuario);
    location.reload();
    console.log("TUKI");
  });

  // LOGOUT
  const logoutBtn = document.getElementById("login-logout-btn");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("email");
    window.location.href = "../login.html";
  });
});

//MODO OSCURO
document.addEventListener("DOMContentLoaded", () => {
  let modoOscuroActivado = localStorage.getItem("modoOscuro") === "true";

  const modoOscuroBoton = document.getElementById("btn-oscuro");
  const body = document.body;

  function activarModoOscuro() {
    body.id = "modo-oscuro";
    modoOscuroActivado = true;

    localStorage.setItem("modoOscuro", "true");
  }

  function desactivarModoOscuro() {
    body.id = "modo-claro";
    modoOscuroActivado = false;

    localStorage.setItem("modoOscuro", "false");
  }

  if (modoOscuroActivado) {
    activarModoOscuro();
  } else {
    desactivarModoOscuro();
  }

  modoOscuroBoton.addEventListener("click", () => {
    if (modoOscuroActivado) {
      desactivarModoOscuro();
    } else {
      activarModoOscuro();
    }
  });
});
