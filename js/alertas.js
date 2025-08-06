document.addEventListener('DOMContentLoaded', () => {
    // Obtenemos los elementos de la interfaz por sus IDs
    const toggleAlertas = document.getElementById('toggle-alertas');
    const alertasDisplay = document.getElementById('alertas-display');
 
    // Estado inicial: Verificamos si hay una configuración guardada
    // Usamos el operador de "fusión nula" (??) para simplificar
    const isEnabled = JSON.parse(localStorage.getItem('alertsEnabled') ?? 'true');
 
    // Sincronizamos el estado del interruptor y la visibilidad de las alertas
    toggleAlertas.checked = isEnabled;
    alertasDisplay.style.display = isEnabled ? 'block' : 'none';
 
    // Escuchamos el evento 'change' del interruptor
    toggleAlertas.addEventListener('change', () => {
        // Obtenemos el nuevo estado
        const alertsEnabled = toggleAlertas.checked;
       
        // Guardamos el estado en el navegador y actualizamos la interfaz
        localStorage.setItem('alertsEnabled', alertsEnabled);
        alertasDisplay.style.display = alertsEnabled ? 'block' : 'none';
 
        // Mostramos un mensaje de confirmación
        if (alertsEnabled) {
            alert("¡Alertas activadas! Recibirás notificaciones en zonas de riesgo.");
        } else {
            alert("Alertas desactivadas. No recibirás notificaciones de zonas de riesgo.");
        }
    });
});
 