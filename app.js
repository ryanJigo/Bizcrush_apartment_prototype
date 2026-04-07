/* ======================================================
   Bizcrush — 2BR Options Interactions
   ====================================================== */

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

(function () {

  var unitNames = {
    "lightbox-b1a": "Lightbox B1A",
    "capella-d2": "Capella D2",
    "glendale-2b1b": "Glendale 2B1B",
    "ehs-2bdb": "East Howe 2BD B",
    "ehs-2bda": "East Howe 2BD A",
    "capella-d1": "Capella D1"
  };

  var picked = {};

  var picksBar = document.getElementById("picksBar");
  var picksList = document.getElementById("picksList");
  var picksLabel = document.getElementById("picksLabel");
  var toastEl = document.getElementById("toast");
  var toastTimer = null;

  document.querySelectorAll(".btn-pick").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var unit = btn.getAttribute("data-unit");
      var row = document.querySelector('tr[data-unit="' + unit + '"]');

      if (picked[unit]) {
        delete picked[unit];
        btn.classList.remove("picked");
        btn.textContent = "Pick";
        if (row) row.classList.remove("picked");
        showToast("Removed " + unitNames[unit]);
      } else {
        picked[unit] = true;
        btn.classList.add("picked");
        btn.textContent = "\u2713 Picked";
        if (row) row.classList.add("picked");
        showToast("Picked " + unitNames[unit]);
      }

      updatePicksBar();
    });
  });

  function updatePicksBar() {
    var keys = Object.keys(picked);
    if (keys.length === 0) {
      picksBar.classList.add("hidden");
      picksBar.classList.remove("visible");
      return;
    }

    picksList.innerHTML = "";
    keys.forEach(function (key) {
      var chip = document.createElement("span");
      chip.className = "pick-chip";
      chip.textContent = unitNames[key];
      picksList.appendChild(chip);
    });

    picksLabel.textContent = keys.length + (keys.length === 1 ? " unit selected" : " units selected");
    picksBar.classList.remove("hidden");
    picksBar.classList.add("visible");
  }

  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("visible");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("visible");
    }, 2000);
  }

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

  properties.forEach(function (prop) {
    var marker = L.marker(prop.coords, { icon: markerIcon }).addTo(map);
    var popupContent = '<div class="map-popup"><strong>' + prop.name + '</strong><br>' +
      '<span class="popup-address">' + prop.address + '</span><br>' +
      '<span class="popup-unit">' + prop.unit + '</span><br>' +
      '<span class="popup-rent">' + prop.rent + '/mo</span></div>';
    marker.bindPopup(popupContent);
  });

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
