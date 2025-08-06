// Listas para almacenar datos de paises y ciudades 
const players = []; // Lista de paises 
const teams = []; // Lista de ciudades 

// Lista de posiciones de las ciudades 
const positions = [
    "Capital", // Posición de portero
    "Municipio", // Posición de defensa central
   
];

// Carga las posiciones en el formulario
function loadPositions() {
    const positionSelect = document.getElementById("playerPosition"); // Obtiene el elemento select para las posiciones
    positionSelect.innerHTML = `<option value="">Tipo</option>`; // Agrega la opción predeterminada
    positions.forEach(position => {
        const option = document.createElement("option"); // Crea un elemento de opción
        option.value = position; // Establece el valor de la opción
        option.textContent = position; // Establece el texto visible de la opción
        positionSelect.appendChild(option); // Agrega la opción al selector
    });
}

// Carga los equipos en el selector del formulario de jugadores
function updateTeamSelect() {
    const teamSelect = document.getElementById("playerTeam"); // Obtiene el elemento select para los equipos
    teamSelect.innerHTML = `<option value="">Seleccione un pais</option>`; // Agrega la opción predeterminada
    teams.forEach(team => {
        const option = document.createElement("option"); // Crea un elemento de opción
        option.value = team.name; // Establece el valor de la opción como el nombre del equipo
        option.textContent = team.name; // Establece el texto visible como el nombre del equipo
        teamSelect.appendChild(option); // Agrega la opción al selector
    });
}

// Maneja el formulario para agregar equipos
const teamForm = document.getElementById("addTeamForm"); // Obtiene el formulario para agregar equipos
teamForm.addEventListener("submit", e => {
    e.preventDefault(); // Evita el envío predeterminado del formulario
    const name = document.getElementById("teamName").value; // Obtiene el nombre del equipo
    const logoFile = document.getElementById("teamLogo").files[0]; // Obtiene el archivo del logo
    const logo = logoFile ? URL.createObjectURL(logoFile) : "assets/images/default-team.jpg"; // Genera la URL del logo o usa una imagen predeterminada

    if (!name) {
        alert("Por favor, ingrese el nombre del equipo."); // Muestra un mensaje si el nombre está vacío
        return; // Finaliza la ejecución
    }

    const team = { name, logo }; // Crea un objeto equipo
    teams.push(team); // Agrega el equipo a la lista de equipos
    updateTeamCards(); // Actualiza las tarjetas de equipos
    updateTeamSelect(); // Actualiza el selector de equipos
    teamForm.reset(); // Resetea el formulario
});

// Actualiza la visualización de los equipos
function updateTeamCards() {
    const teamContainer = document.getElementById("teamCardsContainer"); // Obtiene el contenedor de tarjetas de equipos
    teamContainer.innerHTML = ""; // Limpia el contenido existente
    teams.forEach(team => {
        const card = `<div class="team-card">
            <img src="${team.logo}" alt="${team.name}" style="width: 100px; height: 100px; border-radius: 50%;"> <!-- Imagen del logo del equipo -->
            <h3>${team.name}</h3> <!-- Nombre del equipo -->
        </div>`;
        teamContainer.innerHTML += card; // Agrega la tarjeta al contenedor
    });
}

// Maneja el formulario para agregar jugadores
const playerForm = document.getElementById("addPlayerForm"); // Obtiene el formulario para agregar jugadores
playerForm.addEventListener("submit", e => {
    e.preventDefault(); // Evita el envío predeterminado del formulario
    const name = document.getElementById("playerName").value; // Obtiene el nombre del jugador
    const position = document.getElementById("playerPosition").value; // Obtiene la posición seleccionada
    const team = document.getElementById("playerTeam").value; // Obtiene el equipo seleccionado
    const photoFile = document.getElementById("playerPhoto").files[0]; // Obtiene el archivo de la foto
    const photo = photoFile ? URL.createObjectURL(photoFile) : "assets/images/default-player.jpg"; // Genera la URL de la foto o usa una imagen predeterminada

    if (!name || !position || !team) {
        alert("Por favor, complete todos los campos obligatorios."); // Muestra un mensaje si falta algún campo obligatorio
        return; // Finaliza la ejecución
    }

    const player = { name,  position, team, photo }; // Crea un objeto jugador
    players.push(player); // Agrega el jugador a la lista de jugadores
    updatePlayerTable(); // Actualiza la tabla de jugadores
    playerForm.reset(); // Resetea el formulario
});

// Actualiza la tabla de jugadores
function updatePlayerTable() {
    const playerTable = document.getElementById("playerTableBody"); // Obtiene el cuerpo de la tabla de jugadores
    playerTable.innerHTML = ""; // Limpia el contenido existente
    players.forEach(player => {
        const row = `<tr>
            <td><img src="${player.photo}" alt="${player.name}" style="width: 50px; height: 50px; border-radius: 50%;"></td> <!-- Foto del jugador -->
            <td>${player.name}</td> <!-- Nombre del jugador -->
            <td>${player.position}</td> <!-- Posición del jugador -->
            <td>${player.team}</td> <!-- Equipo del jugador -->
        </tr>`;
        playerTable.innerHTML += row; // Agrega la fila a la tabla
    });
}

// Inicializa el sistema al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    // Lógica para agregar ubicación al historial
    const userLocationForm = document.getElementById("userLocationForm");
    if (userLocationForm) {
        userLocationForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const location = document.getElementById("userLocation").value.trim();
            if (location && !searchHistory.includes(location)) {
                searchHistory.push(location);
                updateSearchHistory();
            }
            document.getElementById("userLocation").value = "";
        });
    }

    loadPositions(); // Carga las posiciones en el selector
    updateTeamSelect(); // Carga los equipos en el selector
    updatePlayerTable();
    updateSearchHistory();

    // Lógica para agregar ubicación al historial
});

// --- Historial de ubicaciones buscadas ---
let searchHistory = [];

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query && !searchHistory.some(item => item.location === query)) {
        const now = new Date();
        const fecha = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        searchHistory.push({ location: query, fecha });
        updateSearchHistory();
    }
    searchInput.value = "";
});

function updateSearchHistory() {
    const list = document.getElementById("searchHistoryList");
    list.innerHTML = "";
    searchHistory.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.location} (Buscado el: ${item.fecha})`;
        list.appendChild(li);
    });
}

// --- Lógica de perfiles ---
let profiles = [];
let editingProfileIndex = null;

const profileForm = document.getElementById("profileForm");
profileForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("profileName").value;
    const email = document.getElementById("profileEmail").value;
    const photoFile = document.getElementById("profilePhoto").files[0];
    const photo = photoFile ? URL.createObjectURL(photoFile) : "assets/images/default-player.jpg";

    if (!name || !email) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    const profile = { name, email, photo };
    if (editingProfileIndex !== null) {
        profiles[editingProfileIndex] = profile;
        editingProfileIndex = null;
    } else {
        profiles.push(profile);
    }
    updateProfileList();
    profileForm.reset();
    profileForm.querySelector('button[type="submit"]').textContent = "Crear/Actualizar perfil";
});

function updateProfileList() {
    const container = document.getElementById("profileListContainer");
    container.innerHTML = "";
    profiles.forEach((profile, idx) => {
        const card = document.createElement("div");
        card.className = "profile-card";
        card.innerHTML = `
            <img src="${profile.photo}" alt="${profile.name}" style="width: 80px; height: 80px; border-radius: 50%;">
            <h3>${profile.name}</h3>
            <p>${profile.email}</p>
            <button onclick="editProfile(${idx})">Editar</button>
        `;
        container.appendChild(card);
    });
}

window.editProfile = function(idx) {
    const profile = profiles[idx];
    document.getElementById("profileName").value = profile.name;
    document.getElementById("profileEmail").value = profile.email;
    editingProfileIndex = idx;
    profileForm.querySelector('button[type="submit"]').textContent = "Actualizar perfil";
};
