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

## [1.4.1] 2025-01-18

### Agregado

#### Models

- Notification
- StatusHistory
- Task

### Corregido

- Se ha corregido el archivo attatchment.ts que contenia la configuración de database.ts por error

## [1.5.1] 2025-02-01

### Agregado

- Funciones como getUsers, getRoles, findRolebyId, createRole
- Rutas de roles y usuarios
- Se creó validateResultMiddleware y roleValidator

### Corregido

- Se corrigieron los modelos de sequelize donde friendly_code era considerado TEXT en lugar de UUID

## [1.6.0] 2025-02-02

### Agregado

- Update, delete de roles
- Service y controlador de departamentos completo

## [1.7.0] 2025-02-04

### Agregado
- Departamento rutas, validación
- Type validación, servicio 

### Corregido
- Update department

## [1.8.3]

### Agregado
- Se agregaron los enums para status, roles, priority

### Corregido
- Se elimino roles, priority, status de los modelos, en su lugar son enums en enums/
- Se modifico Task, que tenia un error de codigo en lugar de Notification_user
- Se modifico Company de UserModel, que paso a ser un enum
