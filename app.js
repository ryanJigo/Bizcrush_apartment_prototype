/* ======================================================
   Bizcrush — 2BR Options Interactions
   ====================================================== */

(function () {

  // Initialize map
  var properties = [
    {
      name: "Lightbox",
      address: "4545 8th Ave NE, Seattle, WA 98105",
      coords: { lat: 47.6621, lng: -122.3176 },
      rent: "$1,949",
      unit: "Two Bedroom B1A"
    },
    {
      name: "Capella at Esterra Park",
      address: "2710 Tagore Ave, Redmond, WA 98052",
      coords: { lat: 47.6740, lng: -122.1215 },
      rent: "$1,975",
      unit: "D2"
    },
    {
      name: "Glendale Apartments",
      address: "5246 Brooklyn Ave NE, Seattle, WA 98105",
      coords: { lat: 47.6641, lng: -122.3145 },
      rent: "$1,999",
      unit: "2 Bed 1 Bath"
    },
    {
      name: "East Howe Steps",
      address: "1823 Eastlake Ave E, Seattle, WA 98102",
      coords: { lat: 47.6373, lng: -122.3242 },
      rent: "~$2,095+",
      unit: "Eastlake 2BD"
    }
  ];

  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 47.6500, lng: -122.2500 },
      zoom: 10,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: false
    });

    var bounds = new google.maps.LatLngBounds();
    var infoWindow = new google.maps.InfoWindow();

    properties.forEach(function (prop) {
      var marker = new google.maps.Marker({
        position: prop.coords,
        map: map,
        title: prop.name
      });

      var popupContent = '<div class="map-popup"><strong>' + prop.name + '</strong><br>' +
        '<span class="popup-address">' + prop.address + '</span><br>' +
        '<span class="popup-unit">' + prop.unit + '</span><br>' +
        (prop.rent ? '<span class="popup-rent">' + prop.rent + '/mo</span>' : '') + '</div>';

      marker.addListener('click', function () {
        infoWindow.setContent(popupContent);
        infoWindow.open(map, marker);
      });

      bounds.extend(prop.coords);
    });

    // Fit map to show all markers
    map.fitBounds(bounds);

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
        google.maps.event.trigger(map, 'resize');
        map.fitBounds(bounds);
      }, 350);
    });
  }

  // Wait for Google Maps to load, then initialize
  function waitForGoogleMaps() {
    if (typeof google !== 'undefined' && google.maps) {
      initMap();
    } else {
      setTimeout(waitForGoogleMaps, 100);
    }
  }

  // Expose initMap for callback and start waiting
  window.initMap = initMap;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForGoogleMaps);
  } else {
    waitForGoogleMaps();
  }

})();
