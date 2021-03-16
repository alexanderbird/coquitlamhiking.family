import { h } from 'preact';

export const Map = ({ latitude, longitude, zoom }) => (
 <div id='map' data-latitude={latitude} data-longitude={longitude} data-zoom={zoom}></div>
)
