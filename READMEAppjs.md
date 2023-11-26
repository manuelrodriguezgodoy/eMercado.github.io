Instrucciones para Configurar y Ejecutar el Proyecto
Requisitos Previos
Asegúrate de tener Node.js y npm instalados en tu sistema antes de proceder.

Paso 1: Clonar el Repositorio
git clone https://github.com/tu_usuario/tu_proyecto.git

Paso 2: Instalar Dependencias
Ejecuta el siguiente comando para instalar las dependencias del proyecto.
npm install

Paso 3: Configurar la Base de Datos
3.1 Crear la Base de Datos
Asegúrate de tener una base de datos llamada cartdb creada en tu sistema de gestión de bases de datos. Puedes usar MySQL, MariaDB u otro.

3.2 Configurar la Contraseña en el Modelo
Dirígete al archivo del modelo de la base de datos models/cartdbModel.js Busca la configuración de conexión a la base de datos y asegúrate de proporcionar la contraseña correcta.

  const pool = mariadb.createPool({
    host: "localhost",
    user: 'root',
    password: 'tu_contraseña', 
    database: 'cartdb',
    connectionLimit: 5
});

Paso 4: Ejecutar la Aplicación
4.1 Iniciar el Servidor
Ejecuta el siguiente comando para iniciar el servidor en localhost:3000.

npm start
4.2 Acceder a la Aplicación
Abre tu navegador web y visita http://localhost:3000. Ahora deberías poder acceder a la aplicación.
