import { h } from 'preact';

import { App } from './App';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import { TrailSummary } from './TrailSummary';
import * as coquitlam from './coquitlam.json';

export const IndexApp = ({ hikes }) => (
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
    <table>
      <thead>
        <tr>
          <th>Area</th>
          <th>Hike</th>
          <th>Trail</th>
        </tr>
      </thead>
      <tbody>
        { hikes.sort((lhs, rhs) => lhs.area > rhs.area ? 1 : -1).map(hike => (
          <tr>
            <td>{hike.area}</td>
            <td><a href={`./${hike.slug}.html`}>{hike.name}</a></td>
            <td><TrailSummary {...hike} /></td>
          </tr>
        )) }
        
      </tbody>
    </table>
  </App>
);
