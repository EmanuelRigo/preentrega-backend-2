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
