import { h } from 'preact';

import { App } from './App';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import * as coquitlam from './coquitlam.json';

export const IndexApp = ({ hikes }) => (
  <App title='Coquitlam Family Hikes'>
    <h1>Coquitlam Family Hikes</h1>
    <Map longitude={coquitlam.longitude} latitude={coquitlam.latitude} zoom={coquitlam.zoom} >
      { hikes.map(hike => (
        <MapMarker latitude={hike.trailhead.latitude} longitude={hike.trailhead.longitude} title={hike.name} >
          <div>
            <h3><a href={`./${hike.slug}.html`}>{hike.name}</a></h3>
            <div>
              <div>Stroller: {hike.stroller}</div>
              <div>Hilly: {hike.hilly}</div>
              <div>View: {hike.view}</div>
            </div>
          </div>
        </MapMarker>
      )) }
    </Map>
    <table>
      <thead>
        <tr>
          <th>Hike</th>
          <th>Area</th>
          <th>Trailhead</th>
          <th>Stroller</th>
          <th>Hilly</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        { hikes.sort((lhs, rhs) => lhs.area > rhs.area ? 1 : -1).map(hike => (
          <tr>
            <td><a href={`./${hike.slug}.html`}>{hike.name}</a></td>
            <td>{hike.area}</td>
            <td>{hike.trailhead.name}</td>
            <td>{hike.stroller}</td>
            <td>{hike.hilly}</td>
            <td>{hike.view}</td>
          </tr>
        )) }
        
      </tbody>
    </table>
  </App>
);
