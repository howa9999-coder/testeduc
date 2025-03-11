// Leaflet Map
const map = L.map('mapLayer').setView([31.5, 34.47], 12); // Center on Gaza Strip

// BaseLayer
var googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: 'Map data &copy; <a href="https://www.google.com/intl/en_us/help/terms_maps.html">Google</a>',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(map);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
});

// Add scale bar to map
L.control.scale({ metric: true, imperial: false, maxWidth: 100 }).addTo(map);

// Control baseLayers
var baseLayers = {
    "Google Sat": googleSat,
    "Open Street Map": osm,
    "SmoothDark": Stadia_AlidadeSmoothDark,
};

var controlLayers = L.control.layers(baseLayers, {}, {
    collapsed: true
}).addTo(map);



//Full screen
// Get the button and map container elements
const fullScreenButton = document.querySelector('.screen-button');
const mapContainer = document.getElementById('mapLayer');

// Function to toggle fullscreen mode
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        if (mapContainer.requestFullscreen) {
            mapContainer.requestFullscreen();
        } else if (mapContainer.mozRequestFullScreen) { // Firefox
            mapContainer.mozRequestFullScreen();
        } else if (mapContainer.webkitRequestFullscreen) { // Chrome, Safari
            mapContainer.webkitRequestFullscreen();
        } else if (mapContainer.msRequestFullscreen) { // IE/Edge
            mapContainer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}


// Add click event to the button
fullScreenButton.addEventListener('click', toggleFullScreen);
