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
    zoom: Number(zoom),
  });
  
  markers.forEach(({ latitude, longitude, title, body }) => {

    new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title,
    });
  });
}
