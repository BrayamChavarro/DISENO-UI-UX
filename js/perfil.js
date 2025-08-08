// Sistema de autenticación y perfil para la gestión de hoteles

// Datos de usuarios registrados (simulación de base de datos)
let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || 'null');
let estadisticasUsuario = JSON.parse(localStorage.getItem('estadisticasUsuario') || '{"hotelesCreados": 0, "ubicacionesAgregadas": 0, "busquedasRealizadas": 0}');

// Elementos del DOM
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const forgotSection = document.getElementById('forgot-section');
const welcomeSection = document.getElementById('welcome-section');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const forgotForm = document.getElementById('forgot-form');

// Enlaces de navegación entre formularios
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const forgotPasswordLink = document.getElementById('forgot-password');
const backToLoginLink = document.getElementById('back-to-login');

// Botones de acción
const logoutBtn = document.getElementById('logout-btn');
const changeAvatarBtn = document.getElementById('change-avatar-btn');
const avatarInput = document.getElementById('avatar-input');

// Elementos de información del usuario
const userAvatar = document.getElementById('user-avatar');
const welcomeMessage = document.getElementById('welcome-message');
const userEmail = document.getElementById('user-email');
const memberSince = document.getElementById('member-since');

// Elementos de estadísticas
const hotelsCreated = document.getElementById('hotels-created');
const locationsAdded = document.getElementById('locations-added');
const searchesMade = document.getElementById('searches-made');

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    verificarAutenticacion();
    inicializarEventListeners();
    actualizarEstadisticas();
});

// Verificar si el usuario está autenticado
function verificarAutenticacion() {
    if (usuarioActual) {
        mostrarPerfil();
    } else {
        mostrarLogin();
    }
}

// Mostrar sección de login
function mostrarLogin() {
    ocultarTodasLasSecciones();
    loginSection.style.display = 'block';
}

// Mostrar sección de registro
function mostrarRegistro() {
    ocultarTodasLasSecciones();
    registerSection.style.display = 'block';
}

// Mostrar sección de recuperación de contraseña
function mostrarRecuperacion() {
    ocultarTodasLasSecciones();
    forgotSection.style.display = 'block';
}

// Mostrar perfil del usuario
function mostrarPerfil() {
    ocultarTodasLasSecciones();
    welcomeSection.style.display = 'block';
    actualizarInformacionPerfil();
}

// Ocultar todas las secciones
function ocultarTodasLasSecciones() {
    loginSection.style.display = 'none';
    registerSection.style.display = 'none';
    forgotSection.style.display = 'none';
    welcomeSection.style.display = 'none';
}

// Inicializar event listeners
function inicializarEventListeners() {
    // Navegación entre formularios
    showRegisterLink?.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarRegistro();
    });

    showLoginLink?.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarLogin();
    });

    forgotPasswordLink?.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarRecuperacion();
    });

    backToLoginLink?.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarLogin();
    });

    // Formularios
    loginForm?.addEventListener('submit', manejarLogin);
    registerForm?.addEventListener('submit', manejarRegistro);
    forgotForm?.addEventListener('submit', manejarRecuperacion);

    // Botones de perfil
    logoutBtn?.addEventListener('click', cerrarSesion);
    changeAvatarBtn?.addEventListener('click', () => avatarInput?.click());
    avatarInput?.addEventListener('change', cambiarAvatar);

    // Botones para mostrar/ocultar contraseñas
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', alternarVisibilidadPassword);
    });
}

// Manejar inicio de sesión
function manejarLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        mostrarAlerta('Por favor, complete todos los campos', 'error');
        return;
    }

    // Buscar usuario
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    
    if (usuario) {
        usuarioActual = usuario;
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
        mostrarAlerta('¡Bienvenido de nuevo! 🎉', 'success');
        
        setTimeout(() => {
            mostrarPerfil();
        }, 1500);
    } else {
        mostrarAlerta('Credenciales incorrectas. Por favor, verifica tu email y contraseña.', 'error');
    }
}

// Manejar registro
function manejarRegistro(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const rol = document.getElementById('register-role').value;
    const terminos = document.getElementById('terms-checkbox').checked;

    // Validaciones
    if (!nombre || !email || !password || !confirmPassword || !rol) {
        mostrarAlerta('Por favor, complete todos los campos obligatorios', 'error');
        return;
    }

    if (!terminos) {
        mostrarAlerta('Debe aceptar los términos y condiciones', 'error');
        return;
    }

    if (password.length < 8) {
        mostrarAlerta('La contraseña debe tener al menos 8 caracteres', 'error');
        return;
    }

    if (password !== confirmPassword) {
        mostrarAlerta('Las contraseñas no coinciden', 'error');
        return;
    }

    // Verificar si el email ya existe
    if (usuarios.some(u => u.email === email)) {
        mostrarAlerta('Ya existe una cuenta con este email', 'error');
        return;
    }

    // Crear nuevo usuario
    const nuevoUsuario = {
        id: Date.now(),
        nombre,
        email,
        password,
        rol,
        fechaRegistro: new Date().toISOString(),
        avatar: '../assets/images/default-avatar.jpg'
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    usuarioActual = nuevoUsuario;
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

    mostrarAlerta('¡Cuenta creada exitosamente! Bienvenido 🚀', 'success');
    
    setTimeout(() => {
        mostrarPerfil();
    }, 1500);
}

// Manejar recuperación de contraseña
function manejarRecuperacion(e) {
    e.preventDefault();
    
    const email = document.getElementById('forgot-email').value.trim();
    
    if (!email) {
        mostrarAlerta('Por favor, ingrese su email', 'error');
        return;
    }

    const usuario = usuarios.find(u => u.email === email);
    
    if (usuario) {
        mostrarAlerta('📧 Se ha enviado un enlace de recuperación a su email', 'success');
        // En una aplicación real, aquí enviarías el email
        setTimeout(() => {
            mostrarLogin();
        }, 2000);
    } else {
        mostrarAlerta('No se encontró ninguna cuenta con este email', 'error');
    }
}

// Cerrar sesión
function cerrarSesion(e) {
    e.preventDefault();
    
    if (confirm('¿Está seguro que desea cerrar sesión?')) {
        usuarioActual = null;
        localStorage.removeItem('usuarioActual');
        mostrarAlerta('Sesión cerrada correctamente', 'success');
        
        setTimeout(() => {
            mostrarLogin();
        }, 1000);
    }
}

// Cambiar avatar
function cambiarAvatar(e) {
    const archivo = e.target.files[0];
    
    if (archivo) {
        if (archivo.size > 2 * 1024 * 1024) { // 2MB máximo
            mostrarAlerta('El archivo es muy grande. Máximo 2MB', 'error');
            return;
        }

        if (!archivo.type.startsWith('image/')) {
            mostrarAlerta('Por favor, seleccione una imagen válida', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const nuevaImagenUrl = e.target.result;
            
            // Actualizar avatar en la interfaz
            userAvatar.src = nuevaImagenUrl;
            
            // Actualizar usuario actual
            usuarioActual.avatar = nuevaImagenUrl;
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
            
            // Actualizar en la lista de usuarios
            const index = usuarios.findIndex(u => u.id === usuarioActual.id);
            if (index !== -1) {
                usuarios[index].avatar = nuevaImagenUrl;
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
            }
            
            mostrarAlerta('Avatar actualizado correctamente 📸', 'success');
        };
        
        reader.readAsDataURL(archivo);
    }
}

// Actualizar información del perfil
function actualizarInformacionPerfil() {
    if (!usuarioActual) return;
    
    welcomeMessage.textContent = `¡Hola, ${usuarioActual.nombre}! 👋`;
    userEmail.textContent = usuarioActual.email;
    userAvatar.src = usuarioActual.avatar || '../assets/images/default-avatar.jpg';
    
    const fechaRegistro = new Date(usuarioActual.fechaRegistro);
    memberSince.textContent = `Miembro desde ${fechaRegistro.toLocaleDateString('es-ES')}`;
    
    actualizarEstadisticas();
}

// Actualizar estadísticas del usuario
function actualizarEstadisticas() {
    hotelsCreated.textContent = estadisticasUsuario.hotelesCreados;
    locationsAdded.textContent = estadisticasUsuario.ubicacionesAgregadas;
    searchesMade.textContent = estadisticasUsuario.busquedasRealizadas;
}

// Incrementar estadísticas
function incrementarEstadistica(tipo) {
    switch(tipo) {
        case 'hotel':
            estadisticasUsuario.hotelesCreados++;
            break;
        case 'ubicacion':
            estadisticasUsuario.ubicacionesAgregadas++;
            break;
        case 'busqueda':
            estadisticasUsuario.busquedasRealizadas++;
            break;
    }
    
    localStorage.setItem('estadisticasUsuario', JSON.stringify(estadisticasUsuario));
    actualizarEstadisticas();
}

// Alternar visibilidad de contraseña
function alternarVisibilidadPassword(e) {
    const targetId = e.target.getAttribute('data-target');
    const passwordInput = document.getElementById(targetId);
    const btn = e.target;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        btn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        btn.textContent = '👁️';
    }
}

// Mostrar alertas
function mostrarAlerta(mensaje, tipo = 'info') {
    // Remover alertas existentes
    document.querySelectorAll('.alert').forEach(alert => alert.remove());
    
    const alert = document.createElement('div');
    alert.className = `alert ${tipo}`;
    
    const icono = tipo === 'success' ? '✅' : tipo === 'error' ? '❌' : tipo === 'warning' ? '⚠️' : 'ℹ️';
    alert.innerHTML = `${icono} ${mensaje}`;
    
    // Insertar la alerta en la sección activa
    const seccionActiva = document.querySelector('.section[style*="block"]');
    if (seccionActiva) {
        seccionActiva.querySelector('.auth-container, .profile-header')?.prepend(alert);
    }
    
    // Remover la alerta después de 5 segundos
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Validación de email
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Generar contraseña aleatoria (para recuperación)
function generarPasswordTemporal() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// Funciones para integrar con el sistema principal
function obtenerUsuarioActual() {
    return usuarioActual;
}

function estaAutenticado() {
    return usuarioActual !== null;
}

// Exportar funciones para uso en otros archivos
window.AuthSystem = {
    obtenerUsuarioActual,
    estaAutenticado,
    incrementarEstadistica,
    mostrarAlerta
};

// Auto-inicialización
if (typeof window !== 'undefined') {
    // Verificar si venimos del sistema principal
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'login') {
        mostrarLogin();
    } else if (params.get('action') === 'register') {
        mostrarRegistro();
    }
}
