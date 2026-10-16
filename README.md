# HR-Management-API

API REST para la gestión de recursos humanos, desarrollada con Java y Spring Boot. Proyecto de aprendizaje backend **en desarrollo**.

## Tecnologías
- Java [versión]
- Spring Boot
- Spring Data JPA / Hibernate
- MySQL
- Lombok
- Maven
- Postman (pruebas de endpoints)

## Funcionalidades
- [x] CRUD completo de empleados
- [x] Validación de datos de entrada
- [x] Gestión de errores con códigos HTTP (400, 404...)
- [ ] CRUD de departamentos (en desarrollo)
- [ ] Actualización parcial con PATCH

## Arquitectura
Arquitectura por capas:
- `controller`: expone los endpoints REST
- `service`: lógica de negocio (inyección sobre interfaces)
- `repository`: acceso a datos con JPA

## Cómo ejecutarlo

### Requisitos
- JDK [versión]
- MySQL en local
- Maven (o el wrapper incluido `mvnw`)

### Pasos
1. Clona el repositorio:
```bash
   git clone https://github.com/moralesmorilla/HR-Management-API.git
   cd HR-Management-API
```
2. Crea la base de datos en MySQL:
```sql
   CREATE DATABASE [nombre_bd];
```
3. Configura `src/main/resources/application.properties` con tus credenciales de MySQL.
4. Arranca la aplicación:
```bash
   ./mvnw spring-boot:run
```
5. La API estará en `http://localhost:8080`.

## Endpoints principales
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/employees` | Listar todos los empleados |
| GET | `/api/employees/{id}` | Obtener un empleado por id |
| POST | `/api/employees` | Crear un empleado |
| PUT | `/api/employees/{id}` | Actualizar un empleado (reemplazo completo) |
| DELETE | `/api/employees/{id}` | Eliminar un empleado |

## Autor
Manuel Morales Morilla · [GitHub](https://github.com/moralesmorilla)
