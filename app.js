/* ======================================================
   Bizcrush — 2BR Options Interactions
   ====================================================== */

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

(function () {

  // Initialize map
  var properties = [
    {
      name: "Lightbox",
      address: "4545 8th Ave NE, Seattle, WA 98105",
      coords: [47.6620, -122.3177],
      rent: "$1,949",
      unit: "Two Bedroom B1A"
    },
    {
      name: "Capella at Esterra Park",
      address: "2710 Tagore Ave, Redmond, WA 98052",
      coords: [47.6747, -122.1221],
      rent: "$1,975",
      unit: "D2"
    },
    {
      name: "Glendale Apartments",
      address: "5246 Brooklyn Ave NE, Seattle, WA 98105",
      coords: [47.6640, -122.3147],
      rent: "$1,999",
      unit: "2 Bed 1 Bath"
    },
    {
      name: "East Howe Steps",
      address: "1823 Eastlake Ave E, Seattle, WA 98102",
      coords: [47.6372, -122.3241],
      rent: "~$2,095+",
      unit: "Eastlake 2BD"
    },
    {
      name: "KSC Seattle",
      address: "1730 Minor Ave Suite 1050, Seattle, WA 98101",
      coords: [47.6149, -122.3265],
      rent: "",
      unit: "Office Location"
    }
  ];

  var map = L.map('map', {
    zoomControl: true,
    attributionControl: false
  }).setView([47.6500, -122.2500], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '',
    maxZoom: 19
  }).addTo(map);

  var markerIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div class="marker-pin"></div>',
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42]
  });

  var officeMarkerIcon = L.divIcon({
    className: 'custom-marker office-marker',
    html: '<div class="marker-pin office-pin"></div>',
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42]
  });

  var bounds = [];
  properties.forEach(function (prop) {
    var icon = prop.name === 'KSC Seattle' ? officeMarkerIcon : markerIcon;
    var marker = L.marker(prop.coords, { icon: icon }).addTo(map);
    var popupContent = '<div class="map-popup"><strong>' + prop.name + '</strong><br>' +
      '<span class="popup-address">' + prop.address + '</span><br>' +
      '<span class="popup-unit">' + prop.unit + '</span><br>' +
      (prop.rent ? '<span class="popup-rent">' + prop.rent + '/mo</span>' : '') + '</div>';
    marker.bindPopup(popupContent);
    bounds.push(prop.coords);
  });

  // Fit map to show all markers
  if (bounds.length > 0) {
    map.fitBounds(bounds, { padding: [50, 50] });
  }

  // Map expand/collapse functionality
  var mapExpandBtn = document.getElementById('mapExpandBtn');
  var mapElement = document.getElementById('map');
  var expandText = mapExpandBtn.querySelector('.expand-text');
  var isExpanded = false;

  mapExpandBtn.addEventListener('click', function () {
    isExpanded = !isExpanded;

    if (isExpanded) {
      mapElement.classList.add('expanded');
      mapExpandBtn.classList.add('expanded');
      expandText.textContent = 'Collapse';
    } else {
      mapElement.classList.remove('expanded');
      mapExpandBtn.classList.remove('expanded');
      expandText.textContent = 'Expand';
    }

    setTimeout(function () {
      map.invalidateSize();
    }, 350);
  });

})();
