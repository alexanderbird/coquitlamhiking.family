import { h } from 'preact';

import { App } from './App';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import { TrailSummary } from './TrailSummary';
import * as coquitlam from './coquitlam.json';

export const MainPage = ({ hikes }) => (
  <App title='Coquitlam Family Hikes'>
    <nav><h1>Coquitlam Family Hikes</h1></nav>
    <Map longitude={coquitlam.longitude} latitude={coquitlam.latitude} zoom={coquitlam.zoom} >
      { hikes.map(hike => (
        <MapMarker latitude={hike.trailhead.latitude} longitude={hike.trailhead.longitude} title={hike.name} >
          <div>
            <h3><a href={`./${hike.slug}.html`}>{hike.name}</a></h3>
            <div>
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
