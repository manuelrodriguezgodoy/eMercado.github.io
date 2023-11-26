 const express = require('express');
 const bodyParser = require('body-parser');
 const jwt = require('jsonwebtoken');
 const path = require('path');

 const SECRET_KEY = "CLAVE_ULTRA_SECRETA"; // Cambiado para ser más seguro

 const app = express();
 const PORT = 3000;

 app.use(bodyParser.json());


 app.use(express.static(path.join(__dirname)));

 app.get('/', (req, res) => {
     res.send('¡La aplicación está funcionando!');
 });

 app.get("/login", (req, res) => {
     res.sendFile(__dirname + "/login.html");
 });

 app.use("/auth", (req, res, next) => {
     const token = req.headers["access-token"];

    if (!token) {
         return res.status(401).json({ message: "Token no proporcionado", error: "No se proporcionó un token" });
     }

     try {
         const decoded = jwt.verify(token, SECRET_KEY);
         console.log(decoded);
         next();
     } catch (err) {
         console.error('Error al verificar el token:', err.message);
         res.status(401).json({ message: "Usuario no autorizado", error: err.message });
     }
 });

 app.post('/login', (req, res) => {
     const nameLogin = req.body.name; // Cambiado de 'correo' a 'name'
     const passwordLogin = req.body.password;

     if (nameLogin && passwordLogin) {
         const token = jwt.sign({ nameLogin }, SECRET_KEY, { expiresIn: '1h' });
         console.log('Token generado:', token);
         res.json({ token });
     } else {
         res.status(401).json({ error: 'Credenciales incorrectas' });
     }
 });

 app.listen(PORT, () => {
     console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
 });
