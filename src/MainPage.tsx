import { h } from 'preact';

import { App } from './App';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import { TrailSummary } from './TrailSummary';
import * as coquitlam from './coquitlam.json';
import { parseImage } from './parseImage';

const previewImageCSS = hike => {
  if (!hike.images || !hike.images.length) return '';
  const { name } = parseImage(hike.images[0]);
  return `url(https://images.hiker.family/${hike.slug}/${name}.jpg?nf_resize=smartcrop&w=300&h=400)`;
}

export const MainPage = ({ hikes }) => (
  <App title='Coquitlam Family Hikes'>
    <nav><h1>Coquitlam Family Hikes</h1></nav>
    <Map longitude={coquitlam.longitude} latitude={coquitlam.latitude} zoom={coquitlam.zoom} >
      { hikes.map(hike => (
        <MapMarker latitude={hike.trailhead.latitude} longitude={hike.trailhead.longitude} title={hike.name} >
          <div
            class='trailhead-map-marker-detail'
            style={`--background: ${previewImageCSS(hike)};`}
            >
            <div class='trailhead-map-marker-detail__text'>
              <h3><a href={`./${hike.slug}.html`}>{hike.name}</a></h3>
              <TrailSummary {...hike} />
            </div>
          </div>
        </MapMarker>
      )) }
    </Map>
    <div class='hike-tiles'>
      { hikes.sort((lhs, rhs) => lhs.area > rhs.area ? 1 : -1).map(hike => (
        <div class='hike-tile'>
          <div class='hike-tile__left-side hike-tile__text'>
            <a href={`./${hike.slug}.html`}>
              <div class='hike-tile__text__name'>{hike.name}</div>
              <div class='hike-tile__text__area'>({hike.area} Area)</div>
            </a>
          </div>
          <div class='hike-tile__right-side'>
            <TrailSummary {...hike} />
          </div>
        </div>
      )) }
    </div>
  </App>
);
