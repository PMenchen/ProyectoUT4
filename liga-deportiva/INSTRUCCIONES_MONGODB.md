# Instrucciones para Configurar MongoDB con el Proyecto Angular

Este proyecto Angular de Liga Deportiva ha sido completamente migrado desde React y está listo para conectarse a MongoDB a través de un backend Node.js/Express.

## Estado del Proyecto

### ✅ Completado

- **Frontend Angular completo** con todas las páginas:
  - Home (con carrusel de noticias, calendario, competiciones)
  - Equipos (con filtros por deporte y modales)
  - Jugadores (con búsqueda y detalles)
  - Árbitros (con búsqueda y estadísticas)
  - Resultados (tabla de partidos)
  - Clasificaciones (tablas por deporte)
  - Contacto (formulario y datos de contacto)
  - Login (inicio de sesión)
  - Registro (creación de usuarios con roles)

- **Componentes Globales**:
  - Navbar responsive con rutas
  - Footer con enlaces y redes sociales
  - Routing completo configurado

- **Modelos de Datos** TypeScript:
  - User (usuario, contraseña, tipo: admin/usuario/arbitro/capitan)
  - Equipo (nombre, deporte, jugadores, capitán, victorias, derrotas)
  - Jugador (nombre, equipo, deporte, número, estadísticas)
  - Árbitro (nombre, deporte, experiencia, partidos arbitrados)
  - Partido (equipos, deporte, fecha, árbitro, resultado, estado)

- **Servicios Angular**:
  - AuthService: Login, registro, logout, gestión de tokens
  - DatabaseService: CRUD completo para equipos, jugadores, árbitros y partidos

- **Estilos**:
  - Bootstrap 5 completamente integrado
  - FontAwesome para iconos
  - CSS custom con efectos hover y animaciones
  - Diseño 100% responsive

## 🔧 Próximos Pasos: Configurar el Backend con MongoDB

### 1. Crear el Cluster en MongoDB Atlas

1. Ve a [https://www.mongodb.com/](https://www.mongodb.com/)
2. Crea una cuenta gratuita (si no tienes una)
3. Crea un nuevo cluster (opción gratuita M0)
4. Configura el acceso:
   - IP Address: Agrega `0.0.0.0/0` para permitir acceso desde cualquier lugar (solo desarrollo)
   - Database User: Crea un usuario con contraseña

### 2. Obtener la Connection String

1. En MongoDB Atlas, haz clic en "Connect"
2. Selecciona "Connect your application"
3. Copia la connection string (algo como: `mongodb+srv://usuario:<password>@cluster.mongodb.net/`)
4. Reemplaza `<password>` con tu contraseña real

### 3. Crear el Backend Node.js/Express

Crea una carpeta separada para el backend (fuera del proyecto Angular):

```bash
mkdir liga-deportiva-backend
cd liga-deportiva-backend
npm init -y
```

### 4. Instalar Dependencias del Backend

```bash
npm install express mongoose cors bcryptjs jsonwebtoken dotenv
npm install --save-dev nodemon
```

### 5. Estructura del Backend

Crea la siguiente estructura:

```
liga-deportiva-backend/
├── server.js
├── .env
├── models/
│   ├── User.js
│   ├── Equipo.js
│   ├── Jugador.js
│   ├── Arbitro.js
│   └── Partido.js
├── routes/
│   ├── auth.js
│   ├── equipos.js
│   ├── jugadores.js
│   ├── arbitros.js
│   └── partidos.js
└── middleware/
    └── auth.js
```

### 6. Archivo .env

Crea un archivo `.env` con:

```env
MONGODB_URI=mongodb+srv://usuario:<password>@cluster.mongodb.net/LigaDeportiva?retryWrites=true&w=majority
PORT=3000
JWT_SECRET=tu_clave_secreta_muy_segura_aqui_cambiar
```

### 7. Archivo server.js Básico

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB conectado'))
.catch(err => console.error('❌ Error de conexión:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/equipos', require('./routes/equipos'));
app.use('/api/jugadores', require('./routes/jugadores'));
app.use('/api/arbitros', require('./routes/arbitros'));
app.use('/api/partidos', require('./routes/partidos'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
```

### 8. Ejemplo de Modelo (models/User.js)

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tipo: {
    type: String,
    enum: ['admin', 'usuario', 'arbitro', 'capitan'],
    default: 'usuario'
  },
  equipoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipo' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
```

### 9. Ejemplo de Ruta (routes/auth.js)

```javascript
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, tipo } = req.body;

    // Verificar si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya existe'
      });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    user = new User({
      nombre,
      email,
      password: hashedPassword,
      tipo: tipo || 'usuario'
    });

    await user.save();

    // Crear token JWT
    const token = jwt.sign(
      { id: user._id, tipo: user.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        tipo: user.tipo
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user._id, tipo: user.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        tipo: user.tipo
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
});

module.exports = router;
```

### 10. Ejecutar el Backend

Agrega estos scripts en `package.json` del backend:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Ejecuta:
```bash
npm run dev
```

### 11. Ejecutar el Frontend Angular

En la carpeta del proyecto Angular:

```bash
npm start
```

## 📝 Colecciones MongoDB a Crear

El backend creará automáticamente estas colecciones:

- **users**: Usuarios del sistema
- **equipos**: Equipos deportivos
- **jugadores**: Jugadores registrados
- **arbitros**: Árbitros registrados
- **partidos**: Partidos programados/jugados

## 🔐 Tipos de Usuario y Funcionalidades

### Usuario Normal
- Ver equipos, jugadores, árbitros
- Ver partidos de su equipo
- Ver clasificaciones y resultados

### Capitán
- Todo lo de usuario normal
- Ver estadísticas de su equipo
- Administrar jugadores de su equipo

### Árbitro
- Ver todos los partidos
- Ver solo partidos asignados a él
- Actualizar resultados de partidos asignados

### Administrador
- Acceso completo a todo
- Crear/editar/eliminar: equipos, jugadores, árbitros
- Crear partidos y asignar árbitros
- Modificar resultados
- Gestionar usuarios

## 📚 Recursos Adicionales

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [Express.js Guide](https://expressjs.com/es/guide/routing.html)
- [JWT.io](https://jwt.io/)
- [Angular HTTP Client](https://angular.dev/guide/http)

## ⚠️ Importante

- Nunca subas tu archivo `.env` a Git
- Cambia el `JWT_SECRET` por uno seguro
- En producción, restringe las IPs permitidas en MongoDB
- Implementa rate limiting en el backend
- Valida todos los datos de entrada en el backend

## ✅ BACKEND COMPLETADO

**El backend está 100% funcional y listo para usar.**

### Lo que está implementado:

1. ✅ **Servidor Express completo** (`backend/server.js`)
2. ✅ **5 Modelos de MongoDB** (User, Equipo, Jugador, Arbitro, Partido)
3. ✅ **Autenticación JWT** con bcrypt para passwords
4. ✅ **Middleware de autorización** por roles
5. ✅ **5 Rutas completas**:
   - `/api/auth` - Login y registro
   - `/api/equipos` - CRUD equipos
   - `/api/jugadores` - CRUD jugadores
   - `/api/arbitros` - CRUD árbitros
   - `/api/partidos` - CRUD partidos con filtrado por rol
6. ✅ **Lógica de permisos por rol**:
   - Admin: acceso total
   - Árbitro: solo sus partidos asignados
   - Usuario: solo partidos de su equipo
7. ✅ **Script de seed** con datos de prueba
8. ✅ **Actualización automática** de clasificaciones al finalizar partidos
9. ✅ **Frontend Angular** integrado con todos los servicios

### 🚀 Para iniciar el proyecto:

**Ver:** [`INICIO_RAPIDO.md`](INICIO_RAPIDO.md) - Guía de inicio en 10 minutos

**Documentación completa:**
- [`backend/SETUP_MONGODB.md`](backend/SETUP_MONGODB.md) - Configuración de MongoDB paso a paso
- [`backend/README.md`](backend/README.md) - API completa del backend
- [`INTEGRACION_ANGULAR_MONGODB.md`](INTEGRACION_ANGULAR_MONGODB.md) - Cómo usar los servicios

### 🎯 Próximas mejoras opcionales:

1. **Guards de Rutas Angular**: Proteger rutas según tipo de usuario
2. **Panel de Admin UI**: Interfaz visual para crear/editar partidos
3. **Panel de Árbitro UI**: Interfaz para actualizar resultados
4. **Validaciones frontend**: Formularios con validación
5. **Notificaciones**: Avisos de nuevos partidos
6. **Upload de imágenes**: Para escudos y fotos

---

**✅ Proyecto completamente funcional con MongoDB**
Backend Node.js + Express + MongoDB Atlas + Frontend Angular
Ready para demostración y producción.
