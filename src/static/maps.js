/* initMap is a magic method name that the google maps API uses */
function initMap() {
  const mapElement = document.getElementById('map');
  const { latitude, longitude, zoom } = mapElement.dataset;
  const map = new google.maps.Map(mapElement, {
    center: { lat: Number(latitude), lng: Number(longitude) },
    zoom: Number(zoom),
  });
}
