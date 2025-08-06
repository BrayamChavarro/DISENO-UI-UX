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
    });
}

// Maneja el formulario para agregar hoteles
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
});
