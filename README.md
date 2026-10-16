# HR Management API

API REST para la gestión básica de empleados, desarrollada con Java y Spring Boot. Incluye una interfaz web sencilla servida por la propia aplicación.

## Tecnologías

- Java 21
- Spring Boot 4
- Spring Web MVC
- Spring Data JPA / Hibernate
- MySQL
- Bean Validation
- Maven
- HTML, CSS y JavaScript

## Funcionalidades

- CRUD de empleados: listar, consultar por ID, crear, actualizar y eliminar.
- Validación de los campos obligatorios.
- Validación de correo electrónico duplicado.
- Interfaz web para administrar empleados desde el navegador.
- Creación y actualización del esquema de base de datos mediante Hibernate.

## Requisitos

- JDK 21
- MySQL
- No es necesario instalar Maven: el proyecto incluye Maven Wrapper.

## Configuración y ejecución

1. Clona el repositorio y entra en la carpeta del proyecto:

   ```bash
   git clone https://github.com/moralesmorilla/HR-Management-API.git
   cd HR-Management-API
   ```

2. Crea la base de datos en MySQL:

   ```sql
   CREATE DATABASE IF NOT EXISTS hr_management
     CHARACTER SET utf8mb4
     COLLATE utf8mb4_unicode_ci;
   ```

   Hibernate crea o actualiza la tabla `employee` al iniciar la aplicación.

3. Configura las credenciales de MySQL mediante variables de entorno. En PowerShell:

   ```powershell
   $env:DB_URL = "jdbc:mysql://localhost:3306/hr_management"
   $env:DB_USERNAME = "root"
   $env:DB_PASSWORD = "tu_contraseña_de_mysql"
   ```

   En Bash:

   ```bash
   export DB_URL="jdbc:mysql://localhost:3306/hr_management"
   export DB_USERNAME="root"
   export DB_PASSWORD="tu_contraseña_de_mysql"
   ```

   Ajusta el usuario, la contraseña y la URL según tu instalación. No guardes credenciales reales en el repositorio.

4. Inicia la aplicación desde esa misma terminal:

   ```powershell
   .\mvnw.cmd spring-boot:run
   ```

   En Linux o macOS:

   ```bash
   ./mvnw spring-boot:run
   ```

5. Abre la interfaz web en [http://localhost:8080/](http://localhost:8080/). La API queda disponible bajo `http://localhost:8080/api/employee`.

## Interfaz web

La página principal permite:

- Ver el directorio de empleados.
- Consultar un empleado por ID.
- Crear empleados y editar sus datos.
- Eliminar empleados con confirmación.

La interfaz usa la API del mismo servidor, así que no requiere un servidor frontend ni configuración CORS adicional.

## API de empleados

La ruta base es `/api/employee`.

| Método | Endpoint | Descripción | Respuesta correcta |
| --- | --- | --- | --- |
| `GET` | `/api/employee` | Lista todos los empleados. | `200 OK` |
| `GET` | `/api/employee/{id}` | Obtiene un empleado por ID. | `200 OK` |
| `POST` | `/api/employee` | Crea un empleado. | `201 Created` |
| `PUT` | `/api/employee/{id}` | Reemplaza los datos de un empleado. | `200 OK` |
| `DELETE` | `/api/employee/{id}` | Elimina un empleado. | `204 No Content` |

### Ejemplo de creación o actualización

`POST /api/employee` y `PUT /api/employee/{id}` reciben un objeto JSON con estos campos:

```json
{
  "firstName": "Ana",
  "lastName": "García",
  "email": "ana.garcia@example.com",
  "phone": "+34 600 123 456",
  "hireDate": "2025-04-15",
  "salary": 32000.00,
  "active": true
}
```

`hireDate` usa el formato `YYYY-MM-DD`. El correo y el teléfono deben ser únicos. Al crear un empleado, el backend asigna el ID y establece su estado como activo.

### Errores principales

- `400 Bad Request`: los datos enviados no pasan la validación.
- `404 Not Found`: no existe el empleado indicado.
- `409 Conflict`: ya existe un empleado con ese correo electrónico.

## Pruebas

Ejecuta las pruebas con:

```powershell
.\mvnw.cmd test
```

Las pruebas que cargan el contexto de Spring necesitan una base de datos MySQL accesible con la configuración indicada arriba.

## Estructura del proyecto

- `controller`: endpoints REST.
- `service`: lógica de negocio.
- `repository`: acceso a datos con Spring Data JPA.
- `entity`: entidades persistidas.
- `exceptions`: excepciones de la API.
- `src/main/resources/static`: interfaz web.

## Estado del proyecto

Proyecto de aprendizaje en desarrollo. El CRUD de empleados está implementado; el CRUD de departamentos y la actualización parcial con `PATCH` están pendientes.

## Autor

Manuel Morales Morilla · [GitHub](https://github.com/moralesmorilla)
