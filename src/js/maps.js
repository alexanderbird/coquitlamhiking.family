import { mapStyles } from './mapStyles';
/* initMap is a magic method name that the google maps API uses */
function initMap() {
  const mapElement = document.getElementById('map');
  const markers = Array.from(mapElement.querySelectorAll('.map__marker'))
    .map(element => ({ dataset: element.dataset, element }))
    .map(({ dataset: { latitude, longitude, title }, element }) => ({
      latitude: Number(latitude),
      longitude: Number(longitude),
      title,
      body: element.innerHTML
    }));

  const { latitude, longitude, zoom } = mapElement.dataset;
  const map = new google.maps.Map(mapElement, {
    center: { lat: Number(latitude), lng: Number(longitude) },
    styles: mapStyles,
    zoom: processZoom(zoom),
  });
  
  const eachDetail = [];
  markers.forEach(({ latitude, longitude, title, body }) => {
    const marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      icon: '/marker.png',
      map,
      title,
    });

    const detailText = body || title;
    const detail = new google.maps.InfoWindow({ content: detailText });
    eachDetail.push(detail);
    marker.addListener('click', () => {
      eachDetail.forEach(d => d.close());
      detail.open(map, marker);
    });
  });

  map.addListener('click', () => eachDetail.forEach(d => d.close()));
}

function processZoom(zoomString) {
  const zoom = Number(zoomString);
  if (window.screen.width < 600) {
    return zoom / 1.1;
  }
  if (window.screen.width < 850) {
    return zoom / 1.05;
  }
  return zoom;
}
window.initMap = initMap;
