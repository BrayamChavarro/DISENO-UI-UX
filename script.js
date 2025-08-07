<<<<<<< HEAD
// Listas para almacenar datos de hoteles y ciudades/países
const hoteles = []; // Lista de hoteles
const ciudadesPaises = []; // Lista de ciudades/países

// Lista de categorías de hoteles
const categorias = [
    "1 Estrella",
    "2 Estrellas", 
    "3 Estrellas",
    "4 Estrellas",
    "5 Estrellas",
    "Hostal",
    "Resort",
    "Boutique"
];

// Carga las categorías en el formulario
function loadPositions() {
    const positionSelect = document.getElementById("ciudadPosition"); // Obtiene el elemento select para las categorías
    positionSelect.innerHTML = `<option value="">Seleccione la categoría</option>`; // Agrega la opción predeterminada
    categorias.forEach(categoria => {
        const option = document.createElement("option"); // Crea un elemento de opción
        option.value = categoria; // Establece el valor de la opción
        option.textContent = categoria; // Establece el texto visible de la opción
        positionSelect.appendChild(option); // Agrega la opción al selector
    });
}

// Carga las ciudades/países en el selector del formulario de hoteles
function updatePaisSelect() {
    const paisSelect = document.getElementById("ciudadPais"); // Obtiene el elemento select para las ciudades/países
    paisSelect.innerHTML = `<option value="">Seleccione una ciudad/país</option>`; // Agrega la opción predeterminada
    ciudadesPaises.forEach(ciudadPais => {
        const option = document.createElement("option"); // Crea un elemento de opción
        option.value = ciudadPais.paisName; // Establece el valor de la opción como el nombre de la ciudad/país
        option.textContent = ciudadPais.paisName; // Establece el texto visible como el nombre de la ciudad/país
        paisSelect.appendChild(option); // Agrega la opción al selector
    });
    
    // También actualiza el filtro de ubicaciones en la búsqueda
    updateLocationFilter();
}

// Carga las categorías en el filtro de búsqueda
function updateCategoryFilter() {
    const categoryFilter = document.getElementById("categoryFilter"); // Obtiene el elemento select para el filtro de categorías
    if (categoryFilter) {
        categoryFilter.innerHTML = `<option value="">Todas las categorías</option>`; // Agrega la opción predeterminada
        categorias.forEach(categoria => {
            const option = document.createElement("option"); // Crea un elemento de opción
            option.value = categoria; // Establece el valor de la opción
            option.textContent = categoria; // Establece el texto visible de la opción
            categoryFilter.appendChild(option); // Agrega la opción al selector
        });
    }
}

// Carga las ubicaciones en el filtro de búsqueda
function updateLocationFilter() {
    const locationFilter = document.getElementById("locationFilter"); // Obtiene el elemento select para el filtro de ubicaciones
    if (locationFilter) {
        locationFilter.innerHTML = `<option value="">Todas las ubicaciones</option>`; // Agrega la opción predeterminada
        ciudadesPaises.forEach(ciudadPais => {
            const option = document.createElement("option"); // Crea un elemento de opción
            option.value = ciudadPais.paisName; // Establece el valor de la opción como el nombre de la ciudad/país
            option.textContent = ciudadPais.paisName; // Establece el texto visible como el nombre de la ciudad/país
            locationFilter.appendChild(option); // Agrega la opción al selector
        });
    }
}

// Maneja el formulario para agregar ciudades/países
const paisForm = document.getElementById("addPaisForm"); // Obtiene el formulario para agregar ciudades/países
paisForm.addEventListener("submit", e => {
    e.preventDefault(); // Evita el envío predeterminado del formulario
    const paisName = document.getElementById("paisName").value; // Obtiene el nombre de la ciudad/país
    const paisLogoFile = document.getElementById("paisLogo").files[0]; // Obtiene el archivo del logo
    const paisLogo = paisLogoFile ? URL.createObjectURL(paisLogoFile) : "assets/images/default-team.jpg"; // Genera la URL del logo o usa una imagen predeterminada

    if (!paisName) {
        alert("Por favor, ingrese el nombre de la ciudad/país."); // Muestra un mensaje si el nombre está vacío
        return; // Finaliza la ejecución
    }

    const ciudadPais = { paisName, paisLogo }; // Crea un objeto ciudad/país
    ciudadesPaises.push(ciudadPais); // Agrega la ciudad/país a la lista
    updatePaisCards(); // Actualiza las tarjetas de ciudades/países
    updatePaisSelect(); // Actualiza el selector de ciudades/países
    
    // Incrementar estadísticas si hay sistema de perfil
    if (typeof window.AuthSystem !== 'undefined') {
        window.AuthSystem.incrementarEstadistica('ubicacion');
    }
    
    paisForm.reset(); // Resetea el formulario
});

// Actualiza la visualización de las ciudades/países
function updatePaisCards() {
    const paisContainer = document.getElementById("paisCardsContainer"); // Obtiene el contenedor de tarjetas de ciudades/países
    paisContainer.innerHTML = ""; // Limpia el contenido existente
    ciudadesPaises.forEach(ciudadPais => {
        const card = `<div class="pais-card">
            <img src="${ciudadPais.paisLogo}" alt="${ciudadPais.paisName}" style="width: 100px; height: 100px; border-radius: 50%;"> <!-- Imagen del logo de la ciudad/país -->
            <h3>${ciudadPais.paisName}</h3> <!-- Nombre de la ciudad/país -->
        </div>`;
        paisContainer.innerHTML += card; // Agrega la tarjeta al contenedor
=======
// Listas para almacenar datos de hoteles y ciudades
const hoteles = []; // Lista de hoteles
const ciudades = []; // Lista de ciudades

// Opciones para capital
const capitalOptions = ["Si", "No"];

// Carga las opciones de capital en el formulario
function loadCapitalOptions() {
    const capitalSelect = document.getElementById("hotelCapital");
    capitalSelect.innerHTML = `<option value="">¿Es capital?</option>`;
    capitalOptions.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        capitalSelect.appendChild(opt);
    });
}

// Carga las ciudades en el selector del formulario de hoteles
function updateCiudadSelect() {
    const ciudadSelect = document.getElementById("hotelCiudad");
    ciudadSelect.innerHTML = `<option value="">Seleccione una ciudad</option>`;
    ciudades.forEach(ciudad => {
        const option = document.createElement("option");
        option.value = ciudad.ciudadName;
        option.textContent = ciudad.ciudadName;
        ciudadSelect.appendChild(option);
    });
}

// Maneja el formulario para agregar ciudades
const ciudadForm = document.getElementById("addCiudadForm");
ciudadForm.addEventListener("submit", e => {
    e.preventDefault();
    const ciudadName = document.getElementById("ciudadName").value;
    const ciudadLogoFile = document.getElementById("ciudadLogo").files[0];
    const ciudadLogo = ciudadLogoFile ? URL.createObjectURL(ciudadLogoFile) : "assets/images/default-city.jpg";

    if (!ciudadName) {
        alert("Por favor, ingrese el nombre de la ciudad.");
        return;
    }

    const ciudad = { ciudadName, ciudadLogo };
    ciudades.push(ciudad);
    updateCiudadCards();
    updateCiudadSelect();
    ciudadForm.reset();
});

// Actualiza la visualización de las ciudades
function updateCiudadCards() {
    const ciudadContainer = document.getElementById("ciudadCardsContainer");
    ciudadContainer.innerHTML = "";
    ciudades.forEach(ciudad => {
        const card = `<div class="ciudad-card">
            <img src="${ciudad.ciudadLogo}" alt="${ciudad.ciudadName}" style="width: 100px; height: 100px; border-radius: 50%;">
            <h3>${ciudad.ciudadName}</h3>
        </div>`;
        ciudadContainer.innerHTML += card;
>>>>>>> 9b33cbbe531c86e1e5dedaa30026ae75b8d6d9bd
    });
}

// Maneja el formulario para agregar hoteles
<<<<<<< HEAD
const playerForm = document.getElementById("addCiudadForm"); // Obtiene el formulario para agregar hoteles
playerForm.addEventListener("submit", e => {
    e.preventDefault(); // Evita el envío predeterminado del formulario
    const hotelName = document.getElementById("ciudadName").value; // Obtiene el nombre del hotel
    const direccion = document.getElementById("ciudadCapital").value; // Obtiene la dirección
    const categoria = document.getElementById("ciudadPosition").value; // Obtiene la categoría del hotel
    const ciudadPais = document.getElementById("ciudadPais").value; // Obtiene la ciudad/país seleccionado
    const photoFile = document.getElementById("ciudadPhoto").files[0]; // Obtiene el archivo de la foto
    const photo = photoFile ? URL.createObjectURL(photoFile) : "assets/images/default-player.jpg"; // Genera la URL de la foto o usa una imagen predeterminada

    if (!hotelName || !direccion || !categoria || !ciudadPais) {
        alert("Por favor, complete todos los campos obligatorios."); // Muestra un mensaje si falta algún campo obligatorio
        return; // Finaliza la ejecución
    }

    const hotel = { hotelName, direccion, categoria, ciudadPais, photo }; // Crea un objeto hotel
    hoteles.push(hotel); // Agrega el hotel a la lista
    updateCiudadTable(); // Actualiza la tabla de hoteles
    
    // Incrementar estadísticas si hay sistema de perfil
    if (typeof window.AuthSystem !== 'undefined') {
        window.AuthSystem.incrementarEstadistica('hotel');
    }
    
    playerForm.reset(); // Resetea el formulario
});

// Actualiza la tabla de hoteles
function updateCiudadTable(hotelesAMostrar = hoteles) {
    const hotelTable = document.getElementById("ciudadTableBody"); // Obtiene el cuerpo de la tabla de hoteles
    hotelTable.innerHTML = ""; // Limpia el contenido existente
    
    if (hotelesAMostrar.length === 0) {
        const row = `<tr>
            <td colspan="5" style="text-align: center; color: #8892a0; font-style: italic; padding: 30px;">
                No se encontraron hoteles que coincidan con los filtros seleccionados 🏨
            </td>
        </tr>`;
        hotelTable.innerHTML = row;
        return;
    }
    
    hotelesAMostrar.forEach(hotel => {
        // Generar clase CSS válida para la categoría
        const categoryClass = hotel.categoria
            .toLowerCase()
            .replace(/\s+/g, '')
            .replace('1estrella', 'estrella1')
            .replace('2estrellas', 'estrellas2')
            .replace('3estrellas', 'estrellas3')
            .replace('4estrellas', 'estrellas4')
            .replace('5estrellas', 'estrellas5');
            
        const row = `<tr>
            <td><img src="${hotel.photo}" alt="${hotel.hotelName}" style="width: 50px; height: 50px; border-radius: 50%;"></td>
            <td>${hotel.hotelName}</td>
            <td>${hotel.direccion}</td>
            <td><span class="categoria-badge ${categoryClass}">${hotel.categoria}</span></td>
            <td>${hotel.ciudadPais}</td>
        </tr>`;
        hotelTable.innerHTML += row; // Agrega la fila a la tabla
    });
}

// Función para filtrar y buscar hoteles
function filterAndSearchHotels() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
    const categoryFilter = document.getElementById("categoryFilter").value;
    const locationFilter = document.getElementById("locationFilter").value;
    
    let filteredHoteles = hoteles.filter(hotel => {
        const matchesSearch = searchTerm === "" || 
            hotel.hotelName.toLowerCase().includes(searchTerm) ||
            hotel.direccion.toLowerCase().includes(searchTerm) ||
            hotel.ciudadPais.toLowerCase().includes(searchTerm);
            
        const matchesCategory = categoryFilter === "" || hotel.categoria === categoryFilter;
        const matchesLocation = locationFilter === "" || hotel.ciudadPais === locationFilter;
        
        return matchesSearch && matchesCategory && matchesLocation;
    });
    
    updateCiudadTable(filteredHoteles);
    
    // Incrementar estadísticas de búsqueda si hay sistema de perfil
    if (typeof window.AuthSystem !== 'undefined' && searchTerm !== "") {
        window.AuthSystem.incrementarEstadistica('busqueda');
    }
    
    // Mostrar contador de resultados
    const resultsCount = filteredHoteles.length;
    const searchSection = document.getElementById("search-section");
    let counterElement = searchSection.querySelector(".results-counter");
    
    if (!counterElement) {
        counterElement = document.createElement("div");
        counterElement.className = "results-counter";
        searchSection.appendChild(counterElement);
    }
    
    counterElement.innerHTML = `<p style="color: #103778; font-weight: 600; margin-top: 15px; text-align: center;">
        📊 Mostrando ${resultsCount} hotel${resultsCount !== 1 ? 'es' : ''} ${resultsCount === hoteles.length ? '' : 'filtrado' + (resultsCount !== 1 ? 's' : '')}
    </p>`;
}

// Función para limpiar todos los filtros
function clearAllFilters() {
    document.getElementById("searchInput").value = "";
    document.getElementById("categoryFilter").value = "";
    document.getElementById("locationFilter").value = "";
    
    // Actualizar tabla con todos los hoteles
    updateCiudadTable(hoteles);
    
    // Limpiar contador
    const counterElement = document.querySelector(".results-counter");
    if (counterElement) {
        counterElement.remove();
    }
}

// Inicializa el sistema al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    loadPositions(); // Carga las categorías en el selector
    updatePaisSelect(); // Carga las ciudades/países en el selector
    updateCategoryFilter(); // Carga las categorías en el filtro de búsqueda
    
    // Event listeners para la búsqueda y filtros
    const searchButton = document.getElementById("searchButton");
    const clearButton = document.getElementById("clearFiltersButton");
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const locationFilter = document.getElementById("locationFilter");
    
    // Búsqueda al hacer clic en el botón
    if (searchButton) {
        searchButton.addEventListener("click", filterAndSearchHotels);
    }
    
    // Limpiar filtros
    if (clearButton) {
        clearButton.addEventListener("click", clearAllFilters);
    }
    
    // Búsqueda en tiempo real al escribir (con un pequeño retraso)
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener("input", () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(filterAndSearchHotels, 300);
        });
    }
    
    // Filtrado en tiempo real al cambiar los selectores
    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterAndSearchHotels);
    }
    
    if (locationFilter) {
        locationFilter.addEventListener("change", filterAndSearchHotels);
    }
=======
const hotelForm = document.getElementById("addHotelForm");
hotelForm.addEventListener("submit", e => {
    e.preventDefault();
    const hotelName = document.getElementById("hotelName").value;
    const hotelPostal = document.getElementById("hotelPostal").value;
    const hotelCapital = document.getElementById("hotelCapital").value;
    const ciudad = document.getElementById("hotelCiudad").value;
    const photoFile = document.getElementById("hotelPhoto").files[0];
    const photo = photoFile ? URL.createObjectURL(photoFile) : "assets/images/default-hotel.jpg";

    if (!hotelName || !hotelPostal || !hotelCapital || !ciudad) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    const hotel = { hotelName, hotelPostal, hotelCapital, ciudad, photo };
    hoteles.push(hotel);
    updateHotelTable();
    hotelForm.reset();
});

// Actualiza la tabla de hoteles
function updateHotelTable() {
    const hotelTable = document.getElementById("hotelTableBody");
    hotelTable.innerHTML = "";
    hoteles.forEach(hotel => {
        const row = `<tr>
            <td><img src="${hotel.photo}" alt="${hotel.hotelName}" style="width: 50px; height: 50px; border-radius: 50%;"></td>
            <td>${hotel.hotelName}</td>
            <td>${hotel.hotelPostal}</td>
            <td>${hotel.hotelCapital}</td>
            <td>${hotel.ciudad}</td>
        </tr>`;
        hotelTable.innerHTML += row;
    });
}

// Inicializa el sistema al cargar la página y el login local
document.addEventListener("DOMContentLoaded", () => {
    loadCapitalOptions();
    updateCiudadSelect();

    const loginForm = document.getElementById('loginForm');
    const loginContainer = document.getElementById('loginContainer');
    const mainContent = document.getElementById('mainContent');
    const loginError = document.getElementById('loginError');

    // Usuario y contraseña local
    const USER = 'admin';
    const PASS = '1234';

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === USER && password === PASS) {
            loginContainer.style.display = 'none';
            mainContent.style.display = 'block';
        } else {
            loginError.style.display = 'block';
        }
    });
>>>>>>> 9b33cbbe531c86e1e5dedaa30026ae75b8d6d9bd
});
