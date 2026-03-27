# DOCUMENTACIÓN TÉCNICA COMPLETA
## Sistema de Gestión de Liga Deportiva Universitaria

---

## ÍNDICE

1. [Visión General del Proyecto](#1-visión-general-del-proyecto)
2. [Arquitectura del Sistema](#2-arquitectura-del-sistema)
3. [Stack Tecnológico](#3-stack-tecnológico)
4. [Estructura del Proyecto](#4-estructura-del-proyecto)
5. [Backend - API RESTful](#5-backend---api-restful)
6. [Frontend - Angular](#6-frontend---angular)
7. [Base de Datos - MongoDB](#7-base-de-datos---mongodb)
8. [Autenticación y Seguridad](#8-autenticación-y-seguridad)
9. [Flujo de Datos](#9-flujo-de-datos)
10. [Componentes Principales](#10-componentes-principales)
11. [Despliegue y Configuración](#11-despliegue-y-configuración)

---

## 1. VISIÓN GENERAL DEL PROYECTO

### 1.1 Descripción

Sistema web completo para la gestión de una liga deportiva universitaria que permite administrar:
- Equipos deportivos de diferentes disciplinas (Fútbol, Baloncesto, Voleibol, Balonmano)
- Jugadores con sus estadísticas individuales
- Árbitros asignados a partidos
- Partidos y resultados
- Clasificaciones en tiempo real
- Sistema de usuarios con roles diferenciados

### 1.2 Objetivos

- Centralizar la información deportiva universitaria
- Facilitar la gestión de partidos para administradores
- Proporcionar acceso a información actualizada para usuarios
- Mantener estadísticas precisas de equipos y jugadores
- Implementar un sistema seguro de autenticación

### 1.3 Características Principales

✅ **Autenticación JWT**: Sistema seguro de login y registro
✅ **Roles de Usuario**: Admin, Usuario, Árbitro, Capitán
✅ **CRUD Completo**: Gestión total de todas las entidades
✅ **Responsive Design**: Funciona en móviles, tablets y desktop
✅ **Tiempo Real**: Actualización automática de clasificaciones
✅ **Seguridad**: Contraseñas encriptadas, rutas protegidas

---

## 2. ARQUITECTURA DEL SISTEMA

### 2.1 Arquitectura General

El proyecto sigue una arquitectura **Cliente-Servidor** con separación clara entre frontend y backend:

```
┌─────────────────────────────────────────────────────────────┐
│                        NAVEGADOR                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │          ANGULAR FRONTEND (Puerto 4200)            │     │
│  │  ┌──────────────────────────────────────────────┐  │     │
│  │  │  Componentes (UI)                            │  │     │
│  │  │  - Home, Equipos, Jugadores, Arbitros       │  │     │
│  │  │  - Clasificaciones, Resultados, Admin       │  │     │
│  │  └──────────────────────────────────────────────┘  │     │
│  │  ┌──────────────────────────────────────────────┐  │     │
│  │  │  Servicios                                   │  │     │
│  │  │  - Auth Service (Autenticación)             │  │     │
│  │  │  - Database Service (API Calls)             │  │     │
│  │  └──────────────────────────────────────────────┘  │     │
│  │  ┌──────────────────────────────────────────────┐  │     │
│  │  │  Models (TypeScript Interfaces)             │  │     │
│  │  │  - User, Equipo, Jugador, Arbitro, Partido │  │     │
│  │  └──────────────────────────────────────────────┘  │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP Requests (JSON)
                            │ Headers: JWT Token
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              NODE.JS + EXPRESS (Puerto 3000)                 │
│  ┌────────────────────────────────────────────────────┐     │
│  │                    API REST                        │     │
│  │  ┌──────────────────────────────────────────────┐  │     │
│  │  │  Rutas (Routes)                              │  │     │
│  │  │  - /api/auth    - /api/equipos              │  │     │
│  │  │  - /api/jugadores - /api/arbitros           │  │     │
│  │  │  - /api/partidos                            │  │     │
│  │  └──────────────────────────────────────────────┘  │     │
│  │  ┌──────────────────────────────────────────────┐  │     │
│  │  │  Middleware                                  │  │     │
│  │  │  - CORS, JSON Parser                        │  │     │
│  │  │  - Auth Middleware (JWT Verification)       │  │     │
│  │  └──────────────────────────────────────────────┘  │     │
│  │  ┌──────────────────────────────────────────────┐  │     │
│  │  │  Models (Mongoose Schemas)                   │  │     │
│  │  │  - User, Equipo, Jugador, Arbitro, Partido  │  │     │
│  │  └──────────────────────────────────────────────┘  │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Mongoose ODM
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    MONGODB DATABASE                          │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Colecciones:                                      │     │
│  │  - users                                           │     │
│  │  - equipos                                         │     │
│  │  - jugadores                                       │     │
│  │  - arbitros                                        │     │
│  │  - partidos                                        │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Patrón de Diseño

El proyecto implementa varios patrones de diseño:

#### Frontend (Angular):
- **MVC (Model-View-Controller)**: Separación de componentes, servicios y modelos
- **Dependency Injection**: Inyección de servicios en componentes
- **Observer Pattern**: RxJS Observables para manejo de datos asíncronos
- **Singleton**: Servicios compartidos en toda la aplicación
- **Guard Pattern**: Protección de rutas con guardias

#### Backend (Express):
- **REST API**: Endpoints siguiendo convenciones REST
- **Middleware Pattern**: Cadena de procesamiento de peticiones
- **Repository Pattern**: Mongoose como capa de abstracción de datos
- **MVC**: Separación en rutas, controladores (implícitos) y modelos

---

## 3. STACK TECNOLÓGICO

### 3.1 Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Angular** | 21.0.3 | Framework principal de frontend |
| **TypeScript** | 5.9.3 | Lenguaje de programación tipado |
| **RxJS** | 7.8.1 | Programación reactiva |
| **Bootstrap** | 5.3.8 | Framework CSS para diseño responsive |
| **Font Awesome** | 7.1.0 | Iconos y símbolos |

**¿Por qué Angular?**
- Framework completo con todas las herramientas incluidas
- TypeScript proporciona seguridad de tipos
- Excelente para aplicaciones empresariales escalables
- Inyección de dependencias nativa
- Router integrado para SPA

### 3.2 Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | 18+ | Runtime de JavaScript |
| **Express** | 4.21.1 | Framework web minimalista |
| **MongoDB** | 5+ | Base de datos NoSQL |
| **Mongoose** | 8.8.4 | ODM para MongoDB |
| **bcryptjs** | 2.4.3 | Encriptación de contraseñas |
| **jsonwebtoken** | 9.0.2 | Generación y validación de JWT |
| **cors** | 2.8.5 | Middleware para CORS |
| **dotenv** | 16.4.7 | Gestión de variables de entorno |

**¿Por qué esta combinación?**
- Node.js permite usar JavaScript en backend
- Express es ligero y flexible
- MongoDB es escalable y almacena documentos JSON
- JWT proporciona autenticación stateless

---

## 4. ESTRUCTURA DEL PROYECTO

### 4.1 Árbol de Directorios

```
liga-deportiva/
│
├── backend/                          # Servidor Node.js
│   ├── middleware/
│   │   └── auth.js                  # Middleware de autenticación JWT
│   ├── models/
│   │   ├── User.js                  # Modelo de usuario
│   │   ├── Equipo.js                # Modelo de equipo
│   │   ├── Jugador.js               # Modelo de jugador
│   │   ├── Arbitro.js               # Modelo de árbitro
│   │   └── Partido.js               # Modelo de partido
│   ├── routes/
│   │   ├── auth.js                  # Rutas de autenticación
│   │   ├── equipos.js               # Rutas CRUD de equipos
│   │   ├── jugadores.js             # Rutas CRUD de jugadores
│   │   ├── arbitros.js              # Rutas CRUD de árbitros
│   │   └── partidos.js              # Rutas CRUD de partidos
│   ├── .env                         # Variables de entorno
│   ├── .env.example                 # Ejemplo de variables
│   ├── server.js                    # Punto de entrada del servidor
│   ├── seed.js                      # Script para poblar la BD
│   └── package.json                 # Dependencias del backend
│
└── src/                             # Aplicación Angular
    ├── app/
    │   ├── components/
    │   │   ├── navbar/              # Barra de navegación
    │   │   │   ├── navbar.ts
    │   │   │   ├── navbar.html
    │   │   │   └── navbar.css
    │   │   └── footer/              # Pie de página
    │   │       ├── footer.ts
    │   │       ├── footer.html
    │   │       └── footer.css
    │   ├── pages/
    │   │   ├── home/                # Página principal
    │   │   ├── equipos/             # Lista de equipos
    │   │   ├── jugadores/           # Lista de jugadores
    │   │   ├── arbitros/            # Lista de árbitros
    │   │   ├── resultados/          # Resultados de partidos
    │   │   ├── clasificaciones/     # Tablas de clasificación
    │   │   ├── contacto/            # Formulario de contacto
    │   │   ├── login/               # Inicio de sesión
    │   │   ├── registro/            # Registro de usuario
    │   │   └── admin-partidos/      # Panel admin
    │   ├── services/
    │   │   ├── auth.ts              # Servicio de autenticación
    │   │   └── database.ts          # Servicio de API calls
    │   ├── models/
    │   │   ├── user.model.ts
    │   │   ├── equipo.model.ts
    │   │   ├── jugador.model.ts
    │   │   ├── arbitro.model.ts
    │   │   └── partido.model.ts
    │   ├── guards/
    │   │   └── admin.guard.ts       # Protección de rutas admin
    │   ├── app.component.ts         # Componente raíz
    │   └── app.routes.ts            # Configuración de rutas
    ├── global_styles.css            # Estilos globales
    ├── index.html                   # HTML principal
    └── main.ts                      # Bootstrap de Angular
```

---

## 5. BACKEND - API RESTful

### 5.1 Servidor Principal (server.js)

El servidor Express configura:

1. **Middleware Global**:
   - `cors()`: Permite peticiones cross-origin desde Angular
   - `express.json()`: Parsea bodies JSON automáticamente

2. **Conexión a MongoDB**:
   ```javascript
   mongoose.connect(process.env.MONGODB_URI)
   ```
   - Usa Mongoose como ODM (Object Data Modeling)
   - La conexión es asíncrona y maneja errores

3. **Registro de Rutas**:
   - Cada entidad tiene su propio archivo de rutas
   - Prefijo `/api` para todas las rutas

### 5.2 Modelos de Datos (Mongoose Schemas)

#### Ejemplo: Modelo de Usuario (User.js)

```javascript
const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tipo: {
    type: String,
    enum: ['admin', 'usuario', 'arbitro', 'capitan'],
    default: 'usuario'
  },
  equipoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipo'
  }
}, { timestamps: true });
```

**Características importantes**:
- `timestamps: true`: Añade automáticamente `createdAt` y `updatedAt`
- `ref: 'Equipo'`: Permite hacer `populate()` para traer datos relacionados
- Validaciones a nivel de esquema

#### Relaciones entre Modelos

```
User ─────┐
          │ equipoId
          ▼
        Equipo ◄────┐ equipoId
          │         │
          │         │
Jugador ──┘         │
                    │
Arbitro ────┐       │
            │       │
            ▼       │
          Partido ──┘ equipoLocal/equipoVisitante
```

### 5.3 Rutas y Endpoints

#### Autenticación (/api/auth)

```
POST /api/auth/register
Body: { nombre, email, password, tipo?, equipoId? }
Response: { success, message, token, user }

POST /api/auth/login
Body: { email, password }
Response: { success, message, token, user }
```

#### Equipos (/api/equipos)

```
GET    /api/equipos              # Listar todos
GET    /api/equipos/:id          # Obtener uno
POST   /api/equipos              # Crear (requiere auth)
PUT    /api/equipos/:id          # Actualizar (requiere auth)
DELETE /api/equipos/:id          # Eliminar (requiere auth)
```

#### Partidos (/api/partidos)

```
GET    /api/partidos                    # Listar todos
GET    /api/partidos/:id                # Obtener uno
GET    /api/partidos/arbitro/:arbitroId # Por árbitro
GET    /api/partidos/equipo/:equipoId   # Por equipo
POST   /api/partidos                    # Crear (requiere auth)
PUT    /api/partidos/:id                # Actualizar (requiere auth)
DELETE /api/partidos/:id                # Eliminar (requiere auth)
```

### 5.4 Middleware de Autenticación

El middleware `auth.js` protege rutas verificando el token JWT:

```javascript
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
```

**Uso en rutas**:
```javascript
router.post('/equipos', auth, async (req, res) => {
  // Solo accesible con token válido
});
```

---

## 6. FRONTEND - ANGULAR

### 6.1 Estructura de Componentes

#### 6.1.1 Componentes Standalone

Todos los componentes usan la nueva API standalone de Angular 21:

```typescript
@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './equipos.html',
  styleUrl: './equipos.css'
})
export class Equipos implements OnInit {
  // Lógica del componente
}
```

**Ventajas**:
- No necesitan `NgModule`
- Imports explícitos y claros
- Mejor tree-shaking
- Más fáciles de testar

#### 6.1.2 Ciclo de Vida

```typescript
export class Equipos implements OnInit {
  constructor(private db: Database) {}

  // Se ejecuta después de crear el componente
  ngOnInit() {
    this.cargarEquipos();
  }
}
```

### 6.2 Servicios

#### 6.2.1 Auth Service (auth.ts)

Gestiona toda la autenticación:

```typescript
export class Auth {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    // Recupera usuario de localStorage
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          if (response.success && response.user) {
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            localStorage.setItem('token', response.token!);
            this.currentUserSubject.next(response.user);
          }
        })
      );
  }
}
```

**Características clave**:
- **BehaviorSubject**: Mantiene el último valor y permite suscripciones
- **localStorage**: Persiste sesión entre recargas
- **Observables**: Comunicación reactiva con componentes
- **tap operator**: Ejecuta efectos secundarios sin modificar el stream

#### 6.2.2 Database Service (database.ts)

Centraliza todas las llamadas al API:

```typescript
export class Database {
  private apiUrl = 'http://localhost:3000/api';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getEquipos(): Observable<Equipo[]> {
    return this.http.get<ApiResponse<Equipo[]>>(`${this.apiUrl}/equipos`,
      { headers: this.getHeaders() })
      .pipe(
        map(response => response.data || []),
        catchError(this.handleError<Equipo[]>('getEquipos', []))
      );
  }
}
```

**Patrones implementados**:
- Headers dinámicos con token JWT
- Transformación de respuestas con `map`
- Manejo centralizado de errores
- Tipado fuerte con generics

### 6.3 Routing

#### 6.3.1 Configuración de Rutas (app.routes.ts)

```typescript
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'equipos', component: Equipos },
  { path: 'admin/partidos', component: AdminPartidos, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];
```

#### 6.3.2 Guardias de Ruta (admin.guard.ts)

```typescript
export const adminGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  const user = auth.currentUserValue;

  if (user && user.tipo === 'admin') {
    return true;
  }

  router.navigate(['/']);
  return false;
};
```

**Flujo de protección**:
1. Usuario intenta acceder a ruta protegida
2. Guard verifica rol del usuario
3. Si es admin → permite acceso
4. Si no es admin → redirige a home

### 6.4 Comunicación con Backend

#### 6.4.1 Flujo de una Petición

```
Componente                 Servicio                Backend
    │                          │                      │
    │──① cargarEquipos()───────▶│                      │
    │                          │                      │
    │                          │──② GET /api/equipos─▶│
    │                          │   Headers: JWT       │
    │                          │                      │
    │                          │◀─③ JSON Response────│
    │                          │   { data: [...] }    │
    │                          │                      │
    │◀─④ Observable.next()────│                      │
    │   equipos: Equipo[]      │                      │
    │                          │                      │
    └──⑤ Renderiza UI          │                      │
```

#### 6.4.2 Ejemplo Completo

**Componente**:
```typescript
export class Equipos implements OnInit {
  equipos: Equipo[] = [];
  cargando = true;

  constructor(private db: Database) {}

  ngOnInit() {
    this.cargarEquipos();
  }

  cargarEquipos() {
    this.cargando = true;
    this.db.getEquipos().subscribe({
      next: (equipos) => {
        this.equipos = equipos;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.cargando = false;
      }
    });
  }
}
```

**Template**:
```html
<div *ngIf="cargando">Cargando...</div>

<div *ngFor="let equipo of equipos" class="card">
  <h3>{{ equipo.nombre }}</h3>
  <p>{{ equipo.deporte }}</p>
</div>
```

---

## 7. BASE DE DATOS - MONGODB

### 7.1 Diseño de Colecciones

#### Colección: users
```json
{
  "_id": "ObjectId",
  "nombre": "Admin Usuario",
  "email": "admin@liga.com",
  "password": "$2a$10$...",  // Hash bcrypt
  "tipo": "admin",
  "equipoId": "ObjectId | null",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

#### Colección: equipos
```json
{
  "_id": "ObjectId",
  "nombre": "Tigres FC",
  "deporte": "Fútbol",
  "jugadores": ["ObjectId", "ObjectId"],
  "capitanId": "ObjectId",
  "victorias": 5,
  "derrotas": 2,
  "empates": 1,
  "puntos": 16,
  "golesFavor": 15,
  "golesContra": 8,
  "escudo": "url",
  "createdAt": "ISODate"
}
```

#### Colección: partidos
```json
{
  "_id": "ObjectId",
  "equipoLocal": "ObjectId",
  "equipoVisitante": "ObjectId",
  "deporte": "Fútbol",
  "fecha": "ISODate",
  "hora": "19:00",
  "ubicacion": "Estadio Principal",
  "arbitroId": "ObjectId",
  "golesLocal": 2,
  "golesVisitante": 1,
  "estado": "finalizado",
  "jornada": 5,
  "observaciones": "Gran partido",
  "createdAt": "ISODate"
}
```

### 7.2 Populate y Referencias

Mongoose permite "popular" referencias automáticamente:

```javascript
// Sin populate
const partido = await Partido.findById(id);
// partido.equipoLocal = "507f1f77bcf86cd799439011"

// Con populate
const partido = await Partido.findById(id)
  .populate('equipoLocal')
  .populate('equipoVisitante')
  .populate('arbitroId');
// partido.equipoLocal = { _id: "...", nombre: "Tigres FC", ... }
```

### 7.3 Índices

Para optimizar consultas:

```javascript
UserSchema.index({ email: 1 });  // Índice único en email
EquipoSchema.index({ deporte: 1 });  // Búsquedas por deporte
PartidoSchema.index({ fecha: -1 });  // Ordenar por fecha desc
```

---

## 8. AUTENTICACIÓN Y SEGURIDAD

### 8.1 Flujo de Autenticación

```
┌────────────┐                                  ┌────────────┐
│  Frontend  │                                  │  Backend   │
└─────┬──────┘                                  └─────┬──────┘
      │                                               │
      │ 1. POST /api/auth/login                      │
      │    { email, password }                       │
      ├──────────────────────────────────────────────▶│
      │                                               │
      │                                               │ 2. Verifica
      │                                               │    email en DB
      │                                               │
      │                                               │ 3. Compara
      │                                               │    password con
      │                                               │    bcrypt
      │                                               │
      │ 4. { success, user, token }                  │
      │◀──────────────────────────────────────────────┤
      │                                               │
      │ 5. Guarda en localStorage:                   │
      │    - currentUser                             │
      │    - token                                   │
      │                                               │
      │ 6. GET /api/equipos                          │
      │    Headers: { Authorization: Bearer token }  │
      ├──────────────────────────────────────────────▶│
      │                                               │
      │                                               │ 7. Verifica
      │                                               │    JWT token
      │                                               │
      │ 8. { data: [...] }                           │
      │◀──────────────────────────────────────────────┤
      │                                               │
```

### 8.2 Seguridad de Contraseñas

#### En Registro:
```javascript
// Backend
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
user.password = hashedPassword;
```

#### En Login:
```javascript
// Backend
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  return res.status(400).json({ message: 'Credenciales inválidas' });
}
```

### 8.3 JSON Web Tokens (JWT)

#### Generación:
```javascript
const token = jwt.sign(
  { id: user._id, tipo: user.tipo },  // Payload
  process.env.JWT_SECRET,              // Clave secreta
  { expiresIn: '7d' }                  // Expiración
);
```

#### Verificación:
```javascript
const decoded = jwt.verify(token, process.env.JWT_SECRET);
// decoded = { id: "...", tipo: "admin", iat: ..., exp: ... }
```

### 8.4 Protección de Rutas

#### Frontend (Guards):
```typescript
// Protege rutas a nivel de Angular Router
{ path: 'admin/partidos', component: AdminPartidos, canActivate: [adminGuard] }
```

#### Backend (Middleware):
```javascript
// Protege endpoints del API
router.post('/equipos', auth, async (req, res) => {
  // Solo accesible con JWT válido
});
```

---

## 9. FLUJO DE DATOS

### 9.1 Flujo Completo de Crear un Partido

```
PASO 1: Usuario Admin abre el formulario
┌─────────────────────────────────────────┐
│ AdminPartidos Component                 │
│ - Carga equipos disponibles             │
│ - Carga árbitros disponibles            │
│ - Muestra formulario                    │
└─────────────────────────────────────────┘

PASO 2: Usuario llena el formulario
┌─────────────────────────────────────────┐
│ Formulario (Two-way binding)            │
│ - Equipo Local: [Select]                │
│ - Equipo Visitante: [Select]            │
│ - Fecha: [Date]                         │
│ - Árbitro: [Select]                     │
│ - ...otros campos                       │
└─────────────────────────────────────────┘

PASO 3: Click en "Guardar"
┌─────────────────────────────────────────┐
│ guardarPartido() {                      │
│   this.db.createPartido(partidoForm)    │
│     .subscribe(...)                     │
│ }                                       │
└─────────────────────────────────────────┘

PASO 4: Database Service hace la petición
┌─────────────────────────────────────────┐
│ POST http://localhost:3000/api/partidos │
│ Headers: {                              │
│   Authorization: Bearer eyJhbGc...     │
│   Content-Type: application/json       │
│ }                                       │
│ Body: {                                 │
│   equipoLocal: "507f...",              │
│   equipoVisitante: "607f...",          │
│   fecha: "2024-06-15",                 │
│   ...                                  │
│ }                                       │
└─────────────────────────────────────────┘

PASO 5: Backend procesa la petición
┌─────────────────────────────────────────┐
│ 1. Middleware auth verifica JWT         │
│ 2. Valida que usuario es admin          │
│ 3. Crea documento en MongoDB            │
│ 4. Retorna partido creado               │
└─────────────────────────────────────────┘

PASO 6: Frontend recibe respuesta
┌─────────────────────────────────────────┐
│ next: (partido) => {                    │
│   this.partidos.push(partido);          │
│   this.mostrarFormulario = false;       │
│   // Partido aparece en la lista        │
│ }                                       │
└─────────────────────────────────────────┘
```

### 9.2 Actualización de Clasificaciones

Las clasificaciones se calculan en tiempo real en el frontend:

```typescript
get clasificacionActual(): any[] {
  return this.equipos
    .filter(equipo => equipo.deporte === this.deporteSeleccionado)
    .sort((a, b) => {
      // 1. Por puntos
      if (b.puntos !== a.puntos) return b.puntos - a.puntos;

      // 2. Por diferencia de goles
      const difA = a.golesFavor - a.golesContra;
      const difB = b.golesFavor - b.golesContra;
      if (difB !== difA) return difB - difA;

      // 3. Por goles a favor
      return b.golesFavor - a.golesFavor;
    })
    .map((equipo, index) => ({
      ...equipo,
      posicion: index + 1
    }));
}
```

---

## 10. COMPONENTES PRINCIPALES

### 10.1 Navbar Component

**Responsabilidades**:
- Mostrar logo y links de navegación
- Mostrar estado de autenticación
- Mostrar opciones según rol de usuario
- Permitir logout

**Características técnicas**:
- Se suscribe a `auth.currentUser` para reactividad
- Usa `*ngIf` para mostrar/ocultar opciones
- Implementa `OnDestroy` para limpiar suscripciones

### 10.2 AdminPartidos Component

**Responsabilidades**:
- Listar todos los partidos
- Crear nuevos partidos
- Editar partidos existentes
- Eliminar partidos
- Filtrar por deporte/estado

**Operaciones CRUD**:

```typescript
// CREATE
guardarPartido() {
  this.db.createPartido(this.partidoForm).subscribe(...)
}

// READ
cargarDatos() {
  this.db.getPartidos().subscribe(...)
}

// UPDATE
editarPartido(partido) {
  this.db.updatePartido(partido._id, updates).subscribe(...)
}

// DELETE
eliminarPartido(id) {
  this.db.deletePartido(id).subscribe(...)
}
```

### 10.3 Login Component

**Flujo de inicio de sesión**:

```typescript
login() {
  if (!this.loginForm.email || !this.loginForm.password) {
    this.error = 'Por favor completa todos los campos';
    return;
  }

  this.cargando = true;

  this.auth.login(this.loginForm).subscribe({
    next: (response) => {
      if (response.success) {
        this.router.navigate(['/']);
      } else {
        this.error = response.message;
      }
      this.cargando = false;
    },
    error: (error) => {
      this.error = 'Error al iniciar sesión';
      this.cargando = false;
    }
  });
}
```

### 10.4 Clasificaciones Component

**Cálculo de clasificaciones**:

```typescript
// Los equipos se ordenan por:
// 1. Puntos (3 por victoria, 1 por empate)
// 2. Diferencia de goles
// 3. Goles a favor

get clasificacionActual(): any[] {
  return this.equipos
    .filter(equipo => equipo.deporte === this.deporteSeleccionado)
    .sort((a, b) => {
      if (b.puntos !== a.puntos) return b.puntos - a.puntos;
      const difA = a.golesFavor - a.golesContra;
      const difB = b.golesFavor - b.golesContra;
      if (difB !== difA) return difB - difA;
      return b.golesFavor - a.golesFavor;
    });
}
```

---

## 11. DESPLIEGUE Y CONFIGURACIÓN

### 11.1 Variables de Entorno

#### Backend (.env)
```bash
MONGODB_URI=mongodb://localhost:27017/liga-deportiva
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
PORT=3000
```

#### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

### 11.2 Scripts de Inicio

#### Backend
```bash
cd backend
npm install
npm start
```

#### Frontend
```bash
cd proyecto-angular
npm install
npm start
```

### 11.3 Poblar Base de Datos

```bash
cd backend
node seed.js
```

Este script crea:
- Usuario administrador
- Equipos de ejemplo
- Jugadores de ejemplo
- Árbitros de ejemplo
- Partidos de ejemplo

### 11.4 Compilación para Producción

#### Frontend
```bash
npm run build
# Genera carpeta dist/ con archivos optimizados
```

#### Backend
- El código Node.js no requiere compilación
- Configurar variables de entorno de producción
- Usar HTTPS en producción
- Configurar CORS para dominio específico

---

## RESUMEN TÉCNICO

### Decisiones de Diseño Clave

1. **Separación Frontend/Backend**: Permite escalar y desplegar independientemente
2. **JWT sin estado**: No requiere sesiones en servidor
3. **MongoDB**: Flexible para cambios en el esquema de datos
4. **Angular Standalone**: Componentes modulares y reutilizables
5. **RxJS**: Manejo elegante de operaciones asíncronas
6. **Bootstrap**: Diseño responsive sin CSS personalizado extenso

### Escalabilidad

El sistema puede escalar:
- **Horizontalmente**: Múltiples instancias del backend con load balancer
- **Verticalmente**: Más recursos al servidor
- **Base de datos**: MongoDB Atlas con réplicas y sharding

### Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Tokens JWT con expiración
- ✅ Validación de entrada en backend
- ✅ CORS configurado
- ✅ Rutas protegidas con guards y middleware
- ✅ Variables de entorno para secretos

---

**Documento creado para facilitar el mantenimiento y comprensión del sistema**
**Última actualización: 2024**
