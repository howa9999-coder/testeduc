// Leaflet Map
const map = L.map('map').setView([31.5, 34.47], 12); // Center on Gaza Strip

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

// Retrieve the dataMap from local storage
var title = localStorage.getItem('title');

fetch('../json/layer.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(i => {

            function articleContent(){
                if (title == i.title) {
// ************************************************************************************Title and article
                    document.querySelector('#title').innerHTML = i.title;
                    document.querySelector('#article').innerHTML = "<p>" + i.article + "</p>";
//*******************************************************************************************Suggestions
                // Current article tags 
                const currentArticleTags = i.tags ;
                //console.log(currentArticleTags)
                // Function to get suggested articles 
                function getSuggestedArticles() {
                    const matchedArticles = data.filter(i =>
                        i.tags.some(tag => currentArticleTags.includes(tag))
                    );

                    // Shuffle matched articles and return three random articles
                    const shuffled = matchedArticles.sort(() => 0.5 - Math.random());
                    return shuffled.slice(0, 3);
                } 
                const art = getSuggestedArticles()
                //console.log(art)
                art.forEach(art => {
                    //console.log(art)
                    if(title != art.title){
                       // console.log(art)
                       document.querySelector('#suggestion-list').innerHTML+=`
                    <div class="bg-white shadow-lg rounded-lg p-4 relative">
                        <h2 class="text-xl font-semibold">${art.title}</h2>
                        <p class="text-gray-700 mt-2">${art.description}</p>
                        <div class="mt-4 text-sm text-gray-500">
                            <p>Author: ${art.author}</p>
                            <p>Date: ${art.date}</p>
                            <p>Category: ${art.category}</p>
                        </div>
                        <button class="read-button absolute bottom-4 right-4 text-blue-500 cursor-pointer p-0 bg-transparent border-none" data-title="${art.title}">
                            Read
                        </button>
                    </div>`;
                    }
                })
                // Attach event listeners to all read buttons
            document.querySelectorAll('.read-button').forEach(button => {
                button.addEventListener('click', function() {
                    const title = this.getAttribute('data-title');
                    console.log(title)
                    //Store title in local storage
                    localStorage.setItem('title', title);
                    // Redirect to the article page
                    window.location.href = "../html/art.html"; 

                });
            });

 
    
// ***************************************************************************************Add layer => the map
                    async function getWFSgeojson(wfsURL) {
                        try {
                            const response = await fetch(wfsURL);
                            return await response.json();
                        } catch (err) {
                            console.log(err);
                        }
                    }
    
                    function createLayer(layerData) {
                        const { name, wfsURL, color, weight, type } = layerData;
    
                        return getWFSgeojson(wfsURL).then(geojsonData => {
                            if (geojsonData) {
                                let layer;
                                switch (type) {
                                    case 'polygon':
                                        layer = L.geoJSON(geojsonData, {
                                            style: function () {
                                                return {
                                                    color: color,
                                                    weight: weight
                                                };
                                            },
                                            onEachFeature: function (feature, layer) {
                                                // Create a string to display all properties
                                                let popupContent = '<strong>Properties:</strong><br>';
                                                
                                                for (const [key, value] of Object.entries(feature.properties)) {
                                                    popupContent += `${key}: ${value}<br>`;
                                                }
                                            
                                                layer.bindPopup(popupContent);
                                            }
                                        }).addTo(map);
                                        break;
                                    case 'line':
                                        layer = L.geoJSON(geojsonData, {
                                            style: function () {
                                                return {
                                                    color: color,
                                                    weight: weight,
                                                };
                                            },
                                            onEachFeature: function (feature, layer) {
                                                // Create a string to display all properties
                                                let popupContent = '<strong>Properties:</strong><br>';
                                                
                                                for (const [key, value] of Object.entries(feature.properties)) {
                                                    popupContent += `${key}: ${value}<br>`;
                                                }
                                            
                                                layer.bindPopup(popupContent);
                                            }
                                        }).addTo(map);
                                        break;
                                    case 'point':
                                        layer = L.geoJSON(geojsonData, {
                                            pointToLayer: function (feature, latlng) {
                                                return L.circleMarker(latlng, {
                                                    radius: 8,
                                                    fillColor: color,
                                                    color: '#000',
                                                    weight: weight,
                                                    fillOpacity: 0.8
                                                });
                                            },
                                            onEachFeature: function (feature, layer) {
                                                // Create a string to display all properties
                                                let popupContent = '<strong>Properties:</strong><br>';
                                                
                                                for (const [key, value] of Object.entries(feature.properties)) {
                                                    popupContent += `${key}: ${value}<br>`;
                                                }
                                            
                                                layer.bindPopup(popupContent);
                                            }
                                        }).addTo(map);
                                        break;
                                    default:
                                        console.warn('Unknown layer type:', type);
                                        return; // Skip if the type is not recognized
                                }
    
                                // Fit the map bounds to the new layer
                                map.fitBounds(layer.getBounds());
                            }
                        });
                    }
    
                    createLayer(i);
                }
            
            }
            articleContent()

        })


    })


    //****************************************************************share & download

    // Automatically get the article URL
    const articleUrl = window.location.href;

    // Set the share links
    document.getElementById('facebookShare').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
    document.getElementById('twitterShare').href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}`;
    document.getElementById('linkedinShare').href = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(articleUrl)}`;
