# Backend Laravel - Liga Deportiva IES Maestre de Calatrava

Backend API RESTful desarrollado con Laravel para la gestión de la Liga Deportiva del IES Maestre de Calatrava.

## Requisitos

- PHP >= 8.2
- Composer
- MySQL / MariaDB
- Node.js (opcional, para frontend)

## Instalación

1. **Clonar o copiar el proyecto**

2. **Instalar dependencias**
   ```bash
   composer install
   ```

3. **Configurar el archivo de entorno**
   ```bash
   cp .env.example .env
   ```

4. **Configurar la base de datos en `.env`**
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=liga_maestre
   DB_USERNAME=root
   DB_PASSWORD=tu_contraseña
   ```

5. **Generar la clave de la aplicación**
   ```bash
   php artisan key:generate
   ```

6. **Ejecutar las migraciones**
   ```bash
   php artisan migrate
   ```

7. **Ejecutar los seeders (datos de ejemplo)**
   ```bash
   php artisan db:seed
   ```

8. **Iniciar el servidor de desarrollo**
   ```bash
   php artisan serve
   ```

El servidor estará disponible en `http://localhost:8000`

## Estructura de la Base de Datos

### Tablas

| Tabla | Descripción |
|-------|-------------|
| `clubs` | Clubes deportivos |
| `jugadores` | Jugadores de cada club |
| `ligas` | Competiciones/ligas |
| `partidos` | Partidos entre clubes |
| `users` | Usuarios del sistema |

### Relaciones

- **Club → Jugadores**: Un club tiene muchos jugadores (1:N)
- **Liga → Partidos**: Una liga tiene muchos partidos (1:N)
- **Partido → Clubes**: Un partido pertenece a dos clubes (club_local, club_visitante)

## Endpoints de la API

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/logout` | Cerrar sesión (requiere auth) |
| GET | `/api/auth/me` | Obtener usuario actual (requiere auth) |

### Clubes

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| GET | `/api/clubs` | Listar todos los clubes | Público |
| GET | `/api/clubs/{id}` | Obtener un club | Público |
| POST | `/api/clubs` | Crear club | Admin |
| PUT | `/api/clubs/{id}` | Actualizar club | Admin |
| DELETE | `/api/clubs/{id}` | Eliminar club | Admin |

### Jugadores

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| GET | `/api/jugadores` | Listar todos los jugadores | Público |
| GET | `/api/jugadores/{id}` | Obtener un jugador | Público |
| GET | `/api/clubs/{clubId}/jugadores` | Jugadores por club | Público |
| POST | `/api/jugadores` | Crear jugador | Admin |
| PUT | `/api/jugadores/{id}` | Actualizar jugador | Admin |
| DELETE | `/api/jugadores/{id}` | Eliminar jugador | Admin |

### Ligas

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| GET | `/api/ligas` | Listar todas las ligas | Público |
| GET | `/api/ligas/{id}` | Obtener una liga | Público |
| POST | `/api/ligas` | Crear liga | Admin |
| PUT | `/api/ligas/{id}` | Actualizar liga | Admin |
| DELETE | `/api/ligas/{id}` | Eliminar liga | Admin |

### Partidos

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| GET | `/api/partidos` | Listar todos los partidos | Público |
| GET | `/api/partidos/{id}` | Obtener un partido | Público |
| GET | `/api/ligas/{ligaId}/partidos` | Partidos por liga | Público |
| POST | `/api/partidos` | Crear partido | Admin |
| PUT | `/api/partidos/{id}` | Actualizar partido | Admin |
| DELETE | `/api/partidos/{id}` | Eliminar partido | Admin |

## Usuarios de Prueba

| Email | Contraseña | Rol |
|-------|------------|-----|
| admin@ligamaestre.com | admin123 | admin |
| usuario@ligamaestre.com | usuario123 | usuario |
| arbitro@ligamaestre.com | arbitro123 | arbitro |
| capitan@ligamaestre.com | capitan123 | capitan |

## Middleware de Administrador

Las rutas de creación, actualización y eliminación están protegidas por:
1. **auth:sanctum**: Requiere token de autenticación
2. **admin**: Verifica que el usuario tenga rol de administrador

## Validaciones

Cada controlador implementa validaciones para:
- Campos requeridos
- Tipos de datos correctos
- Longitudes máximas
- Existencia de relaciones (foreign keys)
- Formato de resultados (ej: "2-1")

## Pruebas con Postman

1. **Login** (obtener token):
   ```
   POST http://localhost:8000/api/auth/login
   Body (JSON): { "email": "admin@ligamaestre.com", "password": "admin123" }
   ```

2. **Usar el token** en las cabeceras:
   ```
   Authorization: Bearer {tu_token}
   ```

3. **Probar endpoints protegidos** con el token de admin.

## Conexión con Angular

Para conectar con el frontend Angular, configurar CORS y actualizar la URL de la API en el servicio Angular:

```typescript
// En el servicio de Angular
private apiUrl = 'http://localhost:8000/api';
```

---

Desarrollado para el módulo de Frameworks - 2º DAM
IES Maestre de Calatrava
