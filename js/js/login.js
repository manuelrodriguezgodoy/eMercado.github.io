document.addEventListener("DOMContentLoaded", function () {
  const logInButton = document.getElementById("loginbutton");

  logInButton.addEventListener("click", function () {
    const emailElement = document.getElementById("mailuser");
    const passwordElement = document.getElementById("passworduser");
    const emailHasAt = emailElement.value.includes("@");
    const emailHasDot = emailElement.value.includes(".");
    const passwordIsShort = passwordElement.value.length < 6;

    //* Guardar e-mail al localStorage si está todo correcto
    if (
      emailElement.value &&
      passwordElement.value &&
      emailHasAt &&
      emailHasDot &&
      !passwordIsShort
    ) {
      localStorage.setItem("email", emailElement.value);
      window.location.href = "index.html";
    } else {
      // Dar errores especificos
      switch (true) {
        case !emailHasAt:
          alert("El e-mail ingresado debe contener un arroba (@)");
          break;
        case !emailHasDot:
          alert("El e-mail ingresado debe contener un punto (.)");
          break;
        case passwordIsShort:
          alert("La contraseña debe contener al menos seis caracteres");
          break;
        default:
          break;
      }
    }
  });

  //* Recordar al usuario cuando se checkea "Recuerdame"
  const recordarmeCheck = document.getElementById("recordarme");
  const mailInputElement = document.getElementById("mailuser");
  const passwordInputElement = document.getElementById("passworduser");
  let mailRecordado = localStorage.getItem("mailRecordado");
  let passwordRecordada = localStorage.getItem("mailRecordado");

  // Si contenido recordado es truthy (!= null)
  if (mailRecordado) {
    // Guardar el mail en la variable
    mailInputElement.value = mailRecordado;
  }
  if (passwordRecordada) {
    passwordInputElement.value = passwordRecordada;
  }

  // Cuando se apreta el botón de log in, si está chekeado el recordarme, guarda el valor del mail y pass
  logInButton.addEventListener("click", function () {
    if (recordarmeCheck.checked) {
      localStorage.setItem("mailRecordado", mailInputElement.value);
      localStorage.setItem("passwordRecordada", passwordInputElement.value);
    }
  });
});
