# Changelog

Todos los cambios importantes de este proyecto se documentan en este archivo.

## [1.0.0] - 2025-01-14
### Agregado

#### Configuración
- TSconfig.json para permitir usar ts
- Database config para extraer los modelos importados desde index.ts en Models/

#### Middlewares
- Middleware para autenticar solicitudes
- Gestión de errores
- Middleware Cors

## [1.1.0] - 2025-01-15
### Agregado 

#### Middlewares
- Se agrego rateLimiter.ts para restringir la cantidad de peticiones de cada ip, con la finalidad de optimizar la seguridad
- Se agrego multerMiddleware.ts para aceptar la subida de archivos en la aplicacion y almacenarlos en una carpeta uploads/

#### Models

- Se implemento "roles" en el archivo role.models.ts
- Se implemento "departments" en el archivo department.models.ts

## [1.2.0] 2025-01-16

### Agregado

#### Models
- DeviceType
- Priority
- Status
- User
- Device


## [1.3.1] 2025-01-17

### Agregado

#### Models
- Attatchment
- Comment
- Ticket

### Corregido
- Database.ts no realizaba correctamente la asociacion de los modelos, ya que ejecutaba todo en la libreria sequelize-typescript en lugar de sequelize.