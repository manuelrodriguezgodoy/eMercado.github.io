document.addEventListener("DOMContentLoaded", function () {
  let navbar = document.getElementById("navlist");
  let logoutNav = document.createElement("li");
  let loginNav = document.createElement("li");

  let loginIn = document.createElement("li");

  loginIn.classList.add("nav-item");
  const userEmail = localStorage.getItem("email");
  loginIn.innerHTML = `<link rel="stylesheet" href="css/usuario-logueado-nav.css">
  <div class="login-container">
  <p id="email-p">${userEmail}</p>
  <input type="image" src=${
    localStorage.getItem(`${userEmail}-icon`) ||
    "./iconos_perfil/foto-login-perfil.png"
  } id="perfil" class="foto-perfil-login">
    </input>
  <div class="tarjeta" id="tarjeta">
      <a class="login-perfil">Perfil</a>
  <button id="popup-cambio-img">Cambiar icono</button>
  <div class="popup-wrapper">
      <div id="popup-opciones" class="popup-img">
          <div class="popup-contenido">
              <span class="cerrar">&times;</span>
              <h2>Elige tu icono de perfil</h2>
              <div class="opciones-icono">
                  <button class="opcion-icono"
                      data-icon="./iconos_perfil/hombre_(1).png">
                      <img src="./iconos_perfil/hombre_(1).png" />
                  </button>
                  <button class="opcion-icono"
                      data-icon="./iconos_perfil/hombre_(2).png">
                      <img src="./iconos_perfil/hombre_(2).png" />
                  </button>
                  <button class="opcion-icono"
                      data-icon="./iconos_perfil/hombre_(3).png">
                      <img src="./iconos_perfil/hombre_(3).png" />
                  </button>
                  <button class="opcion-icono"
                      data-icon="./iconos_perfil/hombre.png">
                      <img src="./iconos_perfil/hombre.png" />
                  </button>
                  <button class="opcion-icono"
                      data-icon="./iconos_perfil/usuario.png">
                      <img src="./iconos_perfil/usuario.png" />
                  </button>
                  <button class="opcion-icono"
                      data-icon="./iconos_perfil/mujer_(1).png">
                      <img src="./iconos_perfil/mujer_(1).png" />
                  </button>
                  <button class="opcion-icono"
                      data-icon="./iconos_perfil/mujer_(2).png">
                      <img src="./iconos_perfil/mujer_(2).png" />
                  </button>
                  <button class="opcion-icono"
                      data-icon="./iconos_perfil/mujer_(3).png">
                      <img src="./iconos_perfil/mujer_(3).png" />
                  </button>
                  <button class="opcion-icono"
                      data-icon="./iconos_perfil/mujer.png">
                      <img src="./iconos_perfil/mujer.png" />
                  </button>
                  <button class="opcion-icono"
                      data-icon="./iconos_perfil/jugador.png">
                      <img src="./iconos_perfil/jugador.png" />
                  </button>
                  </div>
                  </div>
                  </div>
                  </div>
                  <p id="salir">logOut</p>
  </div>
</div>
    <script src="login.js"<script>
`;

  logoutNav.classList.add("nav-item");
  logoutNav.innerHTML = `<a class="nav-link">LogOut</a>
    
    `;

  loginNav.classList.add("nav-item");
  loginNav.innerHTML = `<a class="nav-link" href="login.html">LogIn</a>`;

  if (localStorage.getItem("email")) {
    // navbar.appendChild(logoutNav)
    navbar.appendChild(loginIn);
    const perfil = document.getElementById("perfil");
    const tarjeta = document.getElementById("tarjeta");

    perfil.addEventListener("click", () => {
      tarjeta.style.display =
        tarjeta.style.display === "flex" ? "none" : "flex";
    });
  } else {
    navbar.appendChild(loginNav);
  }

  document.getElementById("salir").addEventListener("click", function () {
    localStorage.removeItem("email");
    //esto hay que cambiarlo
    location.reload();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const imagenPerfil = document.getElementById("perfil");
  const popup = document.getElementsByClassName("popup-wrapper")[0];
  const btnAbrirPopup = document.getElementById("popup-cambio-img");
  const btnCerrar = document.getElementsByClassName("cerrar")[0];
  let iconos;
  btnAbrirPopup.addEventListener("click", function () {
    popup.style.display = "block";
    iconos = document.getElementsByClassName("opcion-icono");
    console.log(typeof iconos);
    Object.values(iconos).forEach((button) => {
      button.addEventListener("click", function () {
        const iconPath = this.getAttribute("data-icon");
        const userEmail = localStorage.getItem("email");
        imagenPerfil.src = iconPath;
        localStorage.setItem(`${userEmail}-icon`, iconPath);
        popup.style.display = "none";
      });
    });
  });

  btnCerrar.addEventListener("click", function () {
    popup.style.display = "none";
  });
});
