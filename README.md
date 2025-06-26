# PIEPy Backend

**Plataforma Interactiva de Enseñanza Python - Backend**

Sistema backend para una plataforma educativa de programación que incluye gestión de cursos, prácticas interactivas, evaluaciones y un analizador de código en tiempo real.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [API Endpoints](#-api-endpoints)
- [Sandbox de Python](#-sandbox-de-python)
- [Arquitectura](#-arquitectura)
- [Base de Datos](#-base-de-datos)
- [Testing](#-testing)
- [Estado del Proyecto](#-estado-del-proyecto)

## ✨ Características

### 🎯 Funcionalidades Implementadas

- **📚 Gestión Inteligente de Cursos**

  - CRUD completo de cursos
  - Sistema de niveles adaptativos (Principiante → Intermedio → Avanzado)
  - Algoritmo de cursos ocultos basado en progreso del estudiante
  - Asociación con certificaciones y evaluaciones

- **💻 Analizador de Código Python en Tiempo Real**

  - Ejecución segura de código Python
  - Manejo de errores de sintaxis y ejecución
  - Sandbox aislado para cada ejecución
  - Respuesta inmediata con resultados

- **📝 Sistema de Prácticas Interactivas**

  - Prácticas con campos editables y no editables
  - Almacenamiento de respuestas por alumno
  - Guardado de resultados de ejecución
  - Asociación con cursos específicos

- **📊 Sistema de Evaluaciones y Certificaciones**

  - Gestión completa de evaluaciones
  - Sistema de certificaciones por curso
  - Tracking de notas y progreso
  - Relaciones alumno-evaluación

- **📖 Módulos de Aprendizaje**
  - Organización por niveles de dificultad
  - Contenido estructurado por curso
  - Progresión lógica de aprendizaje

### ⚠️ Pendiente de Implementación

- **🔐 Sistema de Autenticación**

  - Registro y login de usuarios
  - JWT y refresh tokens
  - Middleware de autenticación

- **👥 Gestión de Usuarios**
  - Controladores para alumnos e instructores
  - Perfiles y roles de usuario
  - Autorización por roles

## 🛠 Tecnologías

- **Backend**: Node.js + Express.js
- **Base de Datos**: PostgreSQL + Sequelize ORM
- **Autenticación**: JWT (configurado, pendiente implementación)
- **Seguridad**: bcrypt (configurado, pendiente implementación)
- **Testing**: Jest + Supertest
- **Herramientas**: Morgan (logs), CORS, dotenv

## 🚀 Instalación

### Prerrequisitos

- Node.js >= 16.x
- PostgreSQL >= 12.x
- Python >= 3.7 (para el analizador de código)

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/4drianC4/PIEPy-Backend.git
cd PIEPy-Backend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar base de datos**

```bash
# Crear la base de datos PostgreSQL
createdb piepy_db

# Ejecutar migraciones
npx sequelize-cli db:migrate

# (Opcional) Ejecutar seeders
npx sequelize-cli db:seed:all
```

4. **Configurar variables de entorno**

- Copiar `.env.example` a `.env` (si existe) o usar el `.env` actual
- Verificar configuración de base de datos

5. **Ejecutar en desarrollo**

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## ⚙️ Configuración

### Variables de Entorno

```properties
# Base de Datos PostgreSQL
NAMEDB=piepy_db
USERDB=postgres
PASSWORDDB=admin
HOSTDB=localhost
PORTDB=5432

# Servidor
PORT=3000
NODE_ENV=development

# JWT Authentication (configurado para futura implementación)
JWT_SECRET=piepy_super_secret_key_2025_secure_auth_token_development
JWT_REFRESH_SECRET=piepy_refresh_secret_key_2025_secure_token_development
JWT_EXPIRE=1h
JWT_REFRESH_EXPIRE=7d
BCRYPT_SALT_ROUNDS=12
```

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api`

### 📚 Cursos

```
GET    /cursos                           # Obtener todos los cursos
GET    /cursos/:id                       # Obtener curso por ID
GET    /cursos/ocultos/:idAlumno         # Cursos ocultos para un estudiante
GET    /cursos/disponibles/:idAlumno     # Cursos disponibles para un estudiante
POST   /cursos                           # Crear nuevo curso
PUT    /cursos/:id                       # Actualizar curso
DELETE /cursos/:id                       # Eliminar curso
```

### 💻 Analizador de Código

```
POST   /analizador                       # Analizar código Python
```

**Body:**

```json
{
  "codigo": "def saludar():\n    print('Hola mundo')\nsaludar()"
}
```

### 📝 Prácticas

```
GET    /practicas                        # Obtener todas las prácticas
GET    /practicas/:id                    # Obtener práctica por ID
POST   /practicas                        # Crear nueva práctica
```

### 📋 Campos de Prácticas

```
POST   /practica-campos                  # Crear líneas de práctica
PUT    /practica-campos/:id              # Editar líneas
GET    /practica-campos/:idPractica/lineas # Obtener líneas de práctica
```

### 📊 Evaluaciones

```
GET    /evaluaciones                     # Obtener todas las evaluaciones
GET    /evaluaciones/:id                 # Obtener evaluación por ID
POST   /evaluaciones                     # Crear nueva evaluación
PUT    /evaluaciones/:id                 # Actualizar evaluación
DELETE /evaluaciones/:id                 # Eliminar evaluación
```

### 🏆 Certificaciones

```
GET    /certificaciones                  # Obtener todas las certificaciones
GET    /certificaciones/:id              # Obtener certificación por ID
POST   /certificaciones                  # Crear nueva certificación
PUT    /certificaciones/:id              # Actualizar certificación
DELETE /certificaciones/:id              # Eliminar certificación
```

### 📖 Módulos de Aprendizaje

```
GET    /modulos-aprendizaje              # Obtener todos los módulos
GET    /modulos-aprendizaje/:id          # Obtener módulo por ID
POST   /modulos-aprendizaje              # Crear nuevo módulo
PUT    /modulos-aprendizaje/:id          # Actualizar módulo
DELETE /modulos-aprendizaje/:id          # Eliminar módulo
```

## 🐍 Sandbox de Python

### Funcionamiento

El sistema incluye un **analizador de código Python seguro** que permite ejecutar código de estudiantes de forma aislada:

#### Arquitectura del Sandbox

1. **Recepción de Código**: El endpoint `/api/analizador` recibe código Python en formato JSON
2. **Archivo Temporal**: Se crea un archivo `temp_code.py` con el código recibido
3. **Ejecución Aislada**: Se ejecuta usando `child_process.exec()` de Node.js
4. **Captura de Resultados**: Se capturan tanto `stdout` como `stderr`
5. **Limpieza**: El archivo temporal se elimina automáticamente
6. **Respuesta**: Se retorna el resultado o error al cliente

#### Flujo de Ejecución

```javascript
// 1. Código recibido
{
  "codigo": "print('Hola mundo')\nx = 5 + 3\nprint(f'Resultado: {x}')"
}

// 2. Archivo temporal creado: temp_code.py
// 3. Ejecutado con: python temp_code.py
// 4. Resultado capturado y retornado:
{
  "resultado": "Hola mundo\nResultado: 8\n"
}
```

#### Manejo de Errores

```javascript
// Código con error
{
  "codigo": "print('Hola mundo'\nprint('Sin cerrar paréntesis')"
}

// Respuesta de error
{
  "message": "Error analizando el código: SyntaxError: '(' was never closed"
}
```

#### Características de Seguridad

- ✅ **Ejecución Temporal**: Archivos se eliminan inmediatamente
- ✅ **Aislamiento**: Cada ejecución es independiente
- ✅ **Manejo de Errores**: Captura errores de sintaxis y ejecución
- ⚠️ **Nota**: Este es un sandbox básico. Para producción se recomienda:
  - Contenedores Docker
  - Límites de tiempo de ejecución
  - Límites de memoria y CPU
  - Restricciones de imports peligrosos

#### Ejemplo de Uso

```bash
# Solicitud
curl -X POST http://localhost:3000/api/analizador \
  -H "Content-Type: application/json" \
  -d '{
    "codigo": "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n-1)\n\nprint(factorial(5))"
  }'

# Respuesta
{
  "resultado": "120\n"
}
```

## 🏗 Arquitectura

### Estructura del Proyecto

```
PIEPy-Backend/
├── src/
│   ├── controllers/         # Lógica de controladores
│   │   ├── AnalizadorController.js
│   │   ├── CursoController.js
│   │   ├── EvaluacionController.js
│   │   └── ...
│   ├── services/           # Lógica de negocio
│   │   ├── AnalizadorService.js
│   │   ├── CursoService.js
│   │   └── ...
│   ├── models/             # Modelos Sequelize
│   │   ├── Alumnos.js
│   │   ├── Cursos.js
│   │   ├── Instructores.js
│   │   └── ...
│   ├── routes/             # Definición de rutas
│   │   ├── CursoRoutes.js
│   │   ├── AnalizadorRoutes.js
│   │   └── ...
│   └── server.js           # Configuración del servidor
├── config/
│   └── config.js           # Configuración de Sequelize
├── migrations/             # Migraciones de base de datos
├── seeders/               # Datos semilla
├── tests/                 # Pruebas unitarias e integración
└── .env                   # Variables de entorno
```

### Patrón de Arquitectura

**MVC (Model-View-Controller)**

- **Modelos**: Sequelize ORM para interacción con PostgreSQL
- **Controladores**: Manejo de requests/responses HTTP
- **Servicios**: Lógica de negocio centralizada
- **Rutas**: Definición de endpoints y middleware

## 🗄 Base de Datos

### Esquema Principal

#### Entidades Principales

- **alumnos**: Estudiantes del sistema
- **instructores**: Profesores y administradores
- **cursos**: Cursos disponibles
- **practicas**: Ejercicios prácticos
- **evaluaciones**: Exámenes y evaluaciones
- **certificaciones**: Certificados por curso completado

#### Relaciones Importantes

- **cursosAlumnos**: Inscripciones y progreso
- **alumnosPracticas**: Respuestas de prácticas
- **alumnosEvaluaciones**: Resultados de evaluaciones
- **moduloAprendizajes**: Contenido por niveles
- **practicaCampos**: Campos editables de prácticas
- **alumnoRespuestaPracticas**: Respuestas detalladas

### Sistema de Niveles

El sistema implementa un algoritmo inteligente de progresión:

1. **Niveles**: `principiante` → `intermedio` → `avanzado`
2. **Cursos Ocultos**: Se ocultan cursos > 1 nivel superior al alumno
3. **Progresión**: Basada en cursos completados exitosamente

## 🧪 Testing

### Ejecutar Pruebas

```bash
# Todas las pruebas
npm test

# Pruebas específicas
npm test -- tests/cursos.test.js
npm test -- tests/analizador.test.js
```

### Cobertura de Pruebas

- ✅ **Servidor**: Configuración y arranque
- ✅ **Cursos**: CRUD completo + sistema de niveles
- ✅ **Analizador**: Ejecución de código Python
- ✅ **Sistema de Cursos Ocultos**: Lógica de niveles

## 📊 Estado del Proyecto

### ✅ Completado (75%)

- **Base de Datos**: 100% - Todas las tablas y relaciones
- **APIs de Negocio**: 80% - Funcionalidades principales
- **Testing**: 60% - Pruebas básicas implementadas
- **Documentación**: 90% - Código bien documentado

### ❌ Pendiente (25%)

- **Autenticación**: 0% - JWT configurado pero no implementado
- **Autorización**: 0% - Sin control de roles
- **Seguridad**: 20% - Configuración básica solamente
- **APIs de Usuario**: 0% - Sin endpoints de usuario

### 🚧 Próximos Pasos

1. **Implementar Autenticación**

   - Instalar `jsonwebtoken` y `bcryptjs`
   - Crear `AuthController` y `AuthService`
   - Implementar login/register

2. **Añadir Seguridad**

   - Middleware de autenticación
   - Protección de rutas
   - Validación de roles

3. **Completar APIs de Usuario**
   - CRUD de alumnos e instructores
   - Gestión de perfiles
   - Dashboard de progreso

## 📝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👥 Autores

- GitHub: [@4drianC4](https://github.com/4drianC4/PIEPy-Backend)

---

**Nota**: Este es un proyecto educativo en desarrollo. El sistema de autenticación y algunas características de seguridad están pendientes de implementación.
