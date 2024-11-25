# API Movies

## Descripción

Este proyecto es una API para la gestión de películas, que incluye funcionalidades para la validación de datos y persistencia en MongoDB Atlas. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos de las películas, así como la gestión de usuarios.

## Características

- **Validación de Datos**: Implementación de middlewares para asegurar que los datos recibidos cumplan con los requisitos establecidos.
- **Persistencia en MongoDB Atlas**: Utilización de MongoDB Atlas para almacenar de manera segura los datos de la aplicación.
- **Autenticación de Usuarios**: Gestión de usuarios con roles y verificación de cuentas.

## Instalación

Para instalar y ejecutar este proyecto, sigue los siguientes pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu_usuario/api-movies.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd api-movies
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Configura las variables de entorno necesarias para conectar a MongoDB Atlas.

5. Inicia el servidor:
   ```bash
   npm start
   ```

## Uso

Una vez que el servidor esté en funcionamiento, puedes realizar solicitudes a la API utilizando herramientas como Postman o cURL. Asegúrate de incluir los headers necesarios y los datos en el formato correcto.

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
