\# HR Management API



API REST para la gestión de empleados de una empresa, desarrollada con Java 21 y Spring Boot.



El objetivo del proyecto es aprender Spring Boot mediante la construcción de una aplicación realista y terminar con un backend que pueda utilizarse como proyecto de portfolio.



\---



\# 1. Objetivo del proyecto



Construir una API REST profesional para gestionar:



\- Empleados

\- Departamentos

\- Puestos de trabajo

\- Nóminas

\- Vacaciones

\- Usuarios

\- Autenticación y autorización



La aplicación deberá incorporar:



\- Spring Boot

\- Spring Web

\- Spring Data JPA

\- Hibernate

\- MySQL

\- Jakarta Validation

\- Spring Security

\- JWT

\- Swagger / OpenAPI

\- JUnit

\- Mockito

\- MockMvc

\- Docker

\- Docker Compose

\- Git

\- GitHub



\---



\# 2. Objetivo de aprendizaje



El objetivo no es únicamente terminar una API funcional.



Al terminar el proyecto debo ser capaz de explicar:



\- Cómo funciona Spring Boot.

\- Qué es la inyección de dependencias.

\- Qué es un Bean.

\- Qué responsabilidad tiene un Controller.

\- Qué responsabilidad tiene un Service.

\- Qué responsabilidad tiene un Repository.

\- Cuándo utilizar interfaces.

\- Cómo funciona Spring Data JPA.

\- Cómo funcionan las relaciones entre entidades.

\- Por qué utilizar DTOs.

\- Cómo funcionan las validaciones.

\- Cómo gestionar excepciones.

\- Cómo funciona la autenticación.

\- Cómo funciona JWT.

\- Cómo funcionan los roles y permisos.

\- Cómo escribir tests.

\- Cómo dockerizar la aplicación.



La prioridad será:



> entender → implementar → probar → revisar → commit



\---



\# 3. Stack tecnológico



\## Backend



\- Java 21

\- Spring Boot

\- Spring Web

\- Spring Data JPA

\- Hibernate

\- Jakarta Validation

\- Spring Security



\## Base de datos



\- MySQL



\## Seguridad



\- JWT

\- BCrypt



\## Testing



\- JUnit

\- Mockito

\- MockMvc

# HR Management API

API REST para la gestión de empleados y recursos de una empresa.

Proyecto de aprendizaje y portfolio desarrollado con Java 21 y Spring Boot.

---

# Objetivo

Construir una API REST profesional que permita gestionar empleados, departamentos, puestos de trabajo, nóminas y vacaciones.

El proyecto evolucionará progresivamente hasta incorporar autenticación, autorización, JWT, tests, documentación y Docker.

El objetivo no es únicamente conseguir una API funcional.

Al finalizar debo ser capaz de explicar personalmente cómo funciona cada parte importante del proyecto y por qué se ha tomado cada decisión técnica.

---

# Stack

## Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Jakarta Validation
- Spring Security

## Base de datos

- MySQL

## Seguridad

- JWT
- BCrypt

## Testing

- JUnit
- Mockito
- MockMvc

## Documentación

- Swagger / OpenAPI

## DevOps

- Docker
- Docker Compose

## Control de versiones

- Git
- GitHub

---

# Arquitectura

La aplicación seguirá inicialmente una arquitectura por capas:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database