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
    <button id="login-edit-perfil-btn">Editar Perfil</button>
    <button id="login-logout-btn">Log Out</button>
  `;

  // Crear menu cambio foto perfil
  const fotoPerfilMenu = document.createElement("div");
  fotoPerfilMenu.id = "menu-cambiar-icono-wrap";
  fotoPerfilMenu.innerHTML = `
  <div id="menu-cambiar-icono-container">
    <h2 id="menu-cambiar-icono-titulo">Elije un nuevo icono</h2>
    <div id="menu-cambiar-icono-opciones">
      <button class="opcion-icono" data-icon="./img/iconos_perfil/hombre_(1).png">
        <img src="../img/iconos_perfil/hombre_(1).png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/hombre_(2).png">
        <img src="../img/iconos_perfil/hombre_(2).png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/hombre_(3).png">
        <img src="../img/iconos_perfil/hombre_(3).png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/hombre.png">
        <img src="../img/iconos_perfil/hombre.png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/usuario.png">
        <img src="../img/iconos_perfil/usuario.png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/mujer_(1).png">
        <img src="../img/iconos_perfil/mujer_(1).png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/mujer_(2).png">
        <img src="../img/iconos_perfil/mujer_(2).png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/mujer_(3).png">
        <img src="../img/iconos_perfil/mujer_(3).png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/mujer.png">
        <img src="../img/iconos_perfil/mujer.png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/jugador.png">
        <img src="../img/iconos_perfil/jugador.png" />
      </button>
    </div>
  </div>
  `;

  //* Agregar elemento nav a navbar
  const navbar = document.getElementById("navlist");
  navbar.appendChild(loginNavElement);
  // Mostrar menu si se da click
  loginNavElement.addEventListener("click", (event) => {
    loginMenu.style.display === "block"
      ? (loginMenu.style.display = "none")
      : (loginMenu.style.display = "block");
    event.stopPropagation();
  });
  // Esconder menu si se da click afuera
  window.addEventListener("click", (event) => {
    if (loginMenu.style.display === "block") {
      loginMenu.style.display = "none";
    }
  });

  //* Agregar elemento menu opciones
  document.body.appendChild(loginMenu);

  //* Agregar elemento elegir imagenes
  const cambiarIconoBtn = document.getElementById("login-cambiar-icono-btn");
  document.body.appendChild(fotoPerfilMenu);
  // Mostrar menu si se da click
  cambiarIconoBtn.addEventListener("click", (event) => {
    fotoPerfilMenu.style.display = "block";
    event.stopPropagation();
  });
  // Esconder menu si se da click afuera
  window.addEventListener("click", (event) => {
    if (fotoPerfilMenu.style.display === "block") {
      fotoPerfilMenu.style.display = "none";
    }
  });

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
    location.reload();
  });
});
