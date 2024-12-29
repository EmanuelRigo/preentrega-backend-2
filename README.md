## Características

- **Validación de Datos**: Implementación de middlewares para asegurar que los datos recibidos cumplan con los requisitos establecidos.
- **Persistencia en MongoDB Atlas**: Utilización de MongoDB Atlas para almacenar de manera segura los datos de la aplicación.
- **Autenticación de Usuarios**: Gestión de usuarios con roles y verificación de cuentas.

## Uso

Una vez que el servidor esté en funcionamiento, puedes realizar solicitudes a la API utilizando herramientas como Postman o URL. Asegúrate de incluir los headers necesarios y los datos en el formato correcto.

## Middlewares

Se han implementado middlewares para la validación de datos. Estos middlewares se encargan de verificar que los datos recibidos en las solicitudes cumplan con los criterios establecidos antes de ser procesados por las rutas de la API.

### Ejemplo de Middleware de Validación

```javascript
const validateData = (req, res, next) => {
  // Lógica de validación
  next();
};
```

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, por favor sigue estos pasos

## Clase 3: Implementación de Seguridad

### Agregando Bcrypt para el Hasheo de Contraseñas

En esta clase, hemos integrado la biblioteca **bcrypt** para mejorar la seguridad de las contraseñas en nuestra aplicación. Bcrypt es un algoritmo de hashing que permite almacenar contraseñas de manera segura, protegiéndolas contra ataques de fuerza bruta y otros tipos de vulnerabilidades.

#### Pasos para la Implementación

1. **Instalación de Bcrypt**:
   Para comenzar, asegúrate de instalar la biblioteca `bcrypt` en tu proyecto. Puedes hacerlo ejecutando el siguiente comando en tu terminal:

   ```bash
   npm install bcrypt
   ```

2. **Uso de Bcrypt**:
   A continuación, puedes utilizar `bcrypt` para hashear las contraseñas antes de almacenarlas en la base de datos. Aquí tienes un ejemplo de cómo hacerlo:

   ```javascript
   import bcrypt from "bcrypt";

   const saltRounds = 10; // Número de rondas de sal

   // Función para hashear una contraseña
   const hashPassword = async (password) => {
     const hash = await bcrypt.hash(password, saltRounds);
     return hash;
   };

   // Función para comparar una contraseña con su hash
   const comparePassword = async (password, hash) => {
     const match = await bcrypt.compare(password, hash);
     return match;
   };
   ```

3. **Integración en el Registro de Usuarios**:
   Asegúrate de integrar el hasheo de contraseñas en el proceso de registro de usuarios para que las contraseñas se almacenen de forma segura.

4. **Verificación de Contraseñas**:
   Utiliza la función de comparación para verificar las contraseñas durante el inicio de sesión.

### Conclusión

La implementación de `bcrypt` es un paso crucial para asegurar la información sensible de los usuarios. Asegúrate de seguir las mejores prácticas de seguridad al manejar contraseñas y datos sensibles en tu aplicación.

## Integración de Passport para Autenticación

Hemos agregado **Passport** para gestionar las rutas de autenticación, incluyendo **login**, **register**, **online** y **signout**. Passport es un middleware de autenticación para Node.js que facilita la implementación de estrategias de autenticación.

### Pasos para la Implementación

1. **Instalación de Passport**:
   Asegúrate de instalar las bibliotecas necesarias ejecutando el siguiente comando:

   ```bash
   npm install passport passport-local
   ```

2. **Configuración de Passport**:
   Configura Passport en tu aplicación para manejar la autenticación de usuarios. Aquí tienes un ejemplo básico de cómo hacerlo:

   ```javascript
   import passport from "passport";
   import LocalStrategy from "passport-local";

   // Estrategia de autenticación local
   passport.use(
     new LocalStrategy(async (username, password, done) => {
       // Lógica para encontrar el usuario y verificar la contraseña
       // ...
     })
   );

   // Serialización y deserialización de usuarios
   passport.serializeUser((user, done) => {
     done(null, user.id);
   });

   passport.deserializeUser(async (id) => {
     // Lógica para encontrar el usuario por ID
     // ...
   });
   ```

3. **Rutas de Autenticación**:
   Asegúrate de definir las rutas para **login**, **register**, **online** y **signout** utilizando Passport para manejar las solicitudes de autenticación.

### Conclusión

La integración de Passport mejora la seguridad y la gestión de usuarios en tu aplicación, facilitando la implementación de diferentes estrategias de autenticación.

## Clase 4: Integración de Estrategia de Autenticación con Google

En esta clase, implementaremos la estrategia de autenticación utilizando Google. Esto permitirá a los usuarios iniciar sesión en nuestra aplicación utilizando sus cuentas de Google, mejorando la experiencia del usuario y facilitando el acceso.

### Pasos para la Implementación

1. **Configuración de Google Developer Console**:

   - Crea un nuevo proyecto en la [Google Developer Console](https://console.developers.google.com/).
   - Habilita la API de Google+.
   - Configura las credenciales de OAuth 2.0 y obtén el `Client ID` y `Client Secret`.

2. **Instalación de Dependencias**:
   Asegúrate de tener instaladas las bibliotecas necesarias para la autenticación con Google:

   ```bash
   npm install passport-google-oauth20
   ```

3. **Configuración de Passport**:
   Configura Passport para utilizar la estrategia de Google. Aquí tienes un ejemplo básico:

   ```javascript
   import passport from "passport";
   import { Strategy as GoogleStrategy } from "passport-google-oauth20";

   passport.use(
     new GoogleStrategy(
       {
         clientID: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         callbackURL: "/api/session/google/cb",
       },
       async (accessToken, refreshToken, profile, done) => {
         // Lógica para manejar la autenticación con Google
         // ...
       }
     )
   );
   ```

4. **Rutas de Autenticación**:
   Asegúrate de definir las rutas para **login**, **register**, **online** y **signout** utilizando Passport para manejar las solicitudes de autenticación.

### Conclusión

# Sistema de Autenticación y Autorización

## Características Principales

### 1. Autenticación Local

- Registro de usuarios con email y contraseña
- Login seguro con validación de credenciales
- Manejo de sesiones con JWT (JSON Web Tokens)
- Verificación de estado online/offline de usuarios

### 2. Integración con Google OAuth2

- Login con cuentas de Google
- Registro automático de nuevos usuarios
- Acceso seguro mediante OAuth 2.0
- Obtención de perfil básico del usuario

### 3. Gestión de Sesiones

- Manejo de tokens JWT para autenticación
- Verificación de estado de sesión
- Cierre de sesión seguro
- Control de acceso a rutas protegidas

### 4. Seguridad

- Encriptación de contraseñas
- Protección contra ataques CSRF
- Validación de tokens
- Manejo seguro de sesiones

## Endpoints

### Autenticación Local

- `POST /api/sessions/register` - Registro de nuevos usuarios
- `POST /api/sessions/login` - Inicio de sesión
- `POST /api/sessions/signout` - Cierre de sesión
- `POST /api/sessions/online` - Verificación de estado online

### Google OAuth

- `GET /api/sessions/google` - Inicio de autenticación con Google
- `GET /api/sessions/google/cb` - Callback de autenticación Google

## Uso

1. **Registro Local**

```javascript
fetch("/api/sessions/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
```

2. **Login Local**

```javascript
fetch("/api/sessions/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
```

3. **Verificación de Estado Online**

```javascript
fetch("/api/sessions/online", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
```

## Tecnologías Utilizadas

- Node.js
- Express
- Passport.js
- JWT
- Google OAuth 2.0
- MongoDB

## Configuración

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno:

```env
PORT=9000
MONGODB_URI=your_mongodb_uri
SECRET_KEY=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Uso de Postman para Crear un Producto

Al utilizar Postman para crear un producto, asegúrate de incluir el token de autenticación en el header `Authorization`. El formato correcto es:

```
Authorization: Bearer <tu_token>
```

Reemplaza `<tu_token>` con el token JWT que obtuviste al iniciar sesión. Esto asegura que la solicitud esté autenticada correctamente.

### Implementación de Sign Out

Se ha añadido la funcionalidad de cierre de sesión (sign out) utilizando Passport y Handlebars. Esto permite a los usuarios cerrar sesión de manera segura desde la interfaz de usuario.

### Implementación de Custom Routers

Se han implementado **Custom Routers** para organizar mejor las rutas de la aplicación. Esto mejora la modularidad y el mantenimiento del código.

#### Ejemplo de Uso:

```javascript
import express from "express";
const customRouter = express.Router();

customRouter.get("/example", (req, res) => {
  res.send("Example route");
});

export default customRouter;
```

```javascript
import customRouter from "./path/to/customRouter";
app.use("/api", customRouter);
```

## Organización del Código

Se ha atomizado el código en **services** y **controllers** para mejorar la modularidad y el mantenimiento del proyecto. Esta estructura permite separar la lógica de negocio de la lógica de manejo de solicitudes, facilitando así la escalabilidad y la legibilidad del código.


agregando persistencia segun corresponda en FS o MongoDb

agregamos DTO a users.service, products.service y carts.service para transormar los objetos segun la persistencia requerida 