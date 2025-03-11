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

//Add scalebar to map
L.control.scale({metric: true, imperial: false, maxWidth: 100}).addTo(map);

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
var title = localStorage.getItem('title')
//console.log(title)




fetch('../json/layer.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(i => {
            if (title == i.title) {
                //title and article
                document.querySelector('#title').innerHTML = i.title;
                document.querySelector('#article').innerHTML = "<p>" + i.article+ "</p>"

                //add layer on the map
                async function getWFSgeojson(wfsURL) {
                    try {
                        const response = await fetch(wfsURL);
                        return await response.json();
                    } catch (err) {
                        console.log(err);
                    }
                }

                function createLayer(layerData) {
                    const { name, wfsURL, color, className, weight, minWidth, width, maxWidth, title, article, type } = layerData;

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
                                            layer.bindPopup(feature.properties.name, {
                                                // className: className,
                                                // minWidth: minWidth,
                                                // maxWidth: maxWidth
                                            });
                                        }
                                    }).addTo(map)
                                    console.log(type);
                                    break;
                                case 'line':
                                    layer = L.geoJSON(geojsonData, {
                                        style: function () {
                                            return {
                                                color: color,
                                                weight: weight,
                                                // dashArray: '5, 5' // example for dashed lines
                                            };
                                        },
                                        onEachFeature: function (feature, layer) {
                                            layer.bindPopup(feature.properties.name, {
                                                // className: className,
                                                // minWidth: minWidth,
                                                // maxWidth: maxWidth
                                                width: width
                                            });
                                        }
                                    }).addTo(map)
                                    console.log(type);
                                    break;
                                case 'point':
                                    layer = L.geoJSON(geojsonData, {
                                        pointToLayer: function (feature, latlng) {
                                            return L.circleMarker(latlng, {
                                                radius: 8, // example radius for points
                                                fillColor: color,
                                                color: '#000',
                                                weight: weight,
                                                fillOpacity: 0.8
                                            });
                                        },
                                        onEachFeature: function (feature, layer) {
                                            layer.bindPopup(feature.properties.name, {
                                                // className: className,
                                                // minWidth: minWidth,
                                                // maxWidth: maxWidth
                                            });
                                        }
                                    }).addTo(map)
                       
                                    console.log(type);
                                    break;
                                default:
                                    console.warn('Unknown layer type:', type);
                                    return; // Skip if the type is not recognized
                            }                            
                        }
                    })
                }

                createLayer(i);  
                
                // Fit the map bounds to the new layer
       
            }
        });
        
    });

