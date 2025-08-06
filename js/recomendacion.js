// Este script se enfoca en la interacción de la UI para la aplicación de recomendaciones de viaje de RUTOPIA.

const recommendations = {
    destinations: [
        {
            id: 'cartagena',
            name: 'Cartagena de Indias',
            description: 'Sumérgete en la historia, la cultura caribeña y la arquitectura colonial de la Ciudad Amurallada.',
            image: 'https://via.placeholder.com/400x200?text=Cartagena',
            category: 'cultura'
        },
        {
            id: 'cafetero',
            name: 'Eje Cafetero',
            description: 'Descubre el paisaje cultural cafetero, entre montañas, cafetales y pueblos pintorescos como Salento y Filandia.',
            image: 'https://via.placeholder.com/400x200?text=Eje+Cafetero',
            category: 'naturaleza'
        },
        {
            id: 'sanandres',
            name: 'San Andrés',
            description: 'Disfruta del "mar de los siete colores", sus playas de arena blanca, y actividades acuáticas como el buceo y el snorkel.',
            image: 'assets/images/sanandres.jpg',
            category: 'aventura'
        }
    ],
    details: {
        cartagena: {
            activities: [
                { id: 'recorrido-cartagena', name: 'Recorrido a pie por la Ciudad Amurallada', description: 'Explora las calles y plazas históricas con un guía local.', image: 'https://via.placeholder.com/400x200?text=Plaza+Bolivar' },
                { id: 'islas-rosario', name: 'Paseo en bote a las Islas del Rosario', description: 'Disfruta de las aguas cristalinas y la tranquilidad de las islas.', image: 'https://via.placeholder.com/400x200?text=Islas+del+Rosario' }
            ],
            lodging: [
                { id: 'hotel-bocagrande', name: 'Hotel en Bocagrande', description: 'Alojamientos modernos con vistas al mar.', image: 'https://via.placeholder.com/400x200?text=Hotel+Bocagrande', website: '#' },
                { id: 'boutique-walledcity', name: 'Hotel Boutique en la Ciudad Amurallada', description: 'Hospedaje de lujo con encanto histórico.', image: 'https://via.placeholder.com/400x200?text=Hotel+Boutique', website: '#' }
            ],
            restaurants: [
                { id: 'restaurant-la-cevicheria', name: 'La Cevicheria', description: 'Famoso por su marisco fresco y ambiente casual.', image: 'https://via.placeholder.com/400x200?text=La+Cevicheria', website: '#' },
                { id: 'restaurant-andres-carne', name: 'Andrés Carne de Res', description: 'Restaurante con comida típica colombiana y ambiente de fiesta.', image: 'https://via.placeholder.com/400x200?text=Andres+Carne+de+Res', website: '#' }
            ],
            title: 'Cartagena de Indias'
        },
        cafetero: {
            activities: [
                { id: 'finca-cafetera', name: 'Tour por una finca cafetera', description: 'Aprende sobre el proceso del café, desde el grano hasta la taza.', image: 'https://via.placeholder.com/400x200?text=Finca+Cafetera' },
                { id: 'valle-cocora', name: 'Caminata por el Valle del Cocora', description: 'Explora el hogar de las palmas de cera más altas del mundo.', image: 'https://via.placeholder.com/400x200?text=Valle+del+Cocora' }
            ],
            lodging: [
                { id: 'finca-hotel-cafetero', name: 'Finca Hotel', description: 'Hospedaje rural en medio de los cafetales con paisajes espectaculares.', image: 'https://via.placeholder.com/400x200?text=Finca+Hotel', website: '#' }
            ],
            restaurants: [
                { id: 'restaurant-cafe-dela-cuesta', name: 'Café de la Cuesta', description: 'Disfruta de un excelente café y postres en Filandia.', image: 'https://via.placeholder.com/400x200?text=Cafe+de+la+Cuesta', website: '#' }
            ],
            title: 'Eje Cafetero'
        },
        sanandres: {
            activities: [
                { id: 'buceo-sanandres', name: 'Sesión de buceo o snorkel', description: 'Explora la vida marina del mar de los siete colores en sus arrecifes de coral.', image: 'https://via.placeholder.com/400x200?text=Buceo+San+Andres' }
            ],
            lodging: [
                { id: 'hotel-boutique-sanandres', name: 'Hotel Boutique', description: 'Alojamiento exclusivo y tranquilo, ideal para parejas.', image: 'https://via.placeholder.com/400x200?text=Hotel+Boutique', website: '#' }
            ],
            restaurants: [
                { id: 'restaurant-mar-de-siete', name: 'Mar de Siete Colores', description: 'Especializado en platos de pescado y mariscos del Caribe.', image: 'https://via.placeholder.com/400x200?text=Restaurante+Mar+de+Siete+Colores', website: '#' }
            ],
            title: 'San Andrés'
        }
    }
};

const destinationsContainer = document.getElementById('destinations-container');
const detailsView = document.getElementById('details-view');
const detailsContent = document.getElementById('details-content');
const destinationsSection = document.getElementById('destinations');
const itinerarySection = document.getElementById('itinerary');
const itineraryContent = document.getElementById('itinerary-content');
const preferenceButtons = document.querySelectorAll('.preference-btn');
const notificationContainer = document.getElementById('notification');

let savedItinerary = JSON.parse(localStorage.getItem('itinerary')) || [];

function showNotification(message) {
    notificationContainer.textContent = message;
    notificationContainer.classList.add('show');
    setTimeout(() => {
        notificationContainer.classList.remove('show');
    }, 3000);
}

function renderCard(item, type, parentId) {
    const cardHtml = `
        <div class="card ${type}-card" data-id="${item.id}" data-parent="${parentId}">
            <div class="card-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
            <div class="card-actions">
                <button class="btn btn-save" data-id="${item.id}">Guardar</button>
                <button class="btn btn-dismiss" data-id="${item.id}">No me interesa</button>
                ${type === 'destination' ? `<button class="btn btn-details" data-id="${item.id}">Ver más</button>` : ''}
            </div>
        </div>
    `;
    return cardHtml;
}

function renderDestinations(category = 'all') {
    destinationsContainer.innerHTML = '';
    const filteredDestinations = category === 'all'
        ? recommendations.destinations
        : recommendations.destinations.filter(d => d.category === category);

    filteredDestinations.forEach(destination => {
        destinationsContainer.innerHTML += renderCard(destination, 'destination', null);
    });
}

function showDetails(destinationId) {
    destinationsSection.style.display = 'none';
    detailsView.style.display = 'block';

    const destinationData = recommendations.details[destinationId];

    if (!destinationData) {
        detailsContent.innerHTML = '<h2>Lo sentimos, no hay más detalles para este destino.</h2>';
        return;
    }

    let detailsHtml = `
        <h2 class="section-title">Actividades y Alojamientos en ${destinationData.title}</h2>
        <h3>Actividades</h3>
        <div class="activities-grid">
            ${destinationData.activities.map(activity => renderCard(activity, 'activity', destinationId)).join('')}
        </div>
        <h3 class="section-title">Alojamientos</h3>
        <div class="lodging-grid">
            ${destinationData.lodging.map(lodging => renderCard(lodging, 'lodging', destinationId)).join('')}
        </div>
        <h3 class="section-title">Restaurantes</h3>
        <div class="restaurants-grid">
            ${destinationData.restaurants.map(restaurant => renderCard(restaurant, 'restaurant', destinationId)).join('')}
        </div>
    `;

    detailsContent.innerHTML = detailsHtml;
    detailsView.scrollIntoView({ behavior: 'smooth' });
}

function renderItinerary() {
    destinationsSection.style.display = 'none';
    detailsView.style.display = 'none';
    itinerarySection.style.display = 'block';

    if (savedItinerary.length === 0) {
        itineraryContent.innerHTML = '<p>Aún no has guardado ninguna recomendación.</p>';
        return;
    }

    let itineraryHtml = '';
    savedItinerary.forEach(item => {
        let cardHtml = `
            <div class="card itinerary-card" data-id="${item.id}" data-parent="${item.parentId}">
                <div class="card-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
                <div class="card-actions">
                    <button class="btn btn-dismiss" data-id="${item.id}">Eliminar</button>
                    ${item.website ? `<a href="${item.website}" class="btn btn-details" target="_blank">Sitio Web</a>` : ''}
                </div>
            </div>
        `;
        itineraryHtml += cardHtml;
    });

    itineraryContent.innerHTML = `<div class="destinations-grid">${itineraryHtml}</div>`;
}

function addToItinerary(itemId, parentId) {
    let item;
    if (parentId) {
        item = recommendations.details[parentId].activities.find(a => a.id === itemId) ||
               recommendations.details[parentId].lodging.find(l => l.id === itemId) ||
               recommendations.details[parentId].restaurants.find(r => r.id === itemId);
    } else {
        item = recommendations.destinations.find(d => d.id === itemId);
    }
    
    if (item && !savedItinerary.find(i => i.id === itemId)) {
        savedItinerary.push({ ...item, parentId });
        localStorage.setItem('itinerary', JSON.stringify(savedItinerary));
        showNotification('¡Guardado en tu itinerario!');
    } else {
        showNotification('Esta opción ya está en tu itinerario.');
    }
}

function removeFromItinerary(itemId) {
    const originalLength = savedItinerary.length;
    savedItinerary = savedItinerary.filter(item => item.id !== itemId);
    if (savedItinerary.length < originalLength) {
        localStorage.setItem('itinerary', JSON.stringify(savedItinerary));
        showNotification('Elemento eliminado del itinerario.');
        if (itinerarySection.style.display === 'block') {
            renderItinerary();
        }
    }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    renderDestinations();

    document.body.addEventListener('click', e => {
        const target = e.target;
        const card = target.closest('.card');
        const itemId = target.dataset.id;
        const parentId = card ? card.dataset.parent : null;

        if (target.classList.contains('btn-save')) {
            addToItinerary(itemId, parentId);
        } else if (target.classList.contains('btn-dismiss')) {
            if (card) {
                card.style.display = 'none';
                showNotification('Recomendación descartada.');
                removeFromItinerary(itemId);
            }
        } else if (target.classList.contains('btn-details')) {
            showDetails(itemId);
        } else if (target.classList.contains('btn-back')) {
            detailsView.style.display = 'none';
            itinerarySection.style.display = 'none';
            destinationsSection.style.display = 'block';
            destinationsSection.scrollIntoView({ behavior: 'smooth' });
        } else if (target.matches('nav-links a[href="#itinerary"]')) {
            renderItinerary();
        } else if (target.matches('nav-links a[href="#destinations"]')) {
            detailsView.style.display = 'none';
            itinerarySection.style.display = 'none';
            destinationsSection.style.display = 'block';
        }
    });

    preferenceButtons.forEach(button => {
        button.addEventListener('click', () => {
            preferenceButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderDestinations(button.dataset.preference);
        });
    });

    document.querySelector('nav-links a[href="#itinerary"]').addEventListener('click', e => {
        e.preventDefault();
        renderItinerary();
    });

    document.querySelector('nav-links a[href="#destinations"]').addEventListener('click', e => {
        e.preventDefault();
        detailsView.style.display = 'none';
        itinerarySection.style.display = 'none';
        destinationsSection.style.display = 'block';
        destinationsSection.scrollIntoView({ behavior: 'smooth' });
    });
});