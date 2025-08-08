# 👤 Sistema de Perfil y Autenticación

## 📋 Descripción

Sistema completo de registro, inicio de sesión y gestión de perfiles para la plataforma de gestión de hoteles. Incluye autenticación segura, gestión de estadísticas de usuario y una interfaz moderna y responsiva.

## 🚀 Características

### 🔐 Autenticación
- **Registro de usuarios** con validación completa
- **Inicio de sesión** seguro
- **Recuperación de contraseña**
- **Gestión de sesiones** persistente
- **Tipos de usuario**: Gerente de Hotel, Agente de Viajes, Turista, Administrador

### 👤 Gestión de Perfil
- **Avatar personalizable** (máximo 2MB)
- **Información del usuario** editable
- **Estadísticas en tiempo real**:
  - Hoteles creados
  - Ubicaciones agregadas  
  - Búsquedas realizadas
- **Fecha de registro** automática

### 🎨 Diseño Visual
- **Paleta de colores** coherente con la aplicación principal
- **Animaciones suaves** y efectos de hover
- **Diseño responsivo** para móviles y desktop
- **Iconos emoji** para una experiencia amigable
- **Alertas visuales** informativas

## 📁 Estructura de Archivos

```
pages/
└── perfil.html          # Página principal del sistema de perfil

css/
└── perfil.css           # Estilos específicos del perfil

js/
└── perfil.js            # Lógica de autenticación y perfil

assets/images/
└── default-avatar.svg   # Avatar por defecto
```

## 🔧 Funcionalidades Técnicas

### Almacenamiento Local
- Usuarios registrados en `localStorage`
- Sesión actual persistente
- Estadísticas de usuario guardadas

### Validaciones
- **Email**: Formato válido requerido
- **Contraseñas**: Mínimo 8 caracteres
- **Confirmación**: Contraseñas deben coincidir
- **Archivos**: Imágenes máximo 2MB
- **Términos**: Aceptación obligatoria

### Seguridad
- Validación de tipos de archivo para avatares
- Sanitización de entradas de usuario
- Confirmación para acciones críticas
- Manejo seguro de contraseñas

## 🎯 Tipos de Usuario

| Tipo | Icono | Descripción |
|------|-------|-------------|
| Gerente de Hotel | 🏨 | Administra hoteles y propiedades |
| Agente de Viajes | ✈️ | Gestiona reservas y paquetes turísticos |
| Turista | 🧳 | Busca y reserva alojamientos |
| Administrador | ⚡ | Acceso completo al sistema |

## 📱 Responsive Design

### Desktop (768px+)
- Layout de 3 columnas para estadísticas
- Perfil horizontal con avatar grande
- Formularios centrados con máximo ancho

### Mobile (< 768px)
- Layout de columna única
- Perfil vertical centrado
- Formularios adaptados al ancho completo

## 🔗 Integración

### Con el Sistema Principal
- **Estadísticas automáticas**: Se incrementan al crear hoteles/ubicaciones
- **Navegación integrada**: Enlace en el menú principal
- **Estilos coherentes**: Usa la misma paleta de colores

### APIs Disponibles
```javascript
// Verificar autenticación
AuthSystem.estaAutenticado()

// Obtener usuario actual
AuthSystem.obtenerUsuarioActual()

// Incrementar estadística
AuthSystem.incrementarEstadistica('hotel' | 'ubicacion' | 'busqueda')

// Mostrar alerta
AuthSystem.mostrarAlerta(mensaje, tipo)
```

## 🎨 Paleta de Colores Usada

- **#151F30** - Azul muy oscuro (texto principal)
- **#103778** - Azul oscuro (encabezados)
- **#0593A2** - Turquesa (acentos y botones)
- **#FF7A48** - Naranja (acciones importantes)
- **#E3371E** - Rojo coral (alertas y hover)

## 📊 Estadísticas Rastreadas

1. **Hoteles Creados**: Se incrementa al agregar un nuevo hotel
2. **Ubicaciones Agregadas**: Se incrementa al agregar ciudades/países
3. **Búsquedas Realizadas**: Se incrementa al realizar búsquedas con texto

## 🚀 Uso

1. **Acceso**: Navegar a `pages/perfil.html`
2. **Registro**: Crear cuenta nueva con email único
3. **Login**: Iniciar sesión con credenciales
4. **Perfil**: Ver estadísticas y gestionar información
5. **Avatar**: Cambiar foto de perfil (click en cámara)
6. **Logout**: Cerrar sesión segura

## 🔮 Futuras Mejoras

- [ ] Integración con base de datos real
- [ ] Autenticación OAuth (Google, Facebook)
- [ ] Verificación de email por código
- [ ] Recuperación de contraseña por SMS
- [ ] Configuraciones de privacidad
- [ ] Modo oscuro/claro
- [ ] Notificaciones push
- [ ] Historial de actividad detallado

---

**Desarrollado con ❤️ para la plataforma de gestión de hoteles**
