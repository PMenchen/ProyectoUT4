# 🚀 Inicio Rápido - Liga Deportiva

Este documento te guía para poner en marcha el proyecto completo en menos de 10 minutos.

## 📋 Requisitos

- Node.js v16+ instalado
- Cuenta gratuita en MongoDB Atlas
- Navegador web moderno

## 🎯 Pasos de Instalación

### 1. Configurar MongoDB Atlas (5 minutos)

Sigue la guía detallada en: [`backend/SETUP_MONGODB.md`](backend/SETUP_MONGODB.md)

**Resumen rápido:**
1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear cluster gratuito (M0)
3. Crear usuario de base de datos
4. Configurar acceso de red (0.0.0.0/0)
5. Obtener connection string

### 2. Configurar Backend (2 minutos)

```bash
# Ir a la carpeta backend
cd backend

# Copiar archivo de configuración
cp .env.example .env

# Editar .env con tu connection string de MongoDB
# Reemplaza las siguientes variables:
# MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/LigaDeportiva
# JWT_SECRET=tu_clave_secreta_cambiar_esto

# Instalar dependencias
npm install

# Poblar base de datos con datos de prueba
npm run seed

# Iniciar servidor backend
npm run dev
```

**Deberías ver:**
```
✅ MongoDB conectado exitosamente
🚀 Servidor corriendo en http://localhost:3000
```

### 3. Configurar Frontend (1 minuto)

Abre una **nueva terminal** y ejecuta:

```bash
# Ir a la carpeta raíz del proyecto (no backend)
cd ..

# Instalar dependencias (si no lo has hecho)
npm install

# Iniciar servidor Angular
npm start
```

**Deberías ver:**
```
✔ Browser application bundle generation complete.
✔ Compiled successfully.
```

### 4. Abrir la Aplicación

Ve a: **http://localhost:4200**

## 👥 Credenciales de Prueba

Después de ejecutar `npm run seed`, usa estas credenciales:

### 🔴 Administrador (Acceso Total)
```
Email: admin@liga.com
Password: 123456
```
**Puede:**
- Ver, crear, editar y eliminar equipos, jugadores, árbitros
- Crear partidos y asignar árbitros
- Modificar resultados de cualquier partido
- Acceso completo al sistema

---

### ⚽ Árbitro (Carlos Referee)
```
Email: carlos@liga.com
Password: 123456
```
**Puede:**
- Ver solo los partidos asignados a él
- Actualizar resultados de sus partidos
- Cambiar estado del partido (pendiente/en_progreso/finalizado)
- Añadir observaciones

---

### 👤 Usuario Normal (Equipo: Los Tigres)
```
Email: usuario@liga.com
Password: 123456
```
**Puede:**
- Ver solo partidos de su equipo (Los Tigres)
- Ver clasificaciones generales
- Ver equipos, jugadores y árbitros (solo lectura)

## 🧪 Probar la Aplicación

### Test 1: Login como Admin
1. Ve a http://localhost:4200/login
2. Ingresa: `admin@liga.com` / `123456`
3. Deberías ver el home con acceso a todas las secciones

### Test 2: Ver Equipos
1. Haz clic en "Equipos" en el menú
2. Deberías ver: Los Tigres, Águilas FC, Lobos Basket, Panteras Volley
3. Haz clic en un equipo para ver sus detalles

### Test 3: Ver Partidos Filtrados por Rol
1. **Como Admin**: Ve a Resultados → Verás TODOS los partidos
2. Haz logout
3. **Como Árbitro**: Login con `carlos@liga.com` → Verás solo partidos asignados a Carlos
4. Haz logout
5. **Como Usuario**: Login con `usuario@liga.com` → Verás solo partidos de Los Tigres

### Test 4: Crear un Partido (Solo Admin)
1. Login como admin
2. Ve a la sección de administración
3. Crea un nuevo partido entre dos equipos
4. Asigna un árbitro

## 🏗️ Estructura del Proyecto

```
liga-deportiva/
├── backend/                    # Backend Node.js + Express + MongoDB
│   ├── models/                # Modelos de MongoDB
│   ├── routes/                # Endpoints de la API
│   ├── middleware/            # JWT y autenticación
│   ├── server.js             # Servidor principal
│   ├── seed.js               # Script de datos de prueba
│   └── .env                  # Variables de entorno
│
├── src/                       # Frontend Angular
│   ├── app/
│   │   ├── components/       # Navbar, Footer
│   │   ├── pages/            # Home, Equipos, Login, etc.
│   │   ├── services/         # Auth y Database services
│   │   └── models/           # Interfaces TypeScript
│   ├── global_styles.css     # Estilos globales
│   └── index.html            # HTML principal
│
└── package.json              # Dependencias frontend
```

## 📡 API Endpoints

El backend expone estos endpoints:

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Usuario actual

### Recursos (CRUD)
- `/api/equipos` - Equipos
- `/api/jugadores` - Jugadores
- `/api/arbitros` - Árbitros
- `/api/partidos` - Partidos (filtrado automático por rol)

Ver documentación completa en [`backend/README.md`](backend/README.md)

## 🔍 Verificar que Todo Funciona

### Backend (Terminal 1)
```bash
cd backend
npm run dev
```
✅ Debería mostrar: "MongoDB conectado" y "Servidor corriendo"

### Frontend (Terminal 2)
```bash
npm start
```
✅ Debería mostrar: "Compiled successfully"

### Navegador
```
http://localhost:4200
```
✅ Debería cargar la página de inicio

### MongoDB Atlas
```
Database → Browse Collections → LigaDeportiva
```
✅ Deberías ver 5 colecciones con datos

## 🐛 Solución de Problemas

### Backend no conecta a MongoDB
```bash
# Error: MongooseServerSelectionError
```
**Solución:**
1. Verifica el `.env` en la carpeta `backend`
2. Asegúrate de que la contraseña sea correcta (sin `<>`)
3. Verifica Network Access en MongoDB Atlas (0.0.0.0/0)

### Frontend no carga datos
```bash
# Error: CORS o Failed to fetch
```
**Solución:**
1. Asegúrate de que el backend esté corriendo (`npm run dev`)
2. Verifica que esté en http://localhost:3000
3. Revisa la consola del navegador (F12)

### Error de autenticación
```bash
# Error: 401 Unauthorized
```
**Solución:**
1. Haz logout y login nuevamente
2. Verifica que el JWT_SECRET sea el mismo en backend
3. Borra localStorage del navegador (F12 → Application → Clear)

## 📚 Documentación Adicional

- [**Configuración MongoDB**](backend/SETUP_MONGODB.md) - Guía paso a paso
- [**Backend API**](backend/README.md) - Documentación completa de la API
- [**Integración Angular-MongoDB**](INTEGRACION_ANGULAR_MONGODB.md) - Cómo funcionan los servicios

## 🎓 Funcionalidades Implementadas

### ✅ Parte I - Estructura del Proyecto (20%)
- [x] Estructura de proyecto Angular profesional
- [x] Componentes agrupados en carpetas
- [x] Servicios y módulos preparados
- [x] Header y Footer responsive
- [x] Routing configurado
- [x] Diseño responsive con Bootstrap 5

### ✅ Parte II - Conexión a Base de Datos (80%)
- [x] Login y Registro de usuarios
- [x] Distinción por roles (admin, usuario, arbitro, capitan)
- [x] Base de datos MongoDB Cloud (Atlas)
- [x] Colecciones: usuarios, equipos, jugadores, árbitros, partidos
- [x] Backend Node.js + Express completamente funcional
- [x] Modelos de MongoDB con Mongoose
- [x] Autenticación con JWT
- [x] Middleware de autorización por roles
- [x] Endpoints CRUD completos
- [x] Filtrado automático por rol:
  - Admin: ve y modifica todo
  - Árbitro: ve y modifica solo sus partidos
  - Usuario: ve solo partidos de su equipo
- [x] Actualización automática de clasificaciones
- [x] Integración completa frontend-backend

## 🚀 ¡Listo!

Tu aplicación de Liga Deportiva está completamente funcional con:
- ✅ Frontend Angular responsive
- ✅ Backend Express + MongoDB
- ✅ Autenticación JWT
- ✅ Roles y permisos
- ✅ CRUD completo
- ✅ Filtrado automático por rol

**Próximos pasos sugeridos:**
1. Implementar guards en Angular para proteger rutas
2. Crear panel de administración con formularios
3. Añadir validaciones en formularios
4. Implementar carga de imágenes
5. Añadir notificaciones en tiempo real

---

**¿Problemas?** Revisa los logs del backend con `npm run dev` y la consola del navegador (F12).
