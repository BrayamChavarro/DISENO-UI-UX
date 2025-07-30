// Listas para almacenar datos de jugadores y equipos
const ciudades = []; // Lista de jugadores
const paises = []; // Lista de equipos

// Lista de posiciones en el fútbol
const positions = [
    "Si",
    "No"
];

// Carga las posiciones en el formulario
function loadPositions() {
    const positionSelect = document.getElementById("ciudadPosition"); // Obtiene el elemento select para las posiciones
    positionSelect.innerHTML = `<option value="">¿Es capital?</option>`; // Agrega la opción predeterminada
    positions.forEach(position => {
        const option = document.createElement("option"); // Crea un elemento de opción
        option.value = position; // Establece el valor de la opción
        option.textContent = position; // Establece el texto visible de la opción
        positionSelect.appendChild(option); // Agrega la opción al selector
    });
}

// Carga los equipos en el selector del formulario de jugadores
function updatePaisSelect() {
    const paisSelect = document.getElementById("ciudadPais"); // Obtiene el elemento select para los equipos
    paisSelect.innerHTML = `<option value="">Seleccione un pais</option>`; // Agrega la opción predeterminada
    paises.forEach(pais => {
        const option = document.createElement("option"); // Crea un elemento de opción
        option.value = pais.paisName; // Establece el valor de la opción como el nombre del equipo
        option.textContent = pais.paisName; // Establece el texto visible como el nombre del equipo
        paisSelect.appendChild(option); // Agrega la opción al selector
    });
}

// Maneja el formulario para agregar equipos
const paisForm = document.getElementById("addPaisForm"); // Obtiene el formulario para agregar equipos
paisForm.addEventListener("submit", e => {
    e.preventDefault(); // Evita el envío predeterminado del formulario
    const paisName = document.getElementById("paisName").value; // Obtiene el nombre del equipo
    const paisLogoFile = document.getElementById("paisLogo").files[0]; // Obtiene el archivo del logo
    const paisLogo = paisLogoFile ? URL.createObjectURL(paisLogoFile) : "assets/images/default-team.jpg"; // Genera la URL del logo o usa una imagen predeterminada

    if (!paisName) {
        alert("Por favor, ingrese el nombre del equipo."); // Muestra un mensaje si el nombre está vacío
        return; // Finaliza la ejecución
    }

    const pais = { paisName, paisLogo }; // Crea un objeto equipo
    paises.push(pais); // Agrega el equipo a la lista de equipos
    updatePaisCards(); // Actualiza las tarjetas de equipos
    updatePaisSelect(); // Actualiza el selector de equipos
    paisForm.reset(); // Resetea el formulario
});

// Actualiza la visualización de los equipos
function updatePaisCards() {
    const paisContainer = document.getElementById("paisCardsContainer"); // Obtiene el contenedor de tarjetas de equipos
    paisContainer.innerHTML = ""; // Limpia el contenido existente
    paises.forEach(pais => {
        const card = `<div class="pais-card">
            <img src="${pais.paisLogo}" alt="${pais.paisName}" style="width: 100px; height: 100px; border-radius: 50%;"> <!-- Imagen del logo del equipo -->
            <h3>${pais.paisName}</h3> <!-- Nombre del equipo -->
        </div>`;
        paisContainer.innerHTML += card; // Agrega la tarjeta al contenedor
    });
}

// Maneja el formulario para agregar jugadores
const playerForm = document.getElementById("addCiudadForm"); // Obtiene el formulario para agregar jugadores
playerForm.addEventListener("submit", e => {
    e.preventDefault(); // Evita el envío predeterminado del formulario
    const ciudadname = document.getElementById("ciudadName").value; // Obtiene el nombre de la ciudad
    const codigoPostal = document.getElementById("ciudadCapital").value; // Obtiene el código postal
    const ciudadPosition = document.getElementById("ciudadPosition").value; // Obtiene la opción de si es capital
    const pais = document.getElementById("ciudadPais").value; // Obtiene el país seleccionado
    const photoFile = document.getElementById("ciudadPhoto").files[0]; // Obtiene el archivo de la foto
    const photo = photoFile ? URL.createObjectURL(photoFile) : "assets/images/default-player.jpg"; // Genera la URL de la foto o usa una imagen predeterminada

    if (!ciudadname || !codigoPostal || !ciudadPosition || !pais) {
        alert("Por favor, complete todos los campos obligatorios."); // Muestra un mensaje si falta algún campo obligatorio
        return; // Finaliza la ejecución
    }

    const ciudad = { ciudadname, codigoPostal, ciudadPosition, pais, photo }; // Crea un objeto ciudad
    ciudades.push(ciudad); // Agrega la ciudad a la lista
    updateCiudadTable(); // Actualiza la tabla de ciudades
    playerForm.reset(); // Resetea el formulario
});

// Actualiza la tabla de jugadores
function updateCiudadTable() {
    const ciudadTable = document.getElementById("ciudadTableBody"); // Obtiene el cuerpo de la tabla de ciudades
    ciudadTable.innerHTML = ""; // Limpia el contenido existente
    ciudades.forEach(ciudad => {
        const row = `<tr>
            <td><img src="${ciudad.photo}" alt="${ciudad.ciudadname}" style="width: 50px; height: 50px; border-radius: 50%;"></td>
            <td>${ciudad.ciudadname}</td>
            <td>${ciudad.codigoPostal}</td>
            <td>${ciudad.ciudadPosition}</td>
            <td>${ciudad.pais}</td>
        </tr>`;
        ciudadTable.innerHTML += row; // Agrega la fila a la tabla
    });
}

// Inicializa el sistema al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    loadPositions(); // Carga las posiciones en el selector
    updatePaisSelect(); // Carga los equipos en el selector
});
