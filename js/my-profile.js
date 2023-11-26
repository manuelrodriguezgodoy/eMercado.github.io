document.addEventListener("DOMContentLoaded", () => {
  let imgMyProfile = document.getElementById("lmenu-cambiar-icono-container");
  console.log("profile Icon", imgMyProfile.src);
  const formsPerfil = document.querySelectorAll(".needs-validation");
  let botonCambiarFoto = document.getElementById("login-cambiar-icono-btn");
  const loggedEmail = localStorage.getItem("email");
  const formData = JSON.parse(
    localStorage.getItem(`${loggedEmail}-perfilData`)
  );
  imgMyProfile.src = localStorage.getItem(`${loggedEmail}-icon`);
  botonCambiarFoto.addEventListener("click", (event) => {
    event.preventDefault();
  });

  Array.from(formsPerfil).forEach((form) => {
    form.addEventListener(
      "submit",
      (e) => {
        const formularioValido = form.checkValidity();

        if (!formularioValido) {
          e.preventDefault();
          e.stopPropagation();
        } else {
          const formData = {
            nombre: document.getElementById("nombre1").value,
            nombre2: document.getElementById("nombre2").value,
            apellido: document.getElementById("apellido1").value,
            apellido2: document.getElementById("apellido2").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
          };
          // Guarda los datos del formulario como un objeto JSON en el localStorage
          localStorage.setItem(
            `${loggedEmail}-perfilData`,
            JSON.stringify(formData)
          );
          localStorage.setItem("email", document.getElementById("email").value);
        }

        form.classList.add("was-validated");
      },
      false
    );
  });

  if (formData) {
    document.getElementById("nombre1").value = formData.nombre || "";
    document.getElementById("nombre2").value = formData.nombre2 || "";
    document.getElementById("apellido1").value = formData.apellido || "";
    document.getElementById("apellido2").value = formData.apellido2 || "";
    document.getElementById("email").value = formData.email || "";
    document.getElementById("phone").value = formData.phone || "";
  } else {
    document.getElementById("email").value = loggedEmail;
  }
  console.log("ta o no ta?");
});
