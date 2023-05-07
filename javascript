// Función para registrar un nuevo usuario
function registrarUsuario() {
  // Obtener los datos del formulario
  var nombre = document.getElementById("nombre").value;
  var correo = document.getElementById("correo").value;
  var contrasena = document.getElementById("contrasena").value;
  var esProtectora = document.getElementById("esProtectora").checked;
  
  // Validar que se hayan ingresado todos los datos
  if (nombre == "" || correo == "" || contrasena == "") {
    alert("Por favor ingresa todos los datos.");
    return;
  }
  
  // Validar que el correo tenga un formato válido
  var correoValido = /\S+@\S+\.\S+/.test(correo);
  if (!correoValido) {
    alert("Por favor ingresa un correo electrónico válido.");
    return;
  }
  
  // Validar que el usuario no exista previamente
  var usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios"));
  if (usuariosRegistrados != null) {
    for (var i = 0; i < usuariosRegistrados.length; i++) {
      if (usuariosRegistrados[i].correo == correo) {
        alert("El correo electrónico ya está registrado.");
        return;
      }
    }
  }
  
  // Crear un objeto con los datos del usuario
  var nuevoUsuario = {
    nombre: nombre,
    correo: correo,
    contrasena: contrasena,
    esProtectora: esProtectora
  };
  
  // Guardar el nuevo usuario en el almacenamiento local
  if (usuariosRegistrados == null) {
    usuariosRegistrados = [];
  }
  usuariosRegistrados.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
  
  // Redirigir al usuario a la página de inicio
  window.location.href = "index.html";
}

// Función para iniciar sesión
function iniciarSesion() {
  // Obtener los datos del formulario
  var correo = document.getElementById("correo").value;
  var contrasena = document.getElementById("contrasena").value;
  
  // Validar que se hayan ingresado todos los datos
  if (correo == "" || contrasena == "") {
    alert("Por favor ingresa tu correo y contraseña.");
    return;
  }
  
  // Validar que el correo tenga un formato válido
  var correoValido = /\S+@\S+\.\S+/.test(correo);
  if (!correoValido) {
    alert("Por favor ingresa un correo electrónico válido.");
    return;
  }
  
  // Verificar que el usuario exista y la contraseña sea correcta
  var usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios"));
  var usuarioEncontrado = false;
  if (usuariosRegistrados != null) {
    for (var i = 0; i < usuariosRegistrados.length; i++) {
      if (usuariosRegistrados[i].correo == correo && usuariosRegistrados[i].contrasena == contrasena) {
        // Iniciar sesión con el usuario encontrado
        usuarioEncontrado = true;
        sessionStorage.setItem("usuario", JSON.stringify(usuariosRegistrados[i]));
        break;
      }
    }
  }
  
  // Si el usuario no fue encontrado, mostrar un mensaje de error
  if (!usuarioEncontrado) {
    alert("Correo electrónico o contraseña incorrectos.");
    return;
  }
  
  // Redirigir al
