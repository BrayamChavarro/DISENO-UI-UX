// =================================================================
// 1. ESTADO Y CONSTANTES DE LA APLICACIÓN
// =================================================================

// Listas para almacenar los datos principales de la aplicación
const hoteles = [];
const ciudadesPaises = [];

// Lista de categorías de hoteles (constante, ya que no cambia)
const CATEGORIAS_HOTELES = [
    "1 Estrella", "2 Estrellas", "3 Estrellas",
    "4 Estrellas", "5 Estrellas", "Hostal",
    "Resort", "Boutique"
];

// Credenciales para el inicio de sesión (ejemplo)
const USER_CREDENTIALS = {
    username: 'admin',
    password: '123'
};

// =================================================================
// 2. FUNCIONES DE RENDERIZADO Y ACTUALIZACIÓN DEL DOM
// =================================================================

/**
 * Rellena un elemento <select> con opciones.
 * @param {HTMLElement} selectElement - El elemento <select> a rellenar.
 * @param {string[]} options - El array de strings para las opciones.
 * @param {string} defaultOptionText - El texto para la primera opción deshabilitada.
 */
function populateSelect(selectElement, options, defaultOptionText) {
    if (!selectElement) return;
    // Construir el HTML de las opciones y asignarlo una sola vez para mejor rendimiento
    const optionsHTML = options.map(option => `<option value="${option}">${option}</option>`).join('');
    selectElement.innerHTML = `<option value="">${defaultOptionText}</option>${optionsHTML}`;
}

/**
 * Carga las categorías de hoteles en los selectores correspondientes.
 */
function loadHotelCategories() {
    populateSelect(document.getElementById("hotelCategoria"), CATEGORIAS_HOTELES, "Seleccione la categoría");
    populateSelect(document.getElementById("categoryFilter"), CATEGORIAS_HOTELES, "Todas las categorías");
}

/**
 * Carga las ciudades/países en los selectores correspondientes.
 */
function loadCiudadesPaises() {
    const nombresCiudades = ciudadesPaises.map(c => c.nombre);
    populateSelect(document.getElementById("hotelCiudadPais"), nombresCiudades, "Seleccione una ciudad/país");
    populateSelect(document.getElementById("locationFilter"), nombresCiudades, "Todas las ubicaciones");
}

/**
 * Actualiza y renderiza las tarjetas de ciudades/países en el DOM.
 */
function renderCiudadPaisCards() {
    const container = document.getElementById("paisCardsContainer");
    if (!container) return;

    // Si no hay ciudades, muestra un mensaje
    if (ciudadesPaises.length === 0) {
        container.innerHTML = '<p>No hay ciudades o países registrados todavía.</p>';
        return;
    }

    // Genera todo el HTML de una vez para mejorar el rendimiento
    const cardsHTML = ciudadesPaises.map(ciudad => `
        <div class="pais-card">
            <img src="${ciudad.logo}" alt="Logo de ${ciudad.nombre}">
            <h3>${ciudad.nombre}</h3>
        </div>
    `).join('');
    
    container.innerHTML = cardsHTML;
}

/**
 * Actualiza y renderiza la tabla de hoteles en el DOM.
 * @param {object[]} hotelesAMostrar - La lista de hoteles que se deben mostrar (puede ser la lista filtrada).
 */
function renderHotelTable(hotelesAMostrar = hoteles) {
    const tableBody = document.getElementById("hotelTableBody");
    if (!tableBody) return;
    
    // Actualiza el contador de resultados
    updateResultsCounter(hotelesAMostrar.length, hoteles.length);

    if (hotelesAMostrar.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: #8892a0; padding: 30px;">
                    🏨 No se encontraron hoteles que coincidan con los filtros.
                </td>
            </tr>`;
        return;
    }

    const rowsHTML = hotelesAMostrar.map(hotel => {
        // Genera una clase CSS válida a partir del nombre de la categoría
        const categoryClass = hotel.categoria.toLowerCase().replace(/\s+/g, '-');
        
        return `
            <tr>
                <td><img src="${hotel.foto}" alt="Foto de ${hotel.nombre}"></td>
                <td>${hotel.nombre}</td>
                <td>${hotel.direccion}</td>
                <td><span class="categoria-badge ${categoryClass}">${hotel.categoria}</span></td>
                <td>${hotel.ciudadPais}</td>
            </tr>`;
    }).join('');

    tableBody.innerHTML = rowsHTML;
}

/**
 * Muestra u oculta el contador de resultados de búsqueda.
 * @param {number} filteredCount - El número de resultados después de filtrar.
 * @param {number} totalCount - El número total de hoteles.
 */
function updateResultsCounter(filteredCount, totalCount) {
    const searchSection = document.getElementById("search-section");
    if (!searchSection) return;
    
    let counterElement = searchSection.querySelector(".results-counter");
    if (!counterElement) {
        counterElement = document.createElement("div");
        counterElement.className = "results-counter";
        searchSection.appendChild(counterElement);
    }

    if (filteredCount === totalCount && document.getElementById("searchInput").value === "") {
        counterElement.style.display = 'none'; // Ocultar si no hay filtro activo
    } else {
        counterElement.style.display = 'block';
        const plural = filteredCount !== 1 ? 'es' : '';
        counterElement.innerHTML = `📊 Mostrando ${filteredCount} hotel${plural}.`;
    }
}


// =================================================================
// 3. MANEJADORES DE EVENTOS Y LÓGICA DE FORMULARIOS
// =================================================================

/**
 * Maneja el envío del formulario para agregar una nueva ciudad/país.
 */
function handleAddCiudadPais(event) {
    event.preventDefault();
    const form = event.target;
    const nombreInput = document.getElementById("paisName");
    const logoInput = document.getElementById("paisLogo");

    const nombre = nombreInput.value.trim();
    if (!nombre) {
        alert("Por favor, ingrese el nombre de la ciudad/país.");
        return;
    }

    const logoFile = logoInput.files[0];
    const logo = logoFile ? URL.createObjectURL(logoFile) : "assets/images/default-team.jpg";

    ciudadesPaises.push({ nombre, logo });
    
    // Actualizar la interfaz
    renderCiudadPaisCards();
    loadCiudadesPaises();
    
    form.reset();
}

/**
 * Maneja el envío del formulario para agregar un nuevo hotel.
 */
function handleAddHotel(event) {
    event.preventDefault();
    const form = event.target;
    
    // Obtener valores del formulario
    const nombre = document.getElementById("hotelName").value.trim();
    const direccion = document.getElementById("hotelDireccion").value.trim();
    const categoria = document.getElementById("hotelCategoria").value;
    const ciudadPais = document.getElementById("hotelCiudadPais").value;
    const fotoFile = document.getElementById("hotelPhoto").files[0];
    const foto = fotoFile ? URL.createObjectURL(fotoFile) : "assets/images/default-player.jpg";

    if (!nombre || !direccion || !categoria || !ciudadPais) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    hoteles.push({ nombre, direccion, categoria, ciudadPais, foto });
    
    // Actualizar la tabla y limpiar filtros para mostrar el nuevo hotel
    clearAllFilters();
    form.reset();
}

/**
 * Filtra los hoteles según los criterios de búsqueda y los muestra.
 */
function filterAndSearchHotels() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
    const categoryFilter = document.getElementById("categoryFilter").value;
    const locationFilter = document.getElementById("locationFilter").value;

    const filteredHoteles = hoteles.filter(hotel => {
        const matchesSearch = !searchTerm ||
            hotel.nombre.toLowerCase().includes(searchTerm) ||
            hotel.direccion.toLowerCase().includes(searchTerm) ||
            hotel.ciudadPais.toLowerCase().includes(searchTerm);

        const matchesCategory = !categoryFilter || hotel.categoria === categoryFilter;
        const matchesLocation = !locationFilter || hotel.ciudadPais === locationFilter;

        return matchesSearch && matchesCategory && matchesLocation;
    });
    
    renderHotelTable(filteredHoteles);
}

/**
 * Limpia todos los filtros de búsqueda y muestra todos los hoteles.
 */
function clearAllFilters() {
    document.getElementById("searchInput").value = "";
    document.getElementById("categoryFilter").value = "";
    document.getElementById("locationFilter").value = "";
    renderHotelTable(hoteles);
}

/**
 * Maneja el intento de inicio de sesión.
 */
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === USER_CREDENTIALS.username && password === USER_CREDENTIALS.password) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        // Una vez logueado, inicializar el resto de la app
        initializeApp();
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
}

// =================================================================
// 4. INICIALIZACIÓN DE LA APLICACIÓN
// =================================================================

/**
 * Asigna los event listeners a los elementos del DOM.
 */
function setupEventListeners() {
    // Formularios
    document.getElementById("addPaisForm").addEventListener("submit", handleAddCiudadPais);
    document.getElementById("addHotelForm").addEventListener("submit", handleAddHotel);
    
    // Controles de búsqueda
    document.getElementById("searchButton").addEventListener("click", filterAndSearchHotels);
    document.getElementById("clearFiltersButton").addEventListener("click", clearAllFilters);
    
    // Filtros con actualización en tiempo real
    document.getElementById("searchInput").addEventListener("input", filterAndSearchHotels);
    document.getElementById("categoryFilter").addEventListener("change", filterAndSearchHotels);
    document.getElementById("locationFilter").addEventListener("change", filterAndSearchHotels);
}

/**
 * Función principal que se ejecuta después de un inicio de sesión exitoso.
 */
function initializeApp() {
    setupEventListeners();
    loadHotelCategories();
    loadCiudadesPaises();
    renderCiudadPaisCards();
    renderHotelTable();
}

// Event listener principal que se ejecuta cuando el DOM está listo.
// Solo configura el formulario de login inicialmente.
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});